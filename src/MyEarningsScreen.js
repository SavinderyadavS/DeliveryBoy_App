import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

// Define the fetchWeekDataFromAPI function to fetch week data from your backend API
const fetchWeekDataFromAPI = async () => {
  try {
    // Make an API call to fetch week data
    const response = await fetch('your_api_endpoint');
    // Assuming the response is in JSON format, parse it
    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching week data:', error);
    return []; // Return an empty array in case of error
  }
};

const MyEarningsScreen = () => {
  const [numberOfOrdersDelivered, setNumberOfOrdersDelivered] = useState(0);
  const [weekData, setWeekData] = useState([]);

  // Function to fetch and update week data from API
  const fetchWeekData = async () => {
    try {
      // Fetch week data from API
      const data = await fetchWeekDataFromAPI();
      // Update state with fetched week data
      setWeekData(data);
    } catch (error) {
      console.error('Error fetching week data:', error);
    }
  };

  useEffect(() => {
    // Fetch week data when component mounts
    fetchWeekData();
  }, []);

  return (
    <View style={{ flex: 1,marginTop:20 }}>
      {/* Background image */}
      <Image
        source={require('../assets/bgw.jpg')} // Replace with your image path
        style={{ flex: 1, resizeMode: 'cover', position: 'absolute', width: '100%', height: '70%', marginTop: 150 }}
      />
      
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* Back arrow */}
          <Image source={require('../assets/bc.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
        {/* Title */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>My Rewards</Text>
        {/* Coin value */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../assets/coin.jpg')} style={{ width: 30, height: 30 }} />
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginLeft: 5 }}>
            {numberOfOrdersDelivered} {/* Replace with actual value */}
          </Text>
        </View>
      </View>

      {/* Number of orders delivered in this week */}
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: '#3aa8c1', marginHorizontal: 20, marginTop: 10 }}
        onPress={() => {
          // Handle onPress event
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>No of orders delivered</Text>
        <Text style={{ fontSize: 14, color: 'black' }}>in this week</Text>
      </TouchableOpacity>

      {/* Scrollable box to show delivered order data */}
      <ScrollView style={{ marginTop: 10, paddingHorizontal: 20 }}>
        {weekData.map((order, index) => (
          <View key={index} style={{ borderWidth: 1, borderColor: 'white', padding: 10, marginBottom: 10 }}>
            <Text style={{ color: 'white' }}>{order.orderDetails}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyEarningsScreen;