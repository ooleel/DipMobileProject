import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Import screens
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import BulletinsListScreen from './src/screens/BulletinsListScreen';
import BulletinDetailsScreen from './src/screens/BulletinsDetailsScreen';
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
                    component={LoginScreen} 
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
                    component={HomeScreen} 
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
                    component={BulletinsListScreen} 
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
                    component={BulletinDetailsScreen} 
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
                    component={PostBulletinScreen} 
                    options={{ title: 'Post a new Bulletin' }} 
                />

                <Stack.Screen name="Settings">
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