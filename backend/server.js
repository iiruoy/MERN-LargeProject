const express = require("express"); 
const cors = require('cors');
require("dotenv").config();
const itemsRoutes = require("./routes/items");
require('./config/databse'); 


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


// listen for request
app.listen(process.env.PORT, () => { 
    console.log("listeing port ", process.env.PORT)
})

