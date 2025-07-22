import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../pages/HomeScreen';
import ProductScreen from '../pages/ProductScreen';
import ProductDetail from '../components/ProductDetail';
import Cart from '../components/Cart';
import Success from '../components/Success';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen name="Main" component={MainStack} options={{ title: 'Home'}} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
