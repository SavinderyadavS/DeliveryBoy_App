import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firestore from '@react-native-firebase/firestore';

import { useDispatch, useSelector } from 'react-redux';
import { setUserID, setUserData } from './Store/Slice/userSlice';


const BasicDetailsPage = ({ navigation,route }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false); // State to track loading

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
      setLoading(true); // Set loading state to true when Continue button is clicked
      try {
        await firestore().collection('users').doc(uid).set({
          firstName,
          lastName,
          gender,
          mobileNumber:formattedPhoneNumber,
          type : "dealer",
          verified:"doc" // this should be done by  manual for verification 
        });

        navigation.navigate('UploadDocuments');
      } catch (error) {
        console.log("Failed to save:", error);
      } finally {
        setLoading(false); // Set loading state back to false after saving or if there's an error
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

        <TouchableOpacity onPress={handleContinue} disabled={isButtonDisabled || loading} style={[styles.button, { backgroundColor: (isButtonDisabled || loading) ? 'gray' : '#3aa8c1' }]}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
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
