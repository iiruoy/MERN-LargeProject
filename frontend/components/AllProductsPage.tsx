import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../css/list.css';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';

const localIP = Constants.expoConfig?.hostUri?.split(':').shift(); 
const BASE_URL = `http://COP4331Group7.xyz/api`;

// Define the shape of an item
interface Item {
  _id: string;
  name: string;
  description?: string;
  price: string | number;
  images?: string[];
}

const AllProductsPage: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id} = route.params as {id: string};

    const [items, setItems] = useState<Item[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch(`${BASE_URL}/items`);
                const data: Item[] = await res.json();
                setItems(data);
            } 
            catch (err) {
                console.log('Error', err);
            }
        };
        fetchItems();
    }, []);

  // Filter items by search
    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSearchChange = (text: string) => {
        setSearch(text);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                value={search}
                // onChangeText={(text) => setSearch(text)}
                onChangeText={handleSearchChange}
            />
            <Text style={styles.title}>Top Picks</Text>
            <View style={styles.productsGrid}>
                {filteredItems.map((item) => (
                    <View key={item._id} style={styles.productCard}>
                        {item.images && item.images.length > 0 && (
                            <TouchableOpacity onPress={() => navigation.navigate('Product', { id: item._id })}>
                                <Image source={{ uri: item.images[0] }} style={styles.productImage} />
                            </TouchableOpacity>
                        )}
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productDescription}>
                            {item.description?.split(' ').slice(0, 5).join(' ') || ''}...
                        </Text>
                        <View style={styles.starRating}>
                            <Text style={styles.ratingNumber}>4.5</Text>
                            <Text style={styles.star}>★★★★☆</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>${item.price}</Text>
                            <TouchableOpacity style={styles.buyButton}>
                                <Text style={styles.buyButtonText}>Buy Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
  },
  productDescription: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
  },
  starRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingNumber: {
    marginRight: 4,
    fontSize: 12,
  },
  star: {
    color: '#FFD700',
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default AllProductsPage;
