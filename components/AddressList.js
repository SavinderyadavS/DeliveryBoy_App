import React from 'react';
import { View, Text, FlatList } from 'react-native';

const AddressList = ({ addresses }) => {
  const renderAddress = ({ item }) => (
    <View>
      <Text>{item.doorNumber}</Text>
      <Text>{item.areaName}</Text>
    </View>
  );

  return (
    <FlatList
      data={addresses}
      renderItem={renderAddress}
      keyExtractor={(item) => item.doorNumber}
    />
  );
};

export default AddressList;