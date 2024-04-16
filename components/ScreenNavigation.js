import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MyAddressPage from './MyAddressPage';
import AddressInputPage from './AddressInputPage';
import AddressList from './AddressList';

const Stack = createStackNavigator();

const ScreenNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MyAddressPage">
        <Stack.Screen name="MyAddressPage" component={MyAddressPage} />
        <Stack.Screen name="AddressInputPage" component={AddressInputPage} options={{headerShown:true}}/>
        <Stack.Screen name="AddressList" component={AddressList}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ScreenNavigation;