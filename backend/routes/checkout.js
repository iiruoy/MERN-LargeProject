const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {

console.log(req.body, 'this is for the checloug')
const { items } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items.map(item => ({
            price_data: {
            currency: 'usd',
            product_data: {
                name: item.product.name,
                images: [item.product.images[0]],
            },
            unit_amount: Math.round(item.product.price * 100),
            },
            quantity: item.quantity,
        })),
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cart',
        });   
        res.json({ url: session.url });
    } catch (err) {
        console.error('Stripe error:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
