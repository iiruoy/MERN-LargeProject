import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../pages/HomeScreen';
import ProductScreen from '../pages/ProductScreen';
import ProductDetail from '../components/ProductDetail';
import Cart from '../components/Cart';
import Success from '../components/Success';
import AboutUs from '../components/AboutUs';
import ContactUs from '../components/ContactUs';
import AuthScreen from '../pages/AuthScreen';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

// added register/log in
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen name="Main" component={MainStack} />
        <Drawer.Screen name="Products" component={ProductScreen} />
        <Drawer.Screen name="Cart" component={Cart} />
        <Drawer.Screen name='About Us' component={AboutUs} />
        <Drawer.Screen name='Contact Us' component={ContactUs} />
        <Drawer.Screen name="Register/Log in" component={AuthScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

function MainStack() {
  return(
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
  )
}
