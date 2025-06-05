import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Import screens
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import BulletinsListScreen from './src/screens/BulletinsListScreen';
import BulletinDetailsScreen from './src/screens/BulletinDetailsScreen';
import PostBulletinScreen from './src/screens/PostBulletinScreen';
import SettingsScreen from './src/screens/SettingsScreen';

//Stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
    //global state for settings 
    const [fontSize, setFontSize] = useState(16);
    const [settings, setSettings] = useState({
        brightness: 1,
        isSoundEnabled: false,
    });
    
    const settingsStyle = {fontSize};

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {/*Authentication*/}
                <Stack.Screen 
                    name="Login"
                    options={{ headerShown: false }} 
                >
                    {props => 
                        <LoginScreen   
                            {...props} 
                            settings = {settings}
                            settingsStyle = {settingsStyle} 
                        />}
                </Stack.Screen>

                {/*Main flow*/}
                <Stack.Screen 
                    name="Home" 
                    options={{ title: 'Home' }}
                >
                    {props => 
                        <HomeScreen   
                            {...props} 
                            settings = {settings}
                            settingsStyle = {settingsStyle} 
                        />}
                </Stack.Screen>

                <Stack.Screen 
                    name="BulletinsList" 
                    options={{ title: 'Bulletins' }} 
                >
                    {props => 
                        <BulletinsListScreen   
                            {...props} 
                            settings = {settings}
                            settingsStyle = {settingsStyle} 
                        />}
                </Stack.Screen>

                <Stack.Screen 
                    name="BulletinDetails" 
                    options={{ title: 'Bulletin Details' }} 
                >
                    {props => 
                        <BulletinDetailsScreen   
                            {...props} 
                            settings = {settings}
                            settingsStyle = {settingsStyle} 
                        />}
                </Stack.Screen>

                <Stack.Screen 
                    name="PostBulletin" 
                    options={{ title: 'Post a new Bulletin' }} 
                >
                    {props =>
                        <PostBulletinScreen   
                            {...props} 
                            settings = {settings}
                            settingsStyle = {settingsStyle} 
                        />}
                </Stack.Screen>

                <Stack.Screen 
                    name="Settings"
                    options={{ title: 'Settings' }}
                >
                    {props => 
                        <SettingsScreen   
                            {...props} 
                            fontSize = {fontSize}
                            setFontSize = {setFontSize}
                            settings = {settings}
                            setSettings = {setSettings}
                        />}
                </Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
  );
}