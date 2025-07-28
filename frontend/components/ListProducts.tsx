import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  ProductDetail: { id: string };
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductDetail'
>;

interface Item {
  _id: string;
  images: string[];
  name: string;
  description?: string;
  price: number;
}

export default function ListProducts() {
  const navigation = useNavigation<NavigationProp>();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // const res = await fetch('http://192.168.68.65:3001/api/items');
        const res = await fetch('http://COP4331Group7.xyz/api/items');
        const data: Item[] = await res.json();
        setItems(data);
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    };
    fetchItems();
  }, []);

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('ProductDetail', { id: item._id })}
    >
      {item.images && item.images.length > 0 && (
        <Image
          source={{ uri: item.images[0] }}
          style={styles.productImage}
          resizeMode="cover"
        />
      )}
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>
        {(item.description?.split(' ').slice(0, 5).join(' ') || '') + '...'}
      </Text>
      <View style={styles.starRating}>
        <Text>4.5</Text>
        <Text style={[styles.star, styles.filledStar]}>★</Text>
        <Text style={[styles.star, styles.filledStar]}>★</Text>
        <Text style={[styles.star, styles.filledStar]}>★</Text>
        <Text style={[styles.star, styles.filledStar]}>★</Text>
        <Text style={styles.star}>★</Text>
      </View>
      <View style={styles.priceButtonContainer}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Picks</Text>
      <FlatList
        data={items}        
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 180,
    borderRadius: 6,
    marginBottom: 8,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  productDescription: {
    marginBottom: 8,
    color: '#555',
  },
  starRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  star: {
    fontSize: 18,
    color: '#ccc',
    marginLeft: 4,
  },
  filledStar: {
    color: '#f5a623', // gold color
  },
  priceButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
