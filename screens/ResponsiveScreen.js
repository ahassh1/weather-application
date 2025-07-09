import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Image,
} from 'react-native';

export default function ResponsiveScreen() {
  const { width, height } = useWindowDimensions();

  const containerWidth = width * 0.9;
  const imageSize = width * 0.6;
  const fontSize = width < 400 ? 16 : 20;

  console.log('Width:', width, 'Height:', height);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={[styles.scroll, { minHeight: height }]}>
        <View style={[styles.container, { width: containerWidth }]}>
          <Text style={[styles.heading, { fontSize }]}>Responsive Expo App</Text>

          <Image
            source={require('../assets/images/partlycloudy.png')}
            style={[styles.image, { width: imageSize, height: imageSize }]}
          />

          <Text style={{ fontSize, textAlign: 'center' }}>
            This layout works on both mobile and web. It's 100% flexible using useWindowDimensions,
            flex, and ScrollView.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    resizeMode: 'contain',
    marginVertical: 20,
  },
});
