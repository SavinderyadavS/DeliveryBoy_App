import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MyAccountScreen = () => {
  // Placeholder data
  const deliveryBoy = {
    name: 'Savindar Yadav',
    image: require('../assets/dboy.jpg'),
    contact: '+91 9353762773',
  };

  const admin = {
    name: 'Navin Kumar',
    contact: '+91 9065455407',
  };

  const handleBack = () => {
    // Implement navigation logic to go back
  };

  const handleLogout = () => {
    // Implement logout logic
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
