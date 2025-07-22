import { useEffect, useState } from 'react';
import '../css/cart.css'

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

  const handleCheckout = async () => {
  try {
    const res = await fetch('http://localhost:3001/api/cart'); // or pass userId here
    const cart = await res.json();
    const guestCart = cart.find(c => c.userId === 'guest123');

    const checkoutRes = await fetch('http://localhost:3001/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: guestCart.items })
    });

    const data = await checkoutRes.json();
    window.location.href = data.url; // redirect to Stripe Checkout
  } catch (err) {
    console.error('Checkout failed:', err);
  }
};


  if (!cart) return <div>Loading cart...</div>;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cart.items.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        cart.items.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.product.images[0]} alt="" className="cart-item-image" />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.product.name}</div>
              <div className="cart-item-quantity">Quantity: {item.quantity}</div>
              <div className="cart-item-price">Price: ${item.product.price}</div>
            </div>
          </div>
        ))
      )}
      <button className="cart-checkout-btn" onClick={handleCheckout}>Check out</button>
    </div>
  );
}

export default Cart;
