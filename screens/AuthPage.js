import React from 'react';
import { View, Text, ActivityIndicator, Button, Linking } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const AuthPage = () => {
	const [ initializing, setInitializing ] = useState(true);
	const [ user, setUser ] = useState();

	const signOut = () => {
		auth().signOut().then(() => console.log('User signed out!'));
	};

	const setToken = () => {
		fetch('https://ancient-wave-59600.herokuapp.com/create-user', {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer'
		})
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				Linking.openURL(result.url);
			});
	};

	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		GoogleSignin.configure({
			webClientId: '877741552696-53pmnos32bom3p01rscbf1gaijejqo4a.apps.googleusercontent.com'
		});
		return subscriber;
	}, []);

	const createAccount = () => {
		console.log('reoses');
		auth()
			.createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
			.then(() => {
				console.log('User account created & signed in!');
			})
			.catch((error) => {
				if (error.code === 'auth/email-already-in-use') {
					console.log('That email address is already in use!');
				}

				if (error.code === 'auth/invalid-email') {
					console.log('That email address is invalid!');
				}

				console.error(error);
			});
	};

	const onGoogleButtonPress = async () => {
		const {idToken} = await GoogleSignin.signIn().catch((err) => console.log(err));

		const googleCredential = auth.GoogleAuthProvider.credential(idToken);

		return auth().signInWithCredential(googleCredential);
	};

	if (initializing) return <ActivityIndicator />;

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>{user ? user.email : 'Not signed in'}</Text>
			<Button title="Create Account" onPress={createAccount} />
			<Button title="Sign Out" onPress={signOut} />
			<Button title="Test backend" onPress={setToken} />
			<Button
				title="Google Sign-In"
				onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
			/>
		</View>
	);
};

export default AuthPage;
