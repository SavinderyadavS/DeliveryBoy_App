import React,{useEffect} from 'react';
import {Image,Text,View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LoginScreen from './LoginScreen';


const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const navigateToLoginScreen = () => {
      navigation.navigate('LoginScreen');
    };

    setTimeout(navigateToLoginScreen, 3000); 
  }, [navigation]);
return( 
<View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:'#3aa8c1'}}> 

<Image source={require('../assets/spla.gif')} style={{width:400,height:790, borderRadius:25}} />
</View>
); 
};

export default SplashScreen;