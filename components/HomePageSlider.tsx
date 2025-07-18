import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const { width } = Dimensions.get('window');

const wordContainer = [
  {
    text: 'Limited time offer 30% off',
    desc: 'Crank it up. Hear the world differently. Today!',
    img: require('../assets/header_headphone_image.png'),
  },
  {
    text: 'Only a few left in stock',
    desc: 'Next-gen performance. Stunning visuals. Play without limits.',
    img: require('../assets/header_playstation_image.png'),
  },
  {
    text: 'Exclusive deal get more than 50% off',
    desc: 'Power meets precision in the ultimate creative machine.',
    img: require('../assets/header_macbook_image.png'),
  },
];

export default function HomePageSlider() {
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % wordContainer.length;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {wordContainer.map((item, i) => (
        <View key={i} style={styles.slide}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.text}</Text>
            <Text style={styles.description}>{item.desc}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.buttonPrimary}>
                <Text style={styles.buttonText}>Order Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonSecondary}>
                <Text style={styles.buttonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image source={item.img} style={styles.image} resizeMode="contain" />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    height: 350,
  },
  slide: {
    width,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonPrimary: {
    backgroundColor: '#007bff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonSecondary: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: width * 0.8,
    height: 180,
  },
});
