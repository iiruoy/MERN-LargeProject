const express = require("express"); 
require("dotenv").config();
const itemsRoutes = require("./routes/items");
require('./config/databse')


// express app
const app = express(); 

app.use(express.json()); //without this req.body will be undefiend

app.use((req, res, next) => { 
    console.log(req.path, req.method); 
    next();
})

// routes
app.use('/', itemsRoutes);


// listen for request
app.listen(process.env.PORT, () => { 
    console.log("listeing port 3000", process.env.PORT)
})

