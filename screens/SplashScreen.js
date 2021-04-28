import React from 'react';
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({ navigation }) => {
	const [ currEmail, setCurrentEmail ] = useState('');
	const [ loading, setLoading ] = useState(true);

	auth().onAuthStateChanged((user) => {
		if (user) {
			if (user.isAnonymous) {
				setCurrentEmail('Anonymous');
			} else setCurrentEmail(user.email);
		} else {
			setLoading(false);
		}
	});

	const navigateToSignUp = () => {
		navigation.replace('Sign Up')
	}

	useEffect(
		() => {
			setTimeout(() => {
				if (currEmail) {
					navigation.replace('Doctor Screen');
				}
			}, 2000);
		},
		[ currEmail ]
	);

	return (
		<ImageBackground
			source={{ uri: 'https://wallpaperaccess.com/full/1964825.jpg' }}
			style={{ height: '100%', width: '100%' }}
		>
			<View style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flex: 1 }}>
				<Text category="h1" style={{ marginTop: 150 , color:'black'}}>
					Welcome to SKADOOD!
				</Text>

				{loading ? <Text >Loading</Text> : <Button style={{ marginTop: 50 }} onPress={navigateToSignUp}>Get Started</Button>}
			</View>
		</ImageBackground>
	);
};

export default SplashScreen;

