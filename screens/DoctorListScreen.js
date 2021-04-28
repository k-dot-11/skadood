import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Button, Avatar, Text, Layout } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeContext } from '../context/ThemeContext';

const DoctorListScreen = ({ navigation }) => {
	const [ currEmail, setCurrentEmail ] = useState('');
	const [ loading, setLoading ] = useState(true);
	const [ doctors, setDoctors ] = useState([]);
	const [ toggle, setToggle ] = useState(false);
	const [ toggle2, setToggle2 ] = useState(false);

	const themeContext = React.useContext(ThemeContext);

	const toggleFilter = () => {
		setToggle(!toggle);
		console.log(toggle);
	};
	const toggleFilter1 = () => {
		setToggle2(!toggle2);
		console.log(toggle2);
	};

	useEffect(() => {
		const subscriber = firestore().collection('doctors').onSnapshot((querySnapshot) => {
			const loadingDoctors = [];

			querySnapshot.forEach((documentSnapshot) => {
				loadingDoctors.push({
					...documentSnapshot.data(),
					key: documentSnapshot.id
				});
			});

			setDoctors(loadingDoctors);
			setLoading(false);
		});

		return () => subscriber();
	}, []);

	const renderItems = ({ item }) => (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('Slot Screen', {
					name: item.name,
					email: item.email
				});
			}}
		>
			<Layout level="2" style={styles.card}>
				<Avatar
					style={styles.avatar}
					size="giant"
					source={{ uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png' }}
				/>

				<Layout level="2" style={{ margin: 10, flex: 4 }}>
					<Text category="h6">{item.name}</Text>
					<Text category="h6" appearance="hint">
						{item.email}
					</Text>
				</Layout>
				<Layout level="2" style={{ marginTop: 20, flex: 1 }}>
					<Icon name="arrow-right" size={36} color="#000" />
				</Layout>
			</Layout>
		</TouchableOpacity>
	);

	auth().onAuthStateChanged((user) => {
		if (user) {
			if (user.isAnonymous) {
				setCurrentEmail('Anonymous');
			} else setCurrentEmail(user.email);
		}
	});

	const logout = () => {
		auth().signOut().then(() => {
			console.log('Signed Out !');
			navigation.replace('Splash');
		});
	};

	return (
		<Layout
			style={{
				// backgroundColor: '#d4e9fd',
				flex: 1
			}}
		>
			<Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
				<Layout style={{ display: 'flex', alignItems: 'center' }}>
					<Text category="h4" style={{ alignSelf: 'flex-start', marginTop: 5 }}>
						{' '}
						Doctors Available
					</Text>
					<Text appearance="hint" style={{ alignSelf: 'flex-start', marginTop: 5 }}>
						16 Available today
					</Text>
				</Layout>
				<Layout style={{ marginTop: 15 }}>
					<Button onPress={logout}>Log out</Button>
				</Layout>
				<Button onPress={themeContext.toggleTheme}>
					{themeContext.theme === 'dark' ? (
						<Icon name="brightness-7" size={20} />
					) : (
						<Icon name="brightness-3" size={20} />
					)}
				</Button>
			</Layout>
			<Layout style={{ display: 'flex', marginTop: 30, marginHorizontal: 30, flexDirection: 'row' }}>
				<TouchableOpacity
					onPress={toggleFilter1}
					style={{
						padding: 20,
						marginBottom: 20,
						marginRight: 20,
						backgroundColor: toggle2 ? '#2e0854' : '#fff',
						opacity: 0.8,

						borderRadius: 30
					}}
				>
					<Text style={{ color: !toggle2 ? '#2e0854' : '#fff' }}>Currently Available</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={toggleFilter}>
					<Layout
						style={{
							padding: 20,
							marginBottom: 20,
							backgroundColor: toggle ? '#2e0854' : '#fff',
							opacity: 0.8,

							borderRadius: 30
						}}
					>
						<Text
							style={{
								color: !toggle ? '#2e0854' : '#fff'
							}}
						>
							All Doctors
						</Text>
					</Layout>
				</TouchableOpacity>
			</Layout>

			<FlatList
				data={doctors}
				renderItem={renderItems}
				contentContainerStyle={{
					padding: 20,
					marginBottom: 20
				}}
			/>
		</Layout>
	);
};

export default DoctorListScreen;

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		padding: 20,
		marginBottom: 20,
		borderRadius: 20
	},
	doctorDetails: {
		flexDirection: 'row',
		//height:120,

		// borderColor:"black",
		// borderWidth:1,
		borderRadius: 5,
		margin: 15,
		marginRight: 50
		//  justifyContent: 'center',
		//  alignItems: 'center',
	},
	avatar: {
		margin: 8,
		flex: 1
	},
	avatarview: {
		margin: 8,
		backgroundColor: '#fff'
	},
	doctorview: {
		width: '75%',
		margin: 5
	}
});
