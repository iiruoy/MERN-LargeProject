import { useState } from 'react'


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
        setImageUrl(files); 
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
    <form onSubmit={handleSubmit}>
        <div>Name<input type="text" name="name" onChange={handleChange} value={formData.name}/></div>
        <div>imges<input type="file" multiple onChange={handleFileCHange} /></div>
        <div>price<input type="text" name="price" onChange={handleChange} value={formData.price}/></div>
        <div>description<input type="text" name="description" onChange={handleChange} value={formData.description}/></div>
        <div>catogoray<input type="text" name="category" onChange={handleChange} value={formData.category}/></div>
        <button type="submit">Submit</button>
    </form>
  )
}

export default Product