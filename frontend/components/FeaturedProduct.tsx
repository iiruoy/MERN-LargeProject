import React from 'react';
import importedStyles from '../css/FeaturedProduct';
import { View, Image, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

const FeaturedProduct: React.FC = () => {
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.titleTrending}>Trending Now</Text>
        <View style={styles.underlineBar} />
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../assets/360_F_322281216_Gc3ZRt1BJe127lZFwZFqcxz2b1JVU6na.jpg')}
            style={styles.image}
          />
          <View style={styles.grayOverlay} />
        </View>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../assets/portrait-happy-young-man-holding-laptop-computer_171337-12000.avif')}
            style={styles.image}
          />
          <View style={styles.grayOverlay} />
        </View>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../assets/pexels-photo-3756962.jpeg')}
            style={styles.image}
          />
          <View style={styles.grayOverlay} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  titleTrending: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  underlineBar: {
    width: 60,
    height: 4,
    backgroundColor: '#333',
    marginTop: 4,
    borderRadius: 2,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  imageWrapper: {
    position: 'relative',
    width: 100,
    height: 140,
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  grayOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(128,128,128,0.3)',
    borderRadius: 8,
  },
});

export default FeaturedProduct;

