import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthPage from './screens/AuthPage';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

const Stack = createStackNavigator();

function App() {
  return (
      <ApplicationProvider {...eva} theme={eva.light}>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={AuthPage} />
      </Stack.Navigator>
    </NavigationContainer>
    </ApplicationProvider>
  );
}

export default App;