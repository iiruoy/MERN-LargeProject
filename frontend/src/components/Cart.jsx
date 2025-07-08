import { useEffect, useState } from 'react';

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/cart');
        const data = await res.json();
        const guestCart = data.find(c => c.userId === 'guest123'); // filter guest cart
        console.log(data);
        setCart(guestCart);
      } catch (err) {
        console.error('Failed to load cart:', err);
      }
    };

    fetchCart();
  }, []);

  if (!cart) return <div>Loading cart...</div>;

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.items.map((item, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <img src={item.product.images[0]} alt="" width="100" />
            <div><strong>{item.product.name}</strong></div>
            <div>Quantity: {item.quantity}</div>
            <div>Price: ${item.product.price}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
