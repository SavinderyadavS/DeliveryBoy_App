import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [mobileNumber, setMobileNumber] = useState('');

    const handleLogin = () => {
        // Here you can add further validation for the mobile number if needed
        // For simplicity, let's assume the number is valid
        // Then navigate to the OTP page and pass mobileNumber as a parameter
        navigation.navigate('OTPPage', { mobileNumber });
    };

    return (
        <ImageBackground source={require('../assets/jjk.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.countryCode}>+91</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Enter Mobile Number"
                        keyboardType="phone-pad"
                        value={mobileNumber}
                        onChangeText={(text) => {
                            // Validate and set mobile number
                            const formattedNumber = text.replace(/[^0-9]/g, '').substring(0, 10); // Remove non-numeric characters and limit to 10 digits
                            setMobileNumber(formattedNumber);
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Get OTP</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover" // Make the image cover the entire background area
        //width:350,
        //height:600,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    countryCode: {
        fontSize: 19,
        marginRight: 10,
        fontWeight: 'bold', // Example: Making the text bold
        color: 'black' // Example: Changing the text color to white
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        borderRadius: 10,
        paddingHorizontal: 15,
        color: 'black', // Text color
        fontSize: 18 // Text size
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#3aa8c1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 18
    }
});

export default LoginScreen;
