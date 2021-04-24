import React from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useEffect , useState } from 'react';

const AuthPage = () => {
	const [ initializing, setInitializing ] = useState(true);
	const [ user, setUser ] = useState();
	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}
	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	const createAccount = () => {
        console.log('reoses')
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

	if (initializing) return <ActivityIndicator />;

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{user ? user.email : 'Not signed in'}</Text>
			<Button title="Create Account" onPress={createAccount} />
		</View>
	);
};

export default AuthPage;
