const express = require("express");
const Item = require('../models/item'); 

const router = express.Router(); 

router.get('/', (req, res) => { 
    res.json({mssg: 'get all items'}); 
}); 

router.get('/:id', (req, res) => { 
    res.json({mssg: 'Get a single items and its id'})
})

router.post('/', async (req, res) => { 
    const {name, price, descreption, images, category} = req.body

    try { 
        const item = await Item.create({name, price, descreption, images, category})
        res.status(200).json(item)
    } catch(error){ 
        res.status(400).json({error: error.message})
    }
})

module.exports = router; 
