import React from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Avatar, Card, Text, Layout } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

const DoctorListScreen = ({ navigation }) => {
	const [ currEmail, setCurrentEmail ] = useState('');
	const [ loading, setLoading ] = useState(true);
	const [ doctors, setDoctors ] = useState([]);

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
		<Card
			onPress={() => {
				navigation.navigate('Slot Screen', {
					name: item.name,
					email: item.email
				});
			}}
			style={styles.card}
		>
			<View style={styles.doctorDetails}>
				<View style={styles.avatarview}>
					<Avatar
						style={styles.avatar}
						size="giant"
						source={{ uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png' }}
					/>
				</View>

				<View style={styles.doctorview}>
					<View>
						<Text category="h6">{item.name}</Text>
						<Text category="h6">{item.email}</Text>
					</View>
				</View>
				<View style={{ marginTop: 20 }}>
					<Icon name="medical-services" size={30} color="#900" />
				</View>
			</View>
		</Card>
	);

	auth().onAuthStateChanged((user) => {
		if (user) {
			if (user.isAnonymous) {
				setCurrentEmail('Anonymous');
			} else setCurrentEmail(user.email);
		}
	});

	return (
		<ScrollView style={{ backgroundColor: '#d4e9fd' }}>
			<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
				<View style={{ display: 'flex', alignItems: 'center' }}>
					<Text category="h3"> Doctors Available</Text>
					<Text appearance="hint"> 15 Available today</Text>
				</View>
			</View>

			<FlatList data={doctors} renderItem={renderItems} />
		</ScrollView>
	);
};

export default DoctorListScreen;

const styles = StyleSheet.create({
	card: {
		marginTop: 10,
		marginHorizontal: 20,
		// height:150,
		borderRadius: 15
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
		margin: 8
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
