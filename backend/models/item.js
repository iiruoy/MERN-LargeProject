const mongoose = require("mongoose"); 


const Schema = mongoose.Schema; 

const itemSchema = new Schema({ 
    name: { 
        type: String, 
        required: true
    }, 
    description: String, 
    price: {
        type: Number, 
        required: true
    }, 
    images: [String], 
    category: String,
}, {timestamps: true })

module.exports = mongoose.model('Item', itemSchema);