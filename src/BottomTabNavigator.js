import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyAccountScreen from './MyAccountScreen';
import MyEarningsScreen from './MyEarningsScreen';
import MyOrdersScreen from './MyOrdersScreen';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Bottom = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Bottom.Navigator initialRouteName="My Orders">
      <Bottom.Screen
        name="My Earnings"
        component={MyEarningsScreen}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="currency-rupee"
              size={30}
              color={focused ? 'skyblue' : 'black'}
            />
          ),
        })}
      />
      <Bottom.Screen
        name="My Orders"
        component={MyOrdersScreen}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name="delivery-dining"
              size={35}
              color={focused ? 'skyblue' : 'black'}
            />
          ),
        })}
      />
      <Bottom.Screen
        name="My Account"
        component={MyAccountScreen}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="account"
              size={30}
              color={focused ? 'skyblue' : 'black'}
            />
          ),
        })}
      />
    </Bottom.Navigator>
  );
};

export default BottomTabNavigator;
