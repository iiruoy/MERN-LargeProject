const express = require("express");
const Item = require('../models/item'); 
const itemCtrl = require('../controllers/itemControllers');
const multer = require('multer');
const storage = multer.memoryStorage(); // or set a disk destination
const upload = multer({ storage });


const router = express.Router(); 

router.get('/', itemCtrl.index);


router.get('/:id', (req, res) => { 
    res.json({mssg: 'Get a single items and its id'})
})

router.post('/', upload.array('images'), itemCtrl.create);

module.exports = router; 
