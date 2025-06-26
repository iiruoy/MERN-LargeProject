const Item = require('../models/item'); 

// get all items 
const index = async (req, res) => { 
    try { 
        const findAllItems = await Item.find({}); 
        console.log(findAllItems, 'thisssss'); 
        res.status(200).json(findAllItems); 
    } catch(error) { 
        res.status(400).json({error: error.message});
    }
}

// create ne workout 
const create = async (req, res) => { 
    const {name, price, descreption, images, category} = req.body
    console.log(req.body)
    try { 
        const item = await Item.create({name, price, descreption, images, category})
        res.status(200).json(item)
    } catch(error){ 
        res.status(400).json({error: error.message})
    }
}

module.exports = { 
    create, 
    index
}