import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const UnderVerification = () => {
  return (
    <ImageBackground
      source={require('../assets/verifying.gif')} // Change 'yourBackground.gif' to the actual path of your GIF file
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Your Profile under Verification</Text>
          <Text style={styles.subtitle}>You will start receiving Orders once your Documents are Verified</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    //width:350,
    //height:800,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop:300,
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default UnderVerification;
