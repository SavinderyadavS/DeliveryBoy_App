import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Hurray = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Main');
    }, 5000);

    return () => clearTimeout(timer); // Clear the timeout on component unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Thanks for your Patience</Text>
        <Text style={styles.overlayText}>Please wait...</Text>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Hurray;
