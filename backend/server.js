const express = require("express"); 
const cors = require('cors');
require("dotenv").config();
const itemsRoutes = require("./routes/items");
const cartRoutes = require("./routes/carts");
const checkoutRoutes = require('./routes/checkout');
const userRoutes = require('./routes/user'); 
require('./config/databse'); 

// express app
const app = express(); 
app.use(cors());
app.use(express.json()); 

app.use((req, res, next) => { 
    console.log(req.path, req.method); 
    next();
})

// routes
app.use('/api/items', itemsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api', checkoutRoutes);
app.use('/api/users', userRoutes); 

// listen for request
app.listen(process.env.PORT, () => { 
    console.log("listening on port", process.env.PORT);
});
