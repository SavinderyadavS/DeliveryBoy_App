import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddressInputPage = () => {
  const navigation = useNavigation();

  const [houseFlatNo, setHouseFlatNo] = useState('');
  const [floor, setFloor] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [Area, setArea] = useState('');

  const saveAddress = () => {
    // Save the address data
    const newAddress = { houseFlatNo, floor, street, landmark, Area };
    // Navigate back to the MyAddressPage and pass the new address data
    navigation.goBack({ newAddress });
  };

  return (
    <View>
      <TextInput
        placeholder="House/Flat No."
        value={houseFlatNo}
        onChangeText={setHouseFlatNo}
      />
      <TextInput
        placeholder="Floor"
        value={floor}
        onChangeText={setFloor}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Street"
        value={street}
        onChangeText={setStreet}
      />
      <TextInput
        placeholder="Landmark Eg: Pooja Bakery"
        value={landmark}
        onChangeText={setLandmark}
      />
      <TextInput
        placeholder="Area Eg: RT Nagar"
        value={Area}
        onChangeText={setArea}
      />
      <Button title="Save Address" onPress={saveAddress} />
    </View>
  );
};

export default AddressInputPage;
