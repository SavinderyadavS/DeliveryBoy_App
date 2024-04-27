import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import firestore from '@react-native-firebase/firestore'; 


import { useDispatch, useSelector } from 'react-redux';
import { setUserID, setUserData } from './Store/Slice/userSlice';


const OTPPage = ({ navigation, route }) => {
    const [seconds, setSeconds] = useState(20);
    const [timerActive, setTimerActive] = useState(true);
    const [otp, setOTP] = useState('');
    // const { mobileNumber } = route.params; // Destructure mobileNumber from route params

    const { formattedPhoneNumber , confirmation } = route.params; // Destructure mobileNumber from route params

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    // console.log("page")
    // Effect to decrement the timer every second
    useEffect(() => {
        const timerInterval = setInterval(() => {
            if (seconds > 0 && timerActive) {
                setSeconds(seconds - 1);
            } else {
                setTimerActive(false);
            }
        }, 1000);

        // Cleanup function to clear the interval
        return () => clearInterval(timerInterval);
    }, [seconds, timerActive]);


    useEffect(() => {
        const unsubscribe = firestore()
          .collection('users')
          .doc(user.uid)
          .onSnapshot(documentSnapshot => {
            dispatch(setUserData(documentSnapshot.data()));
          });
    
        // Clean up subscription when component unmounts or user changes
        return () => unsubscribe();
      }, [user.uid]); 

    


    const handleResendOTP = () => {
        // Reset timer and enable it
        setSeconds(20);
        setTimerActive(true);
    };

    const handleVerifyOTP = async () => {
        try {
            const userCredential = await confirmation.confirm(otp);
            const user = userCredential.user;
    
            const authToken = await user.getIdToken(); // Assuming Firebase user object has getIdToken method

            await AsyncStorage.setItem('authToken', authToken);
            await AsyncStorage.setItem('userID', user.uid);
            
    
            const userDocument = await firestore()
                .collection('users')
                .doc(user.uid)
                .get();
    
            dispatch(setUserID(user.uid));
    
            if (userDocument.exists) {
                const userType = userDocument.data().type;
    
                if (userType === 'dealer') {
                    // console.log("User type:", userType);
                    dispatch(setUserData(userDocument.data()));
                    navigation.navigate('Main');
                   
                } else {
                    // If user type is not dealer, show alert
                    console.log("User is not a dealer, redirecting to customer app");
                    alert('Please use the customer app for orders.');
                    navigation.navigate('LoginScreen');
                }
            } else {
                // If user document does not exist, navigate to CreateProfile
                console.log("User does not exist");
                navigation.navigate('CreateProfile', { uid: user.uid ,formattedPhoneNumber});
            }
        } catch (error) {
            console.error("Error occurred during user verification:", error);
        }
    };


    return (
        <ImageBackground source={require('../assets/giphy.gif')} style={styles.background}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.label}>Enter the OTP sent to</Text>
                    <Text style={styles.mobileNumber}>{formattedPhoneNumber}</Text>
                </View>
                {timerActive && seconds > 0 && (
                    <Text style={styles.timer}>Resend OTP in {seconds} seconds</Text>
                )}
                <TextInput
                    style={styles.input}
                    placeholder="Enter OTP"
                    keyboardType="numeric"
                    value={otp}
                    onChangeText={setOTP}
                />
                <TouchableOpacity
                    style={[styles.resendButton, !timerActive && styles.resendButtonEnabled]}
                    onPress={handleResendOTP}
                    disabled={timerActive}
                >
                    <Text style={styles.resendButtonText}>Resend OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
                    <Text style={styles.verifyButtonText}>Verify OTP</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    mobileNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    timer: {
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 50,
        backgroundColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    resendButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    resendButtonEnabled: {
        backgroundColor: 'skyblue',
    },
    resendButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    verifyButton: {
        backgroundColor: 'skyblue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    verifyButtonText: {
        fontSize: 18,
        color: '#fff',
    },
});

export default OTPPage;
