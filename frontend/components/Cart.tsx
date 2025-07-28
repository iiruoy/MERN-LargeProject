import React, { useEffect, useState, createContext, useContext } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useCart } from '../components/CartContext';

interface Product {
  images: string[];
  name: string;
  price: number;

}

interface CartItem {
  product: Product;
  quantity: number;
  addToCart: (item: Item) => void;
}

interface CartData {
  userId: string;
  items: CartItem[];
}

export default function Cart() {
  const { cart, loading } = useCart();
  /*
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // const res = await fetch('http://192.168.68.66:3001/api/cart');
        const res = await fetch('http://COP4331Group7.xyz/api/cart');
        const data: CartData[] = await res.json();
        const guestCart = data.find(c => c.userId === 'guest123');
        setCart(guestCart || null);
      } catch (err) {
        console.error('Failed to load cart:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);
*/


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading cart...</Text>
      </View>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cart.items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Image
            source={{ uri: item.product.images[0] }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.info}>
            <Text style={styles.name}>{item.product.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Price: ${item.product.price}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
});
