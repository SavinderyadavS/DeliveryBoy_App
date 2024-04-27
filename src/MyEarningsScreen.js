import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView ,StyleSheet} from 'react-native';
import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';




const MyEarningsScreen = () => {
  
  // const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  // const [weekData, setWeekData] = useState(user.order);
  // const sixDaysAgo = new Date();
  // sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);


  const weekData = user?.order?.filter(order => order.status === "Delivered");
  const numberOfOrdersDelivered = weekData.length;


console.log("irsersr",weekData)
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
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>No of orders delivered : {numberOfOrdersDelivered}</Text>
        <Text style={{ fontSize: 14, color: 'black' }}>in this week</Text>
      </TouchableOpacity>

      {/* Scrollable box to show delivered order data */}
      <ScrollView style={{ marginTop: 10, paddingHorizontal: 20 }}>
        {/* {weekData.map((order, index) => (
          <View key={index} style={{ borderWidth: 1, borderColor: 'white', padding: 10, marginBottom: 10 }}>
            <Text style={{ color: 'red' }}>{index}</Text>
            <Text style={{ color: 'red' }}>{order.id}</Text>
          </View>
        ))} */}
        {weekData.map((order, index) => (
  <View key={index} style={styles.orderItem}>
    <Text style={styles.orderIndex}>{index + 1}</Text>
    <Text style={styles.orderId}>{order.id}</Text>
  </View>
))}
      </ScrollView>
    </View>
  );
};

export default MyEarningsScreen;
const styles = StyleSheet.create({
  orderItem: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  orderIndex: {
    color: 'green',
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  orderId: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
