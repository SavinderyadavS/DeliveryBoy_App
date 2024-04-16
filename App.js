import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/LoginScreen';
import OTPPage from './src/OTPPage'; // Assuming you have an OTPPage component
import CreateProfile from './src/CreateProfile';
import BasicDetailsPage from './src/BasicDetailsPage';
import UploadDocuments from './src/UploadDocuments';
import BankDetails from './src/BankDetails';
import TakeSelfie from './src/TakeSelfie';
import Hurray from './src/Hurray';
import UnderVerification from './src/UnderVerification';
import SplashScreen from './src/SplashScreen';
import BottomTabNavigator from './src/BottomTabNavigator';
import Main from './src/Main';

const Stack = createStackNavigator();



const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown:false}} />
                <Stack.Screen
                    name="LoginScreen" 
                    component={LoginScreen} 
                    options={{
                        title: 'Login',
                        headerShown: false, // Hide the header for the login screen if desired
                    }}
                />
                <Stack.Screen
                    name="OTPPage"
                    component={OTPPage}
                    options={{
                        title: 'OTP Verification',
                    }}
                />
                <Stack.Screen 
                  name="CreateProfile"
                  component={CreateProfile}
                  options={{
                    title:'Create Profile',
                    headerShown:false,
                  }}
                  />
                <Stack.Screen 
                  name="BasicDetailsPage"
                  component={BasicDetailsPage}
                  options={{
                    title:'Create Profile',
                    headerShown:false,
                  }}
                  /> 
                  <Stack.Screen
                  name="UploadDocuments"
                  component={UploadDocuments}
                  options={{
                    title:'Upload Documents',
                    headerShown:false,
                  }}
                  />
                  <Stack.Screen
                  name="BankDetails"
                  component={BankDetails}
                  options={{
                    title:'Bank Details',
                    headerShown:false,
                  }}
                  />
                  <Stack.Screen
                  name="TakeSelfie"
                  component={TakeSelfie}
                  options={{
                    title:'Take Selfie',
                    headerShown:true,
                  }}
                  />
                  <Stack.Screen
                  name="Hurray"
                  component={Hurray}
                  options={{
                    title:'Hurray',
                    headerShown:false,
                  }}
                  />
                  <Stack.Screen
                  name="UnderVerification"
                  component={UnderVerification}
                  options={{
                    title:'UnderVerification',
                    headerShown:false,
                  }}
                  />
                  <Stack.Screen
                  name="Main"
                  component={Main}
                  options={{
                    title:'Main',
                    headerShown:false,
                  }}
                  />
                  
                  
                  
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
