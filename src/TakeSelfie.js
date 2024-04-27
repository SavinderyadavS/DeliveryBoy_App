import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage';
import { useDispatch, useSelector } from 'react-redux';


const TakeSelfie = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false); // New state variable
  const [isContinueDisabled, setIsContinueDisabled] = useState(true); // New state variable

  
  const user = useSelector(state => state.user);


  // Request permission to use the camera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    // Enable continue button only if an image has been captured
    setIsContinueDisabled(!capturedImage);
  }, [capturedImage]);

  const handleOpenCamera = () => {
    setShowCamera(true); // Set showCamera to true when opening the camera
  };

  const handleCaptureImage = async () => {
    try {
      if (cameraRef) {
        let photo = await cameraRef.takePictureAsync();
        setCapturedImage(photo.uri);
        setShowCamera(false); // After capturing, hide the camera
      }
    } catch (err) {
      setError(err.message);
    }
  };


  const uploadImage = async (filename,fileUri ) => {

    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const url = await uploadImg(filename ,blob);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }


async function uploadImg(filename , file) {
  const path = `users/${filename}`;

  try {
    const reference = storage().ref(path);
        await reference.put(file);

        const url = await reference.getDownloadURL().catch((error) => { throw error; });
        return url;
  }
  catch (error) {
    throw error;
  }
}



  const handleContinue = async () => {

    const delaerSelfiImage = await uploadImage(`delaerSelfi`, capturedImage); 

await firestore().collection('users').doc(user.uid).update({
  delaerSelfiImage 
      }); 

    if (!isContinueDisabled) {
      // Navigate to next page only if an image has been captured
      navigation.navigate('Hurray'); // Replace 'NextPage' with your actual screen name
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingTop: 10, marginTop: 35 }}>
        {/* Back button removed */}
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Create your profile</Text>
        {/* Question mark TouchableOpacity removed */}
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Let's click a selfie</Text>
        <Text style={{ fontSize: 12, marginTop: 5 }}>Remove mask, glasses, or cap and click in proper lighting</Text>
      </View>
      {hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <>
          {showCamera && ( // Conditionally render the Camera component
            <Camera
              style={{ flex: 1 }}
              type={Camera.Constants.Type.front}
              ref={(ref) => setCameraRef(ref)}
            />
          )}
          {capturedImage && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={{ uri: capturedImage }} style={{ width: 300, height: 300, borderRadius: 150 }} />
            </View>
          )}
          {!capturedImage && !showCamera && ( // Conditionally render the "Open Camera" button
            <TouchableOpacity onPress={handleOpenCamera} style={{ backgroundColor: '#3aa8c1', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 100 }}>
              <Text style={{ color: 'white' }}>Open Camera</Text>
            </TouchableOpacity>
          )}
          {showCamera && ( // Conditionally render the "Capture" button
            <TouchableOpacity onPress={handleCaptureImage} style={{ backgroundColor: '#3aa8c1', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 100 }}>
              <Text style={{ color: 'white' }}>Capture</Text>
            </TouchableOpacity>
          )}
        </>
      )}
      {error && <Text>Error: {error}</Text>}
      <TouchableOpacity onPress={handleContinue} style={[styles.continueButton, isContinueDisabled && styles.disabledButton]}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  continueButton: {
    backgroundColor: '#3aa8c1',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
    alignSelf: 'center',
  },
  continueButtonText: {
    color: 'white',
  },
  disabledButton: {
    opacity: 0.5,
  },
};

export default TakeSelfie;
