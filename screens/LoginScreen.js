import React from 'react';
import { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }, props) => {
	const [ user, setUser ] = useState();
	const [ secureTextEntry, setSecureTextEntry ] = useState(true);

	const toggleSecureEntry = () => {
		setSecureTextEntry(!secureTextEntry);
	};

	// Handle user state changes
	function onAuthStateChanged(user) {
		setUser(user);
	}

	useEffect(
		() => {
			const unsubscribe = auth().onAuthStateChanged((authUser) => {
				onAuthStateChanged(authUser);
				console.log(authUser);
				if (authUser) {
					navigation.replace('Doctor Screen');
				}
			});
			return unsubscribe;
		},
		[ user ]
	);
	// useEffect(
	// 	() => {
	// 		const unsubscribe = onAuthStateChanged((authUser) => {
	// 			console.log(authUser);

	// 			if (authUser) {
	// 				navigation.replace('Doctor');
	// 			}
	// 		});
	// 		return unsubscribe;
	// 	},
	// 	[ user ]
	// );

	const signIn = () => {
		auth()
			.signInWithEmailAndPassword(email, password)
			.then((res) => {
				setUser(res.user);
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

	const renderAccessoryIcon = () => {
		return (
			<TouchableOpacity onPress={toggleSecureEntry}>
				<Icon size={15} color="gray" name={secureTextEntry ? 'eye-slash' : 'eye'} />
			</TouchableOpacity>
		);
	};

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	return (
		<Layout style={styles.container} level="1">
			<View style={styles.space} />
			<Input
				style={styles.input}
				value={email}
				autoFocus
				placeholder="Email"
				onChangeText={(value) => setEmail(value)}
			/>
			<Input
				style={styles.input}
				value={password}
				placeholder="Password"
				secureTextEntry={secureTextEntry}
				type="password"
				onChangeText={(value) => setPassword(value)}
				accessoryRight={renderAccessoryIcon}
			/>
			<Button onPress={signIn} style={styles.button} status="primary">
				Login
			</Button>
			<TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
				<Text style={styles.navButtonText}>Forgot Password?</Text>
			</TouchableOpacity>
			<Text style={styles.signupHeader}>New To MedMeet! Signup Now</Text>

			<Button
				onPress={() => navigation.navigate('Sign Up')}
				containerStyle={styles.button}
				style={styles.button}
				status="danger"
			>
				Sign Up
			</Button>
			<Button onPress={() => navigation.navigate('Doctor Screen')}>Skip</Button>
		</Layout>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	// space:{
	//     height:0,
	// },
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		//flex: 1,
		margin: 10
	},
	button: {
		marginTop: 10,
		width: 390
	},
	forgotButton: {
		marginTop: 15,
		marginRight: 15,
		alignSelf: 'flex-end',
		marginBottom: 35
	},
	navButtonText: {
		fontSize: 15,
		fontWeight: '500',
		color: '#2e64e5',
		fontFamily: 'Lato-Regular'
	},
	signupHeader: {
		fontSize: 18,
		fontWeight: '900',
		opacity: 0.75,
		margin: 15,
		fontFamily: 'Lato-Regular'
	}
});
