const Cart = require('../models/cart');
const cloudinary = require('../utils/cloudinary');

const indexCart = async (req, res) => { 
    try { 
        const findCartItem = await Cart.find({}).populate('items.product');;
        console.log(findCartItem);
        res.status(200).json(findCartItem); 
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

const createCart = async (req, res) => { 
    console.log('POST /api/cart hit');
    console.log('req.body:', req.body); 
    try { 
        let cart = await Cart.findOne({ userId: req.body.userId });

        if (!cart) {
            cart = new Cart({ userId: req.body.userId, items: [] });
        }   

        const existingItem = cart.items.find(item => item.product.toString() === req.body.productId);

        console.log(existingItem, 'thissss')

        if (existingItem) {
        existingItem.quantity += req.body.quantity;
        } else {
        cart.items.push({
                product: req.body.productId,
                quantity: req.body.quantity
            });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) { 
        console.error('Error in createCart:', error);
        res.status(400).json({ error: error.message });
    }
}


module.exports = { 
    createCart, 
    indexCart, 
    
}