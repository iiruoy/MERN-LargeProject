import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

// may need to add .tsx to ends
import HomePageSlider from '../components/HomePageSlider';
import ListProducts from '../components/ListProducts';
import FeaturedProduct from '../components/FeaturedProduct';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <HomePageSlider />
      </View>
      <View style={styles.section}>
        <ListProducts />
      </View>
      <View style={styles.section}>
        <FeaturedProduct />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // plain white
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
});

export default HomeScreen;
