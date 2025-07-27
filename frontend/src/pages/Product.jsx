import { useState } from 'react'
import '../css/addProduct.css'

function Product() {

    const [image, setImageUrl] = useState([]); 
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: ''
    });

    function handleFileCHange(e) { 
        const files = Array.from(e.target.files); 
        setImageUrl(prevFiles => [...prevFiles, ...files]); 
        console.log(image);
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault(); 

        const data = new FormData();
        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("description", formData.description);
        data.append("category", formData.category);

        image.forEach((file) => {
            data.append("images", file);
        });
    
        fetch("http://localhost:3001/api/items/", {
            method: "POST",
            body: data,
        })
        .then((res) => res.json())
        .then((result) => console.log("Success:", result))
        .catch((err) => console.error("Error:", err));
    }




  return (
    <form onSubmit={handleSubmit} className="product-form">
    <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={handleChange} value={formData.name} />
    </div>

    <div className="form-group">
        <label htmlFor="images">Images</label>
        <input type="file" id="images" multiple onChange={handleFileCHange} />
    </div>

    <div className="form-group">
        <label htmlFor="price">Price</label>
        <input type="text" name="price" id="price" onChange={handleChange} value={formData.price} />
    </div>

    <div className="form-group">
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" onChange={handleChange} value={formData.description} />
    </div>

    <div className="form-group">
        <label htmlFor="category">Category</label>
        <input type="text" name="category" id="category" onChange={handleChange} value={formData.category} />
    </div>

    <button type="submit" className="submit-btn">Submit</button>
    </form>

  )
}

export default Product