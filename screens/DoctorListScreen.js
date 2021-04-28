import React from 'react';
import { ActivityIndicator, FlatList, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Button, Avatar, Card, Text, Layout } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DoctorListScreen = ({ navigation }) => {
	const [ currEmail, setCurrentEmail ] = useState('');
	const [ loading, setLoading ] = useState(true);
	const [ doctors, setDoctors ] = useState([]);
	const [toggle,setToggle]=useState(false);
	const [toggle2,setToggle2]=useState(false);

	const toggleFilter=()=>{
		setToggle(!toggle);
		console.log(toggle);

	}
	const toggleFilter1=()=>{
		setToggle2(!toggle2);
		console.log(toggle2);

	}

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
			style={styles.card}
		>
			{/* <View style={styles.doctorDetails}>
				<View style={styles.avatarview}> */}
					<Avatar
						style={styles.avatar}
						size="giant"
						source={{ uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png' }}
					/>
				

				{/* <View style={styles.doctorview}> */}
					<View style={{margin:10}}>
						<Text category="h6">{item.name}</Text>
						<Text category="h6" appearance="hint">{item.email}</Text>
					
				</View>
				<View style={{ marginTop: 20 }}>
					<Icon name="arrow-right" size={36} color="#000" />
				</View>
		
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
		<View style={{ marginTop:StatusBar.currentHeight+5,
			// backgroundColor: '#d4e9fd',
		 flex: 1 }}>
			<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
				<View style={{ display: 'flex', alignItems: 'center' }}>
					<Text category="h4"  style={{alignSelf:"flex-start",marginTop:5}}> Doctors Available</Text>
					<Text appearance="hint" style={{alignSelf:"flex-start",marginTop:5}}> 16 Available today</Text>
				</View>
				<View style={{marginTop:15}}>
				<Button onPress={logout}>Log out</Button>
				</View>
			</View>
			<View style={{display: 'flex', marginTop:30,marginHorizontal:30, flexDirection: 'row', }}>
			<TouchableOpacity onPress={toggleFilter1}
			
			style={{
			padding:20,
			marginBottom:20,
			marginRight:20,
			backgroundColor:toggle2 ? "#2e0854" : "#fff",
			opacity:0.8,
		
			borderRadius:30, }}
		>
			<Text style={{color:!toggle2 ? "#2e0854" : "#fff"}}>Currently Available</Text>
		</TouchableOpacity>
			<TouchableOpacity onPress={toggleFilter}
			
			
			style={{
			padding:20,
			marginBottom:20,
			backgroundColor:toggle ? "#2e0854" : "#fff",
			opacity:0.8,
		
			
			borderRadius:30, }}
		>
			<Text style={{color:
				!toggle ? "#2e0854" : "#fff"}}>All Doctors</Text>
		</TouchableOpacity>

			</View>

			<FlatList data={doctors} renderItem={renderItems} contentContainerStyle={{padding:20,
			marginBottom:20,
			}}/>
		</View>
	);
};

export default DoctorListScreen;

const styles = StyleSheet.create({
	card: {
		flexDirection:"row",
		padding:20,
		marginBottom:20,
		backgroundColor:"rgba(255,255,255,0.8)",
		borderRadius:20, 
		//elevation: 5,

		// shadowColor:"#000", 
		// shadowOffset:{
		// 	width:0,
		// 	height:10,
		// },
		// shadowOpacity:0.3,
		// shadowRadius:20
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
