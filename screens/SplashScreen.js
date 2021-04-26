import React from 'react'
import { useEffect,useState } from 'react'
import { ImageBackground, StyleSheet,  View } from 'react-native'
import { Text} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({navigation}) => {

    const [ currEmail, setCurrentEmail ] = useState('');
    auth().onAuthStateChanged((user) => {
		if (user) {
			if (user.isAnonymous) {
				setCurrentEmail('Anonymous');
				
			} else setCurrentEmail(user.email);
		}
	});

    useEffect(
        () => {
          setTimeout(()=>{
              if (currEmail){
                navigation.replace('Doctor Screen');
              }
              navigation.replace('Login');
          },4000)
          },[]);
        
    return (
        <ImageBackground source={{uri:"https://wallpaperaccess.com/full/1964825.jpg"}} style={{height:"100%",width:"100%"}}>
            <View style={{alignItems:"center",justifyContent:"center"}}>
<Text category="h1" style={{position:"absolute",top:500}}>Welcome to SKADOOD!</Text></View>
        </ImageBackground>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})
