import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import NavBar from '../components/Navbar';
import HomePageSlider from '../components/HomePageSlider';
import ListProducts from '../components/ListProducts';
import FeaturedProduct from '../components/FeaturedProduct';
import {FlatList} from 'react-native-gesture-handler';

// adjusted to avoid nested list
const HomeScreen = () => {
  const sections = [
    {key: 'slider', render: () => <HomePageSlider />},
    {key: 'products', render: () => <ListProducts />},
    {key: 'featured', render: () => <FeaturedProduct />},
  ];

  return (
    <View style = {styles.container}>
      <NavBar />
      <FlatList
        data = {sections}
        keyExtractor = {(item) => item.key}
        renderItem={({item}) => <View style ={styles.section}>{item.render()}</View>}
      />
    </View>
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
