import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import firestore from "@react-native-firebase/firestore";

const Hurray = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const backAction = () => {
      return true; // Return true to prevent default behavior (i.e., going back)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          setVerified(userData.verified === 'verified');
        }
      });

    return () => unsubscribe();
  }, [user.uid]);

  useEffect(() => {
    if (verified) {
      navigation.navigate('Main');
    }
  }, [verified, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Thanks for your Patience</Text>
        <Text style={styles.overlayText}>Please wait...</Text>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Hurray;
