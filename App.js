import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthPage from './screens/AuthPage';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import LoginScreen from './screens/LoginScreen';
import SlotBookingScreen from './screens/SlotBookingScreen';
import DoctorListScreen from './screens/DoctorListScreen';
const Stack = createStackNavigator();

function App() {
	return (
		<ApplicationProvider {...eva} theme={eva.light}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Sign Up" component={AuthPage} />
					<Stack.Screen name="Doctor Screen" component={DoctorListScreen} />
					<Stack.Screen name="Slot Screen" component={SlotBookingScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</ApplicationProvider>
	);
}

export default App;
