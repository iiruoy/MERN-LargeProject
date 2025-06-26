const express = require("express");
const Item = require('../models/item'); 
const itemCtrl = require('../controllers/itemControllers');


const router = express.Router(); 

router.get('/', itemCtrl.index);


router.get('/:id', (req, res) => { 
    res.json({mssg: 'Get a single items and its id'})
})

router.post('/', itemCtrl.create);

module.exports = router; 
