import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthPage from './screens/AuthPage';
import * as eva from '@eva-design/eva';
import { ApplicationProvider} from '@ui-kitten/components';
import LoginScreen from './screens/LoginScreen';
import SlotBookingScreen from './screens/SlotBookingScreen';
import DoctorListScreen from './screens/DoctorListScreen';
import SplashScreen from './screens/SplashScreen';
import {ThemeContext} from './context/ThemeContext';
const Stack = createStackNavigator();

function App() {
	const [ theme, setTheme ] = React.useState('light');

	const toggleTheme = () => {
		const nextTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(nextTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<ApplicationProvider {...eva} theme={eva[theme]}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="Splash"
							options={{ title: ' ', headerTransparent: true }}
							component={SplashScreen}
						/>
						<Stack.Screen name="Login" component={LoginScreen} />

						<Stack.Screen name="Sign Up" component={AuthPage} />
						<Stack.Screen
							name="Doctor Screen"
							component={DoctorListScreen}
							options={{
								title: '',
								headerStyle: {
									backgroundColor: '#222831'
								},
								headerTintColor: '#fff'
							}}
						/>
						<Stack.Screen
							name="Slot Screen"
							component={SlotBookingScreen}
							options={{
								title: 'Book your slot',
								headerStyle: {
									backgroundColor: '#222831'
								},
								headerTintColor: '#fff'
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ApplicationProvider>
		</ThemeContext.Provider>
	);
}

export default App;
