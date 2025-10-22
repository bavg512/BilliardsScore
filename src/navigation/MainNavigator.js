import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import GameSetupScreen from '../screens/GameSetupScreen';
import ActiveGameScreen from '../screens/ActiveGameScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a472a',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Billiards Tracker' }}
      />
      <Stack.Screen
        name="GameSetup"
        component={GameSetupScreen}
        options={{ title: 'Game Setup' }}
      />
      <Stack.Screen
        name="ActiveGame"
        component={ActiveGameScreen}
        options={{
          title: 'Practice Session',
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
