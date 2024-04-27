// import React,{useEffect} from 'react';
// import {Image,Text,View} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import LoginScreen from './LoginScreen';


// const SplashScreen = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     const navigateToLoginScreen = () => {


//       navigation.navigate('LoginScreen');
//     };

//     setTimeout(navigateToLoginScreen, 3000); 
//   }, [navigation]);
// return( 
// <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:'#3aa8c1'}}> 

// <Image source={require('../assets/spla.gif')} style={{width:400,height:790, borderRadius:25}} />
// </View>
// ); 
// };

// export default SplashScreen;


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
          const userDocument = await firestore()
            .collection('users')
            .doc(uid)
            .get();
          dispatch(setUserID(uid));
          dispatch(setUserData(userDocument.data()));
          navigation.navigate('Main');
        } else {
          navigation.navigate('LoginScreen');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
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
