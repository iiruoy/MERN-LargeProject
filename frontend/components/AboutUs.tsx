import React , { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUs: FC = () => {
  return (
    <View style={styles.aboutusOuter}>
      <View style={styles.aboutusCard}>
        <Text style={styles.aboutusTitle}>About Us</Text>
        <View style={styles.aboutusUnderline}></View>
        <Text style={styles.aboutusText}>
          Welcome to <Text style="aboutus-brand">NodeMart</Text>!{'\n\n'}
          We are passionate about bringing you the best tech products at unbeatable prices. Our team is dedicated to providing a seamless shopping experience, fast shipping, and top-notch customer support.{'\n\n'}
          Whether you’re a gadget enthusiast or just looking for a great deal, we’re here to help you find exactly what you need.{'\n\n'}
          <Text style={{ fontWeight: 'bold' }}>Thank you for choosing NodeMart!</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  aboutusOuter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  aboutusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AboutUs;