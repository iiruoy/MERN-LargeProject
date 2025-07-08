const Item = require('../models/item'); 
const cloudinary = require('../utils/cloudinary')

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
    const { name, price, description, category } = req.body;

    try {
        const imageUrls = [];

        for (const file of req.files) {
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'products' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                stream.end(file.buffer); // send in-memory buffer
            });

            imageUrls.push(uploadResult.secure_url);
        }

        const item = await Item.create({
            name,
            price,
            description,
            category,
            images: imageUrls
        });

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

const showID = async (req, res) => { 
    console.log(req.params.id, 'this is for the id');
    try {
        const item = await Item.findById(req.params.id); 
        res.status(200).json(item);
    } catch(error) { 
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}
module.exports = { 
    create, 
    index, 
    showID
}