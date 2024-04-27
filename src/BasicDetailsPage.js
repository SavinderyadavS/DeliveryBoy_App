import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firestore from '@react-native-firebase/firestore';

import { useDispatch, useSelector } from 'react-redux';
import { setUserID, setUserData } from './Store/Slice/userSlice';


const BasicDetailsPage = ({ navigation,route }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);


    const { formattedPhoneNumber} = route.params; 


  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const {uid} = user;


  useEffect(() => {
    // Enable or disable button based on field values
    if (firstName && lastName && gender) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [firstName, lastName, gender]);

  const handleContinue = async () => {
    // Check if all fields are filled
    if (firstName && lastName && gender) {
      // Navigate to the next screen
console.log("creating")
      try {
        await firestore().collection('users').doc(uid).set({
          firstName,
          lastName,
          gender,
          mobileNumber:formattedPhoneNumber,
          type : "dealer",
          verified:true // this should be done by  manual for verification 
        });

        navigation.navigate('UploadDocuments');
        // navigation.navigate('Main'); // Move to main screen
    } catch (error) {
        console.log("Failed to save:", error);
    }

      
    } else {
      // Display an alert if any field is empty
      alert('Please fill in all fields.');
    }
  };

  return (
    <LinearGradient colors={['skyblue', '#FFFFFF']} style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.heading}>Create your profile</Text>
        <Text style={styles.subtitle}>Enter some basic details</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="First name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Last name"
            value={lastName}
            onChangeText={text => setLastName(text)}
            style={styles.input}
          />
        </View>

        <Text style={styles.genderText}>Select your Gender</Text>

        <View style={styles.genderContainer}>
          <TouchableOpacity onPress={() => setGender('Male')} style={[styles.genderButton, { backgroundColor: gender === 'Male' ? 'skyblue' : '#ccc' }]}>
            <Text>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('Female')} style={[styles.genderButton, { backgroundColor: gender === 'Female' ? 'skyblue' : '#ccc' }]}>
            <Text>Female</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleContinue} disabled={isButtonDisabled} style={[styles.button, { backgroundColor: isButtonDisabled ? 'gray' : '#3aa8c1' }]}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mainContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    width: 300,
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor:'#fff'
  },
  genderText: {
    fontSize: 18,
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  genderButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default BasicDetailsPage;
