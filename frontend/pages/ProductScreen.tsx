import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ProductDetail from '../components/ProductDetail';

const ProductScreen = () => {
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
  });

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets]);
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const data = new FormData();

    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);

    images.forEach((image, index) => {
      data.append('images', {
        uri: image.uri,
        type: 'image/jpeg',
        name: `image${index}.jpg`,
      } as any);
    });

    // changed to 4000  test
    try {
      // const res = await fetch('http://192.168.68.65:3001/api/items/', {
      const res = await fetch('http://COP4331Group7.xyz/api/items/', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await res.json();
      Alert.alert('Success', 'Product uploaded successfully!');
      console.log(result);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while uploading.');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={formData.name} onChangeText={text => handleChange('name', text)} />

      <Text style={styles.label}>Price</Text>
      <TextInput style={styles.input} value={formData.price} onChangeText={text => handleChange('price', text)} keyboardType="numeric" />

      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={formData.description} onChangeText={text => handleChange('description', text)} multiline />

      <Text style={styles.label}>Category</Text>
      <TextInput style={styles.input} value={formData.category} onChangeText={text => handleChange('category', text)} />

      <Button title="Pick Images" onPress={pickImages} />
      
      <View style={styles.imagePreviewContainer}>
        {images.map((img, idx) => (
          <Image key={idx} source={{ uri: img.uri }} style={styles.imagePreview} />
        ))}
      </View>

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    marginTop: 12,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    margin: 4,
    borderRadius: 8,
  },
});
