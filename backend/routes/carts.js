const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cartControllers');


router.post('/', cartCtrl.createCart);

// View all carts (for testing/admin)
router.get('/', cartCtrl.indexCart);

module.exports = router;

