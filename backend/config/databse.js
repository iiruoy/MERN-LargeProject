console.log("Database file loaded")
const mongoose = require('mongoose');

console.log(process.env.DATABASE_URL);

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection


db.on('connected', function() {
    console.log(`Connected to MongoDb at ${db.host}:${db.port}`)
})

db.on('error', console.error.bind(console, 'MongoDB connection error:'));