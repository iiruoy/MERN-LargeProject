const mongoose = require("mongoose"); 


const Schema = mongoose.Schema; 

const cartItemSchema = new Schema({ 
    product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  }
});

const cartSchema = new Schema({ 
    userId: { 
        type: String, 
        required: true, 
    }, 
    items: [cartItemSchema]
})

module.exports = mongoose.model('Cart', cartSchema);