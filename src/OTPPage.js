import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const OTPPage = ({ navigation, route }) => {
    const [seconds, setSeconds] = useState(20);
    const [timerActive, setTimerActive] = useState(true);
    const [otp, setOTP] = useState('');
    const { mobileNumber } = route.params; // Destructure mobileNumber from route params

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

    const handleResendOTP = () => {
        // Reset timer and enable it
        setSeconds(20);
        setTimerActive(true);
    };

    const handleVerifyOTP = () => {
        // Here you can verify the OTP
        // For simplicity, let's assume the OTP is correct
        // You can add your logic for OTP verification here
        // After successful verification, navigate to the next screen
        navigation.navigate('CreateProfile'); // Example navigation to Home screen
    };

    return (
        <ImageBackground source={require('../assets/giphy.gif')} style={styles.background}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.label}>Enter the OTP sent to</Text>
                    <Text style={styles.mobileNumber}>{mobileNumber}</Text>
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
