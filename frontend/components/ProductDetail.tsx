import React, { useEffect, useState } from 'react';
import '../css/Detail';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Product {
  _id: string;
  images: string[];
  name: string;
  description: string;
  price: number;
}

function ProductDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { paramName } = route.params;

  const { id } = route.params as { id: string };
  const [detailItem, setDetailItem] = useState<Product | null>(null);

  const goToScreen = () => {
    navigation.navigate('ScreenName', { someParam : value});
  }

  useEffect(() => {
    const fetchId = async () => {
      try {
        // const resId = await fetch(`http://192.168.68.66:3001/api/items/${id}`);
        const resId = await fetch(`http://COP4331Group7.xyz/api/items/${id}`);
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
      // const res = await fetch('http://192.168.68.66:3001/api/cart', {
      const res = await fetch('http://COP4331Group7.xyz/api/cart', {  
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
        <View className="detail-page-outer-box-container" key={detailItem._id}>
          <View className="main-image-container-box">
            <View className="main-image">
              <img
                src={detailItem.images[0]}
                alt={detailItem.name}
                className="main-image-display"
              />
            </View>
            <View className="detail-picture-row-container">
              {detailItem.images.map((img, idx) => (
                <View key={idx} className="inside-row-image-container">
                  <img src={img} alt={`${detailItem.name} ${idx + 1}`} className="image-container-index" />
                </View>
              ))}
            </View>
          </View>

          <View className="detail-picture-container-text">
            <View className="detail-item-name">{detailItem.name}</View>
            <View className="star-rating">
              <View>4.5</View>
              <span className="star filled">★</span>
              <span className="star filled">★</span>
              <span className="star filled">★</span>
              <span className="star filled">★</span>
              <span className="star">★</span>
            </View>
            <View className="detail-item-description">{detailItem.description}</View>
            <View className="detail-item-price">${detailItem.price.toFixed(2)}</View>
            <View>
              <button onClick={handleAddToCart}>Add to cart</button>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

export default ProductDetail;
