import React from 'react';
import { ActivityIndicator, Linking, Modal, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Layout, Text, Button, Input, Card, RadioGroup, Radio } from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';

const AuthPage = (props) => {
	const [ initializing, setInitializing ] = useState(true);
	const [ user, setUser ] = useState();
	const [ email, setEmail ] = useState('');
	const [ name, setName ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ selectedIndex, setSelectedIndex ] = useState(0);

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	const logOut = () => {
		auth().signOut();
	};

	const createAccount = () => {
		console.log('reoses');
		auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				console.log('User account created & signed in!');
			})
			.then(() => {
				selectedIndex === 1 && setToken();
				firestore()
					.collection(selectedIndex === 1 ? 'doctors' : 'patients')
					.add({
						name: name,
						email: email
					})
					.then(() => {
						console.log('User added!');
						selectedIndex === 0 && props.navigation.navigate('Doctor Screen');
					});
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
	const navigateToLogin = () => {
		props.navigation.navigate('Login');
	};

	if (initializing) return <ActivityIndicator />;

	return (
		<Layout level="2" style={{ flex: 1, alignItems: 'center', paddingHorizontal: 50 }}>
			<Text category="h3" style={{ padding: 20 }}>
				Sign Up
			</Text>
			<Input
				placeholder="Name"
				value={name}
				onChangeText={(nextValue) => setName(nextValue)}
				style={{ padding: 10 }}
			/>
			<Input
				placeholder="Email Id"
				value={email}
				onChangeText={(nextValue) => setEmail(nextValue)}
				style={{ padding: 10 }}
			/>
			<Input
				placeholder="Passoword"
				value={password}
				onChangeText={(nextValue) => setPassword(nextValue)}
				style={{ padding: 10 }}
				secureTextEntry={true}
			/>
			<Layout
				level="2"
				style={{
					margin: 50,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-around',
					width: '50%'
				}}
			>
				<Text>I'm a ...</Text>
				<RadioGroup selectedIndex={selectedIndex} onChange={(index) => setSelectedIndex(index)}>
					<Radio>Patient</Radio>
					<Radio>Doctor</Radio>
				</RadioGroup>
			</Layout>
			<Button onPress={createAccount}>Create Account</Button>
			<Button onPress={logOut}>Log out</Button>
			<Button style={{ marginTop: 10 }} onPress={navigateToLogin}>
				Log In
			</Button>
		</Layout>
	);
};

export default AuthPage;
