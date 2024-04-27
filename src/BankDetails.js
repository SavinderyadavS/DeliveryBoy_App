import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker'; 
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage';
import { useDispatch, useSelector } from 'react-redux';


const BankDetails = () => {
  const navigation = useNavigation();
  const [accountNumber, setAccountNumber] = useState('');
  const [reEnteredAccountNumber, setReEnteredAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [passbookImage, setPassbookImage] = useState(null);
  const [selectedBank, setSelectedBank] = useState('');

  const user = useSelector(state => state.user);


  const uploadImage = async (filename,fileUri ) => {

    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const url = await uploadImg(filename ,blob);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }


async function uploadImg(filename , file) {
  const path = `users/${filename}`;

  try {
    const reference = storage().ref(path);
        await reference.put(file);

        const url = await reference.getDownloadURL().catch((error) => { throw error; });
        return url;
  }
  catch (error) {
    throw error;
  }
}



  const handleSave = async () => {
    if (accountNumber && reEnteredAccountNumber && selectedBank && ifscCode) {
      if (accountNumber === reEnteredAccountNumber) {
        const passBookImage = await uploadImage(`passbook`, passbookImage);


        const bankDetails = {
          accountNumber,
          bankName : selectedBank ,
          ifscCode ,
          PassBookImage:  passBookImage 
        }

        await firestore().collection('users').doc(user.uid).update({
          bankDetails 
      }); 

  

        console.log('Bank details saved successfully');
        navigation.navigate('TakeSelfie');
      } else {
        Alert.alert('Error', 'Account numbers do not match');
      }
    } else {
      Alert.alert('Error', 'Please fill in all the details');
    }
  };


  const handlePassbookUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancell) {
      const uri = result.assets[0].uri;
      setPassbookImage(uri);
    }
  };


  
  return (
    <LinearGradient
      colors={['white', 'white']}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Provide your bank details</Text>
          <Text style={styles.subtitle}>Your earnings and salary will be transferred to this bank account</Text>

          <Text style={styles.inputLabel}>Account Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Account Number"
            value={accountNumber}
            onChangeText={text => setAccountNumber(text)}
            keyboardType="numeric"
          />

          <Text style={styles.inputLabel}>Re-enter Account Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Re-enter Account Number"
            value={reEnteredAccountNumber}
            onChangeText={text => setReEnteredAccountNumber(text)}
            keyboardType="numeric"
          />
          <Text style={styles.inputLabel}>Select Bank</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedBank}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setSelectedBank(itemValue)}
            >
              <Picker.Item label="Select Bank" value="" />
              <Picker.Item label="STATE BANK OF INDIA" value="STATE BANK OF INDIA" />
              <Picker.Item label="CANARA/SYNDICATE BANK" value="CANARA/SYNDICATE BANK" />
              <Picker.Item label="PUNJAB NATIONAL BANK" value="PUNJAB NATIONAL BANK" />
              <Picker.Item label="BANK OF BARODA" value="BANK OF BARODA" />
              <Picker.Item label="UNION BANK OF INDIA" value="UNION BANK OF INDIA" />
              <Picker.Item label="OTHER" value="OTHER" />
            </Picker>
          </View>

          <Text style={styles.inputLabel}>IFSC Code</Text>
          <TextInput
            style={styles.input}
            placeholder="IFSC Code"
            value={ifscCode}
            onChangeText={text => setIfscCode(text)}
          />

          <TouchableOpacity onPress={handlePassbookUpload} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload Passbook Photo</Text>
          </TouchableOpacity>

          {passbookImage && (
            <View style={styles.passbookImageContainer}>
              <Text style={styles.passbookImageText}>Uploaded Passbook Photo:</Text>
              <Image source={{ uri: passbookImage }} style={styles.passbookImage} />
            </View>
          )}

          <Text style={styles.note}>*Please check the details entered before Continuing</Text>

          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    justifyContent: 'flex-start', // Align items at the top
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // Add padding top for title and subtitle
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  input: {
    width: 350,
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'left', // Align text to the left
    alignSelf: 'flex-start', // Align self to the start of the container
    width: '100%', // Set width to full width of the container
  },
  uploadButton: {
    backgroundColor: '#3aa8c1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  passbookImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  passbookImageText: {
    fontSize: 14,
    marginBottom: 5,
  },
  passbookImage: {
    width: 200,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  note: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#3aa8c1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    width: 350,
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    height: '100%',
  },
});

export default BankDetails;
