import React from 'react';
import { View, Text, Button } from 'react-native';
import AddressList from './AddressList';
import AddresInputsPage from './AddressInputPage';

const MyAddressPage = ({ navigation }) => {
  const [addresses, setAddresses] = React.useState([]);

  const addNewAddress = () => {
    // Navigate to the address input page
    navigation.navigate('AddressInputPage'); // Assuming 'AddressInputPage' is the correct route name
  };

  return (
    <View>
      {addresses.length === 0 ? (
        <View>
          <Text>No Address Saved</Text>
          <Button title="Add New Address" onPress={addNewAddress} />
        </View>
      ) : (
        <AddressList addresses={addresses} />
      )}
    </View>
  );
};

export default MyAddressPage;
