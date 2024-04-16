import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

const UploadDocuments = () => {
  const navigation = useNavigation();

  const [frontSideImage, setFrontSideImage] = useState(null);
  const [backSideImage, setBackSideImage] = useState(null);

  const handleFrontSideUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFrontSideImage(result.uri);
    }
  };

  const handleBackSideUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setBackSideImage(result.uri);
    }
  };

  const handleContinue = () => {
    console.log('Continue button clicked');
    navigation.navigate('BankDetails');
  };

  return (
    <LinearGradient colors={['#ffffff', '#FFFFFF']} style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.title}>Upload your documents</Text>
        <Text style={styles.subtitle}>Upload all documents to start earning</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Identity Proof - Aadhar Card</Text>
          
          <Text style={styles.sectionSubtitle}>Front Side</Text>
          <TouchableOpacity onPress={handleFrontSideUpload} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload Front Side</Text>
          </TouchableOpacity>
          {frontSideImage && <Image source={{ uri: frontSideImage }} style={styles.uploadedImage} />}

          <Text style={styles.sectionSubtitle}>Back Side</Text>
          <TouchableOpacity onPress={handleBackSideUpload} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload Back Side</Text>
          </TouchableOpacity>
          {backSideImage && <Image source={{ uri: backSideImage }} style={styles.uploadedImage} />}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. PAN Card</Text>
          
          <Text style={styles.sectionSubtitle}>Upload Front Side</Text>
          <TouchableOpacity onPress={handleFrontSideUpload} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload Front Side</Text>
          </TouchableOpacity>
          {frontSideImage && <Image source={{ uri: frontSideImage }} style={styles.uploadedImage} />}
        </View>

        <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mainContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#3aa8c1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  uploadedImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  continueButton: {
    backgroundColor: '#088F8F',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default UploadDocuments;
