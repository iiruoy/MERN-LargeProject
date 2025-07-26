import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../css/list.css'

function AllProductsPage() {
    const { id } = useParams();
    const [items, setItems] = useState([]); 
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchItems = async () => { 
            try { 
                const res = await fetch('http://localhost:3001/api/items');
                const data = await res.json()
                setItems(data);
            } catch (err){ 
                console.log("Error")
            }
        }
        fetchItems(); 
    }, []); 

    // Filter items by search
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='card-container-box-product-home-page'>
            {/* Transparent Search Bar */}
            <input
                className="allproducts-search"
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div className='title-product-home-page'>Top Picks</div>
            <div className='table'>
                {filteredItems.map((item) => (
                <div key={item._id} className='outer-div-for-index-product-container'>
                    {item.images && item.images.length > 0 && (
                    <Link to={`/product/${item._id}`} className="product-link">
                        <div className='container-index-box-container-image'>
                        <img src={item.images[0]} alt="" className="image-container-index" />
                        </div>
                    </Link>
                    )}
                    <div>{item.name}</div>
                    <div className='description-product-list'>{item.description?.split(' ').slice(0, 5).join(' ') || ''}...</div>
                    <div className="star-rating">
                        <div>4.5</div>
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star filled">★</span>
                        <span className="star">★</span> 
                    </div>
                    <div className='price-container-button'>
                        <div>{item.price}</div>
                        <div><button>buy now</button></div>
                    </div>
                </div>
                ))}
            </div>
            <div></div>
        </div>
    )
}

export default AllProductsPage