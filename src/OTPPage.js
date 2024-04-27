import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import { useDispatch, useSelector } from 'react-redux';
import { setUserID, setUserData } from './Store/Slice/userSlice';

const OTPPage = ({ navigation, route }) => {
    const [seconds, setSeconds] = useState(20);
    const [timerActive, setTimerActive] = useState(true);
    const [otp, setOTP] = useState('');
    const [loading, setLoading] = useState(false);

    const { formattedPhoneNumber, confirmation  } = route.params;

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            if (seconds > 0 && timerActive) {
                setSeconds(seconds - 1);
            } else {
                setTimerActive(false);
            }
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [seconds, timerActive]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {
                dispatch(setUserData(documentSnapshot.data()));
            });

        return () => unsubscribe();
    }, [user.uid]);

    const handleResendOTP = async () => {
        try {
            const newConfirmation = await firebase.auth().signInWithPhoneNumber(formattedPhoneNumber);
            Alert.alert('OTP Resent', 'A new OTP has been sent to your mobile number.');
            setSeconds(20);
            setTimerActive(true);
        } catch (error) {
            console.error('Error resending OTP:', error);
        }
    };

    const handleVerifyOTP = async () => {
        setLoading(true); // Set loading state to true when Verify OTP button is clicked
        try {
            const userCredential = await confirmation.confirm(otp);
            const user = userCredential.user;
        
            const authToken = await user.getIdToken();
            await AsyncStorage.setItem('authToken', authToken);
            await AsyncStorage.setItem('userID', user.uid);

            const userDocumentSnapshot = await firestore().collection('users').doc(user.uid).get();
            dispatch(setUserID(user.uid));

            if (userDocumentSnapshot.exists) {
                const userDocument = userDocumentSnapshot.data();

                if (userDocument.type !== 'dealer') {
                    Alert.alert(
                        'Not a Dealer',
                        'You are not a dealer. Please login using the user application.',
                        [
                            {
                                text: 'OK',
                                onPress: () => navigation.navigate('LoginScreen'),
                            },
                        ]
                    );
                } else {
                    dispatch(setUserData(userDocument));

                    const verificationStatus = userDocument.verified;
                    switch (verificationStatus) {
                        case 'doc':
                            navigation.navigate('UploadDocuments');
                            break;
                        case 'bank':
                            navigation.navigate('BankDetails');
                            break;
                        case 'selfi':
                            navigation.navigate('TakeSelfie');
                            break;
                        case 'verification':
                            navigation.navigate('Hurray');
                            break;
                        case 'verified':
                            navigation.navigate('Main');
                            break;
                        default:
                            navigation.navigate('LoginScreen');
                    }
                }
            } else {
                console.log('User document does not exist');
                navigation.navigate('CreateProfile', { uid: user.uid ,formattedPhoneNumber});
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        } finally {
            setLoading(false); // Set loading state back to false after OTP verification is finished
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
                <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.verifyButtonText}>Verify OTP</Text>
                    )}
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
