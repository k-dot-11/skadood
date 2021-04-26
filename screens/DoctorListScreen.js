import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Card, Text, Layout} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';

const doctors = [
	{ id: 1, name: 'Dr. John', degree: 'MBBS ' },
	{ id: 2, name: 'Dr. John', degree: 'MBBS ' },
	{ id: 3, name: 'Dr. John', degree: 'MBBS ' },
	{ id: 4, name: 'Dr. John', degree: 'MBBS ' },
	{ id: 5, name: 'Dr. John', degree: 'MBBS ' },
	{ id: 6, name: 'Dr. John', degree: 'MBBS ' },
	{ id: 7, name: 'Dr. John', degree: 'MBBS ' },
	{ id: 8, name: 'Dr. John', degree: 'MBBS ' },
	{ id: 9, name: 'Dr. John', degree: 'MBBS ' }
];

const DoctorListScreen = ({ navigation }) => {
	return (
		<ScrollView style={{ backgroundColor: '#d4e9fd' }}>
			<View style={{ flexDirection: 'row' }}>
				<View>
					<Text category="h3"> Doctors Available</Text>
					<Text appearance="hint"> 15 Available today</Text>
				</View>
			</View>

			{doctors.map((doctor) => (
				<Card
					onPress={() => {
						/* 1. Navigate to the Details route with params */
						navigation.navigate('Slot Screen', {
							id: doctor.id,
							name: doctor.name,
							degree: doctor.degree
						});
					}}
					key={doctor.id}
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
								<Text category="h6">{doctor.name}</Text>
							</View>
							<View>
								<Text appearance="hint">Doctor degree: {doctor.degree}</Text>
							</View>
							<View>
								<Text appearance="hint">ALAWAYS THERE FOR PATIENTS</Text>
							</View>
						</View>
						<View style={{ marginTop: 20 }}>
							<Icon name="rocket" size={30} color="#900" />
						</View>
					</View>
				</Card>
			))}
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