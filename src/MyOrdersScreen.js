import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Linking, Alert } from 'react-native';

const MyOrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderId: 'ORD001',
      status: 'Pending',
      itemDetails: '2 * 20 Liter Water  2 Dispenser',
      dateTime: '2024-04-07 10:30',
      customerName: 'Rajesh',
      customerMobile: '1234567890',
      customerAddress: 'No 23, Floor 3, MT Street, RT Nagar, Blr-560032',
      amountToCollect: '₹27.00',
      cashReceived: false,
      expanded: false,
    },
    {
      id: '2',
      orderId: 'ORD002',
      status: 'Delivered',
      itemDetails: '1 * 20 Liter Water',
      dateTime: '2024-04-06 15:45',
      customerName: 'Sheela ',
      customerMobile: '9876543210',
      customerAddress: 'No 12, Floor 0, MT Street, RT Nagar, Blr-560032',
      amountToCollect: '₹64.00',
      cashReceived: true,
      expanded: false,
    },
    {
      id: '3',
      orderId: 'ORD003',
      status: 'Cancelled',
      itemDetails: '3 * 10 Liter Water',
      dateTime: '2024-04-05 14:00',
      customerName: 'John Doe',
      customerMobile: '7890123456',
      customerAddress: 'No 45, Floor 2, ML Street, BTM Layout, Blr-560076',
      amountToCollect: '₹35.00',
      cashReceived: false,
      expanded: false,
    },
    {
      id: '4',
      orderId: 'ORD004',
      status: 'Pending',
      itemDetails: '5 * 20 Liter Water',
      dateTime: '2024-04-08 09:15',
      customerName: 'Amit Kumar',
      customerMobile: '9988776655',
      customerAddress: 'Flat 101, Sai Apartments, Kormangala, Blr-560034',
      amountToCollect: '₹80.00',
      cashReceived: false,
      expanded: false,
    },
    {
      id: '5',
      orderId: 'ORD005',
      status: 'Pending',
      itemDetails: '1 * 10 Liter Water',
      dateTime: '2024-04-09 11:30',
      customerName: 'Priya Sharma',
      customerMobile: '7788990011',
      customerAddress: 'No 7, Lakeview Street, HSR Layout, Blr-560102',
      amountToCollect: '₹20.00',
      cashReceived: false,
      expanded: false,
    },
    // Add more sample orders here
  ]);

  const toggleOrderExpansion = id => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === id ? { ...order, expanded: !order.expanded } : order
      )
    );
  };

  const handleCallCustomer = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleCashReceived = (order) => {
    if (order.status === 'Cancelled') {
      Alert.alert('Order Cancelled');
      return;
    }
    Alert.alert(
      'Confirm Cash Received',
      'Please confirm that cash received',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => confirmCashReceived(order) },
      ],
      { cancelable: false }
    );
  };

  const confirmCashReceived = (order) => {
    setOrders(prevOrders =>
      prevOrders.map(o =>
        o.id === order.id ? { ...o, cashReceived: true, status: 'Delivered' } : o
      )
    );
  };

  const renderOrderDetails = order => {
    if (order.expanded) {
      return (
        <View>
          <Text style={styles.itemDetails}>{order.itemDetails}</Text>
          <Text style={styles.dateTime}>Date & Time: {order.dateTime}</Text>
          <Text style={styles.customerName}>Customer: {order.customerName}</Text>
          <TouchableOpacity onPress={() => handleCallCustomer(order.customerMobile)}>
            <Text style={styles.customerMobile}>Mobile: {order.customerMobile}</Text>
          </TouchableOpacity>
          <Text style={styles.customerAddress}>Address: {order.customerAddress}</Text>
          <Text style={styles.amountToCollect}>Amount to Collect: {order.amountToCollect}</Text>
          <TouchableOpacity
            style={[styles.cashReceivedButton, { backgroundColor: order.cashReceived || order.status === 'Cancelled' ? '#ccc' : 'red' }]}
            onPress={() => handleCashReceived(order)}
            disabled={order.cashReceived || order.status === 'Cancelled'}
          >
            <Text style={styles.cashReceivedButtonText}>{order.cashReceived ? 'Cash Received' : 'Pending'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.openMapButton}>
            <Text style={styles.openMapButtonText}>Open Map</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderOrderItem = ({ item }) => {
    const handleOrderPress = () => {
      toggleOrderExpansion(item.id);
    };

    return (
      <TouchableOpacity onPress={handleOrderPress} style={styles.orderItem}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
          <Text style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]}>{item.status}</Text>
        </View>
        {renderOrderDetails(item)}
      </TouchableOpacity>
    );
  };

  const getStatusColor = status => {
    switch (status) {
      case 'Pending':
        return '#ffcc00'; // Yellow
      case 'Delivered':
        return '#008000'; // Green
      case 'Cancelled':
        return '#ff0000'; // Red
      default:
        return '#808080'; // Gray
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.orderList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  orderList: {
    paddingBottom: 20,
    marginTop:25,
  },
  orderItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  orderId: {
    fontWeight: 'bold',
  },
  statusIndicator: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  itemDetails: {
    marginTop: 5,
  },
  dateTime: {
    marginTop: 5,
  },
  customerName: {
    marginTop: 5,
  },
  customerMobile: {
    marginTop: 5,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  customerAddress: {
    marginTop: 5,
  },
  amountToCollect: {
    marginTop: 5,
  },
  cashReceivedButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cashReceivedButtonText: {
    color: '#fff',
  },
  openMapButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#3aa8c1',
    borderRadius: 5,
    alignItems: 'center',
  },
  openMapButtonText: {
    color: '#fff',
  },
});

export default MyOrdersScreen;
