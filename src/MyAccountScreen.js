import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import auth from '@react-native-firebase/auth';


import { useSelector } from 'react-redux';

const MyAccountScreen = () => {

  const navigation = useNavigation(); // Get the navigation object


  const user = useSelector(state => state.user);
  const { uid, userData } = user;

  console.log(userData)

  // Placeholder data
  const deliveryBoy = {
    name: userData.firstName || 'test user',
    image: userData.delaerSelfiImage ? { uri: userData.delaerSelfiImage } : require('../assets/dboy.jpg'),
    contact: userData.mobileNumber || '+91 9353762773',
  };

  const admin = {
    name: 'Navin Kumar',
    contact: '+91 9065455407',
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Navigate to the main page instead of going back
      navigation.navigate('Main');
      return true; // Returning true prevents default back behavior
    });

    return () => backHandler.remove(); // Remove the event listener on component unmount
  }, [navigation]);


  const handleBack = () => {
    // Navigate to the main page instead of going back
    navigation.navigate('Main');
  };

  const handleLogout = async () => {
    // Implement logout logic
    try {
      // await auth().signOut();
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userID');

      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };

  return (
    <LinearGradient colors={['skyblue', 'white']} style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 20, marginTop: 30 }}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image source={deliveryBoy.image} style={{ width: 100, height: 100, borderRadius: 50 }} />
          <Text>{deliveryBoy.name}</Text>
          <Text>{deliveryBoy.contact}</Text>
        </View>

        <View style={{ backgroundColor: '#e0e0e0', padding: 10, marginTop: 20 }}>
          <Text>Contact Admin</Text>
          <Text>{admin.name}</Text>
          <Text>{admin.contact}</Text>
        </View>

        {/* Wrapped the TouchableOpacity with a View and styled the View */}
        <View style={{ alignSelf: 'center', marginTop: 20, backgroundColor: '#3aa8c1', borderRadius: 8 }}>
          <TouchableOpacity onPress={handleLogout} style={{ padding: 10 }}>
            <Text style={{ color: '#fff' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default MyAccountScreen;
