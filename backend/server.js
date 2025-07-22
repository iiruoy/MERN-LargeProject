const express = require("express"); 
const cors = require('cors');
require("dotenv").config();
const itemsRoutes = require("./routes/items");
const cartRoutes = require("./routes/carts");
const userRoutes = require('./routes/user');
require('./config/databse'); 
const checkoutRoutes = require('./routes/checkout');


// express app
const app = express(); 
app.use(cors());
// app.options('/*', cors());

app.use(express.json()); //without this req.body will be undefiend

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
if (require.main === module) {
  app.listen(process.env.PORT, () => {
    console.log("listening on port", process.env.PORT);
  });
}


module.exports = app;
