import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserID, setUserData } from './Store/Slice/userSlice';
import firestore from '@react-native-firebase/firestore';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Check if authentication token exists in AsyncStorage
        const authToken = await AsyncStorage.getItem('authToken');
        
        if (authToken) {
          const uid = await AsyncStorage.getItem('userID');

          const userDocumentSnapshot = await firestore()
            .collection('users')
            .doc(uid)
            .get();
  
            console.log(uid)
            console.log(userDocumentSnapshot)
          // Check if userDocument exists
          if (userDocumentSnapshot.exists) {
            const userDocument = userDocumentSnapshot.data();
            dispatch(setUserID(uid));
            dispatch(setUserData(userDocument));
  
            // Determine navigation based on userDocument.verified
            const verificationStatus = userDocument.verified;
            switch (verificationStatus) {
              case 'doc':
                navigation.navigate('UploadDocuments');
                break;
              case 'bank':
                navigation.navigate('BankDetails');
                break;
              case 'selfi':
                navigation.navigate('TakeSelfie');
                break;
              case 'verification':
                navigation.navigate('Hurray');
                break;
              case 'verified':
                navigation.navigate('Main');
                break;
              default:
                // If user verification status is unknown, navigate to login screen
                navigation.navigate('LoginScreen');
            }
          } else {
            // Handle case when userDocument does not exist
            console.log('User document does not exist');
            console.log(authToken)
            navigation.navigate('LoginScreen');
          }
        } else {
          navigation.navigate('LoginScreen');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        // Handle errors, e.g., show an alert to the user
      }
    };
  
    setTimeout(checkLoginStatus, 3000);
  }, [dispatch, navigation]);
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3aa8c1' }}>
      <Image source={require('../assets/spla.gif')} style={{ width: 400, height: 790, borderRadius: 25 }} />
    </View>
  );
};

export default SplashScreen;
