import { useEffect, useState } from 'react'


function ListProducts() {

    const [items, setItems] = useState([]); 

    useEffect(() => {
        const fetchItems = async () => { 
            try { 
                const res = await fetch('http://localhost:3001/api/items');
                const data = await res.json()
                console.log(data); 
                setItems(data);
            } catch (err){ 
                console.log("Error")
            }
        }
        fetchItems(); 
    }, []); 


    return (
        <div className='card-container-box-product-home-page'>
            <div>Top Picks</div>
            <div className='table'>
                {items.map((item) => (
                <div key={item._id}>
                    {item.images.map((img, idx) => (
                        <div key={idx}><img src={img} alt="" /></div>
                    ))}
                    <div>{item.name}</div>
                    <div>{item.description}</div>
                </div>
                ))}
            </div>
            <div></div>
        </div>

    )
}

export default ListProducts