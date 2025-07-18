import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/detail.css';

interface Product {
  _id: string;
  images: string[];
  name: string;
  description: string;
  price: number;
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [detailItem, setDetailItem] = useState<Product | null>(null);

  useEffect(() => {
    const fetchId = async () => {
      try {
        const resId = await fetch(`http://localhost:3001/api/items/${id}`);
        const data: Product = await resId.json();
        setDetailItem(data);
        console.log(data, 'this is ----');
      } catch (err) {
        console.error("Error fetching product details", err);
      }
    };
    if (id) fetchId();
  }, [id]);

  const handleAddToCart = async () => {
    if (!detailItem) return;

    try {
      console.log('Sending to cart:', {
        userId: 'guest123',
        productId: detailItem._id,
        quantity: 1,
      });
      const res = await fetch('http://localhost:3001/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'guest123', // Replace with real user if logged in
          productId: detailItem._id,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to add to cart');
      }

      navigate('/cart');
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  return (
    <>
      {detailItem && (
        <div className="detail-page-outer-box-container" key={detailItem._id}>
          <div className="main-image-container-box">
            <div className="main-image">
              <img
                src={detailItem.images[0]}
                alt={detailItem.name}
                className="main-image-display"
              />
            </div>
            <div className="detail-picture-row-container">
              {detailItem.images.map((img, idx) => (
                <div key={idx} className="inside-row-image-container">
                  <img src={img} alt={`${detailItem.name} ${idx + 1}`} className="image-container-index" />
                </div>
              ))}
            </div>
          </div>

          <div className="detail-picture-container-text">
            <div className="detail-item-name">{detailItem.name}</div>
            <div className="star-rating">
              <div>4.5</div>
              <span className="star filled">★</span>
              <span className="star filled">★</span>
              <span className="star filled">★</span>
              <span className="star filled">★</span>
              <span className="star">★</span>
            </div>
            <div className="detail-item-description">{detailItem.description}</div>
            <div className="detail-item-price">${detailItem.price.toFixed(2)}</div>
            <div>
              <button onClick={handleAddToCart}>Add to cart</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
