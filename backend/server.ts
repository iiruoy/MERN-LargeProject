import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import admin from 'firebase-admin';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const serviceAccount = require(path.join(__dirname, '../firebase-service-account.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    console.error('Firebase Auth Error:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

const DB_URI = 'mongodb+srv://root:Cp077Tech@cop4331.nxd0xsg.mongodb.net/?retryWrites=true&w=majority&appName=COP4331';
mongoose
  .connect(DB_URI, { dbName: 'COP4331' }) // dbName helps ensure correct DB selection
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


interface IItem {
  name: string;
  price: number;
  description: string;
}

const itemSchema = new mongoose.Schema<IItem>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

const Item = mongoose.model<IItem>('Item', itemSchema);

interface IUser {
  uid: string;
  username: string;
  email: string;
}

const userSchema = new mongoose.Schema<IUser>({
  uid: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', userSchema);

// get items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find(); // Fetch all items from MongoDB
    res.json(items);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch items' });
  }
});

// create items
app.post('/api/items', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newItem = new Item({ name, price, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create item' });
  }
});

app.post('/api/users/register', verifyFirebaseToken, async (req: Request, res: Response) => {
  try {
    const { uid, username, email } = req.body;

    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ uid, username, email });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

interface ICart {
  userId: string;
  items: Array<{ productId: string; quantity: number }>;
}

const cartSchema = new mongoose.Schema<ICart>({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

const Cart = mongoose.model<ICart>('Cart', cartSchema);

app.get('/api/cart', async (req, res) => {
  try {
    const cart = await Cart.find();
    res.json(cart);
  } 
  catch (error) {
    console.error('Failed to fetch cart:', error);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
});

// test
app.get('/', (req: Request, res: Response) => {
  res.send('Backend is connected to MongoDB with Firebase Auth Check');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});