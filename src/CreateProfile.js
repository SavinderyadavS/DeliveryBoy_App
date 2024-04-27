import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ImageBackground, Image } from 'react-native';




const CreateProfile = ({ navigation ,route }) => {




  const { formattedPhoneNumber} = route.params;

  const handleStartNow = async () => {

    // Navigate to the basic detail page
    navigation.navigate('BasicDetailsPage',{ formattedPhoneNumber});
  };



  // List of steps
  const steps = [
    { id: 1, text: 'Create your Profile' },
    { id: 2, text: 'Upload Documents' },
    { id: 3, text: 'Add Bank Details' },
  ];

  return (
    <ImageBackground source={require('../assets/ggi.png')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Become a delivery partner!</Text>
        <Text style={styles.stepsLeft}>3 Steps left</Text>
        <View style={styles.statusIndicatorContainer}>
          <View style={styles.statusIndicator} />
          <View style={[styles.statusIndicator, styles.activeStatusIndicator]} />
          <View style={styles.statusIndicator} />
        </View>
        <Image
          source={require('../assets/avatar.jpg')} // Add your image source
          style={styles.image}
        />
        <View style={styles.stepsContainer}>
          {steps.map((step) => (
            <View key={step.id} style={styles.stepItem}>
              <Text style={styles.stepText}>{step.text}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleStartNow}>
          <Text style={styles.buttonText}>Start Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black', // Adjust text color as needed
  },
  stepsLeft: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black', // Adjust text color as needed
  },
  statusIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'black', // Adjust status indicator color as needed
    marginHorizontal: 5,
  },
  activeStatusIndicator: {
    backgroundColor: '#fff', // Change color for active status indicator
  },
  stepsContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepText: {
    fontSize: 18,
    color: 'black', // Adjust text color as needed
  },
  button: {
    backgroundColor: 'skyblue',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 200, // Adjust image width as needed
    height: 200, // Adjust image height as needed
    borderRadius: 100, // Make it circular
    marginBottom: 20, // Add some space between the avatar and the steps
  },
});

export default CreateProfile;
