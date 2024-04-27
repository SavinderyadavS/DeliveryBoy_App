import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import storage from '@react-native-firebase/storage';
import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';


const UploadDocuments = () => {
  const navigation = useNavigation();

  const [frontSideImage, setFrontSideImage] = useState(null);
  const [backSideImage, setBackSideImage] = useState(null);
  const [frontSidePANImage, setFrontSidePANImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State variable to track loading

  const user = useSelector(state => state.user);

  const uploadImage = async (filename, fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const url = await uploadImg(filename, blob);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  async function uploadImg(filename, file) {
    const path = `users/${user.uid}/${filename}`;

    try {
      const reference = storage().ref(path);
      await reference.put(file);
      const url = await reference.getDownloadURL().catch((error) => { throw error; });
      return url;
    } catch (error) {
      throw error;
    }
  }

  const handleFrontSideUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancell) {
      const uri = result.assets[0].uri;
      setFrontSideImage(uri);
    }
  };

  const handleBackSideUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancell) {
      const uri = result.assets[0].uri;
      setBackSideImage(uri);
    }
  };

  const handleFrontSidePANUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancell) {
      const uri = result.assets[0].uri;
      setFrontSidePANImage(uri);
    }
  };

  const handleContinue = async () => {
    console.log('Continue button clicked');

    // Check if images are selected
    if (!frontSideImage || !backSideImage || !frontSidePANImage) {
      alert('Please upload all required documents.');
      return;
    }

    // Set loading state to true
    setIsLoading(true);

    try {
      // Upload front side Aadhar card image
      const frontSideAadharURL = await uploadImage(`aadhar_card1`, frontSideImage);

      // Upload back side Aadhar card image
      const backSideAadharURL = await uploadImage(`aadhar_card2`, backSideImage);

      // Upload front side PAN card image
      const frontSidePANURL = await uploadImage(`pan_card1`, frontSidePANImage);

      // Create an object containing the download URLs for Aadhar card and PAN card
      const documents = {
        aadhar_card: {
          frontside: frontSideAadharURL,
          backside: backSideAadharURL,
        },
        pan_card: {
          frontside: frontSidePANURL,
        },
      };

      await firestore().collection('users').doc(user.uid).update({
        documents,
        verified: "bank"
      });

      console.log('Document URLs:', documents);

      // Now you can navigate to the next screen and pass this object as a parameter
      navigation.navigate('BankDetails', { documents });
    } catch (error) {
      console.error('Error uploading documents:', error);
      // Handle error (show an alert, etc.)
    } finally {
      // Set loading state to false after upload is complete
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#ffffff', '#FFFFFF']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            <TouchableOpacity onPress={handleFrontSidePANUpload} style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Upload Front Side</Text>
            </TouchableOpacity>
            {frontSidePANImage && <Image source={{ uri: frontSidePANImage }} style={styles.uploadedImage} />}
          </View>

          <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.continueButtonText}>Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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
