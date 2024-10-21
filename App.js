import React from 'react';
import { NavigationContainer, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native'; // Hook to detect dark mode
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import ProfileScreen from './screens/ProfileScreen';
import { auth } from './firebase'; 

const Stack = createStackNavigator();

export default function App() {
  const scheme = useColorScheme();

  const DarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      primary: '#fff', 
      background: '#121212', 
      card: '#1f1f1f', 
      text: '#ffffff',
    },
  };

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : undefined}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        
        <Stack.Screen 
          name="About" 
          component={AboutScreen} 
          options={{ 
            headerShown: true,
            headerStyle: { backgroundColor: '#1f1f1f' }, 
            headerTintColor: '#fff', 
          }} 
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ 
            headerShown: true,
            headerStyle: { backgroundColor: '#1f1f1f' }, 
            headerTintColor: '#fff', 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
