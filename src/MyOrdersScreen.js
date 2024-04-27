


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Linking, Alert } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import { setUserID, setUserData, setOrder } from './Store/Slice/userSlice';

const MyOrdersScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);



  const [orders, setOrders] = useState([]);


  useEffect(() => {
    const unsubscribe = firestore().collection('orders').onSnapshot(snapshot => {
      const updatedOrders = snapshot.docs.map(order => {
        const orderData = order.data(); // Access data property of each order
        let orderId = `ORD${order.id.padStart(3, '0')}`;
        if (orderId.length > 6) {
          orderId = orderId.slice(0, 6); // Trim to maximum length of 6 characters
        }
        return {
          id: order.id,
          orderId,
          status: orderData.status,
          itemDetails: orderData.product.length > 0 ? `${orderData.product[0].quantity} * ${orderData.product[0].name}` : 'No items',
          dateTime: orderData.orderDate.toDate().toLocaleString(),
          customerName: orderData.CustomerName,
          customerMobile: orderData.customerMobile,
          // customerAddress: 'No 7, Lakeview Street, HSR Layout, Blr-560102',
          customerAddress: `${orderData.customerAddress.houseFlatNo}, ${orderData.customerAddress.floor}, ${orderData.customerAddress.street}, ${orderData.customerAddress.landmark}, ${orderData.customerAddress.Area}, ${orderData.customerAddress.PinCode}`,
          amountToCollect: orderData.totalPrice.toFixed(2),
          expanded: false,
        };
      });
      setOrders(updatedOrders);
      dispatch(setOrder(updatedOrders));
      console.log('Retrieved and formatted orders: ', updatedOrders);
    });

    return () => {
      unsubscribe(); // Cleanup function to unsubscribe when component unmounts
    };
  }, []);



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


  const handleStatusChange = async (order, newStatus) => {
    try {
      if (newStatus === 'Cancelled') {
        console.log('Cancelling order...');
        Alert.alert('Confirm Order Cancellation', 'Are you sure you want to cancel this order?', [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'OK', onPress: async () => {
              try {
                await firestore().collection('orders').doc(order.id).update({ status: 'Cancelled' });
                confirmStatusChange(order, 'Cancelled');
                console.log('Order cancelled successfully in Firebase.');
              } catch (error) {
                console.error('Error cancelling order: ', error);
                Alert.alert('Error', 'Failed to cancel order. Please try again later.');
              }
            }
          },
        ]);
      } else {
        await firestore().collection('orders').doc(order.id).update({ status: newStatus });
        confirmStatusChange(order, newStatus);
      }
    } catch (error) {
      console.error('Error updating order status: ', error);
      Alert.alert('Error', 'Failed to update order status. Please try again later.');
    }
  };


  const handleOpenMap = () => {
    // Replace coordinates with your desired location
    const latitude = 13.029799;
    const longitude = 77.604704;
    const url = `http://maps.apple.com/maps?daddr=${latitude},${longitude}`;
    Linking.openURL(url);
  };


  const confirmOrderCancellation = (order) => {
    setOrders(prevOrders =>
      prevOrders.map(o =>
        o.id === order.id ? { ...o, status: 'Cancelled' } : o
      )
    );
  };

  const confirmStatusChange = (order, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(o =>
        o.id === order.id ? { ...o, status: newStatus } : o
      )
    );
  };

  const renderButtons = (order) => {
    if (order.status === 'Pending') {
      return (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.statusButton, { backgroundColor: 'green' }]}
            onPress={() => handleStatusChange(order, 'Accepted')}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusButton, { backgroundColor: 'red' }]}
            onPress={() => handleStatusChange(order, 'Cancelled')}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (order.status === 'Accepted') {
      return (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.statusButton, { backgroundColor: 'green' }]}
            onPress={() => handleStatusChange(order, 'Delivered')}
          >
            <Text style={styles.buttonText}>confirm Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusButton, { backgroundColor: 'red' }]}
            onPress={() => handleStatusChange(order, 'Cancelled')}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    }
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
          {renderButtons(order)}
          <TouchableOpacity style={styles.openMapButton} onPress={handleOpenMap}>
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
    marginTop: 25,
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
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  statusButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
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

