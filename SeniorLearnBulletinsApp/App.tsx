import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Import screens
import LoginScreen from './src/screens/LoginScreen';
import BulletinsListScreen from './src/screens/BulletinsListScreen';
import BulletinDetailsScreen from './src/screens/BulletinsDetailsScreen';
import PostBulletinScreen from './src/screens/PostBulletinScreen';

//Stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            {/*Authentication*/}
            <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{ headerShown: false }} 
            />

            {/*Main flow*/}
            <Stack.Screen 
                name="BulletinsList" 
                component={BulletinsListScreen} 
                options={{ title: 'Bulletins' }} 
            />
            <Stack.Screen 
                name="BulletinDetails" 
                component={BulletinDetailsScreen} 
                options={{ title: 'Bulletin Details' }} 
            />
            <Stack.Screen 
                name="PostBulletin" 
                component={PostBulletinScreen} 
                options={{ title: 'Post a new Bulletin' }} 
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}