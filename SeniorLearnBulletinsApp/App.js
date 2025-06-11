import React, {useState} from 'react';
import { Alert, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//Import screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import BulletinsListScreen from './src/screens/BulletinsListScreen';
import BulletinDetailsScreen from './src/screens/BulletinDetailsScreen';
import PostBulletinScreen from './src/screens/PostBulletinScreen';
import SettingsScreen from './src/screens/SettingsScreen';
//import HowToScreen from './src/screens/HowToScreen';
//import AboutScreen from './src/screens/AboutScreen';

//Stack navigator
const Stack = createNativeStackNavigator();
//Drawer navigator
const Drawer = createDrawerNavigator();

function AuthStack({ onLogin, onGuestLogin }) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">
                {props => <LoginScreen {...props} onLogin={onLogin} onGuestLogin={onGuestLogin} />}
            </Stack.Screen>
            {/* <Stack.Screen
                name="GuestBulletinsList"
                component={BulletinsListScreen}
                headerBackTitle="Back to Login"
            /> */}
        </Stack.Navigator>
    );
}

function CustomDrawerContent({user, signOut, ...props}) {
    const handleLogOut = () => {
        Alert.alert(
            'Logging out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'No', style: 'cancel'
                },
                {
                    text: 'Yes, exit',
                    onPress: () => {
                        signOut();
                    },
                    style: 'destructive'
                }
            ]
        );
    }

    return (
        <DrawerContentScrollView 
            {...props} 
            contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
        >
            <Text
                style={{margin: 16, fontWeight: 'bold', fontSize: 18}}
            >
                {user.username || user.email || user.name || 'Guest'}
            </Text>

            {/* Drawer items */}
            <DrawerItem 
                label="How to use this app"
                onPress={() => props.navigation.navigate('HowTo')}
            />
            <DrawerItem 
                label="About SeniorLearn"
                onPress={() => props.navigation.navigate('About')}
            />
            <DrawerItem 
                label="Settings"
                onPress={() => props.navigation.navigate('Settings')}
            />

            {/* Log out */}
            <DrawerItem 
                label="Log out"
                onPress={handleLogOut}
                style={{ marginBottom: 16 }}
            />
        </DrawerContentScrollView>
    )
}

function AppDrawer({ user, signOut, settings, setSettings }) {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} user={user} signOut={signOut} />}
            screenOptions={{ headerTitle: 'SeniorLearn' }}
        >
            {/* Main screens */}
            <Drawer.Screen name="HomeStack" 
                options={{ title: 'Home' }}
            >
                {() => (
                    <Stack.Navigator
                        screenOptions={{ 
                            headerTitle: 'SeniorLearn',
                            headerBackTitle: 'Back',
                        }}
                    >
                        <Stack.Screen 
                            name="Home" 
                            component={HomeScreen} 
                        >
                            {props => (<HomeScreen {...props} settings={settings} setSettings={setSettings} user={user}/>
                            )}
                        </Stack.Screen>
                        <Stack.Screen 
                            name="BulletinsList" 
                            component={BulletinsListScreen} 
                        >
                            {props => (<BulletinsListScreen {...props} settings={settings} user={user}/>
                            )}
                        </Stack.Screen>
                        <Stack.Screen 
                            name="BulletinDetails" 
                            component={BulletinDetailsScreen} 
                        >
                            {props => (<BulletinDetailsScreen {...props} settings={settings} user={user}/>
                            )}
                        </Stack.Screen>
                        <Stack.Screen 
                            name="PostBulletin" 
                            component={PostBulletinScreen} 
                        > 
                            {props => (<PostBulletinScreen {...props} settings={settings} user={user}/>
                            )}
                        </Stack.Screen>
                    </Stack.Navigator>
                )}
            </Drawer.Screen>

            {/* other routes */}
            <Drawer.Screen name="Settings">
                {props => (
                    <SettingsScreen
                        {...props} 
                        settings={settings} 
                        setSettings={setSettings} 
                    />
                )}
            </Drawer.Screen>
            {/* Uncomment if screens are implemented */}
            {/* <Drawer.Screen 
                name="HowTo" 
                component={HowToScreen} 
                options={{ title: 'How to use this app' }}
            />
            <Drawer.Screen
                name="About"
                component={AboutScreen}
                options={{ title: 'About SeniorLearn' }}
            /> */}  
        </Drawer.Navigator>
    )
}
export default function App() {
    const [user, setUser] = useState(null);

    //keep settings state in App:
    const [settings, setSettings] = useState({
        fontSize: 16,
        isSoundEnabled: true
    });

    const signIn = userInfo => setUser(userInfo);
    const signInAsGuest = () => setUser({ email: 'guest', username: 'Guest', role: 'guest' });
    const signOut = () => setUser(null);

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {user ? (
                    <AppDrawer 
                        user={user} signOut={signOut} 
                        settings={settings} setSettings={setSettings}
                    />
                ) : (
                    <AuthStack onLogin={signIn} onGuestLogin={signInAsGuest}/>
                )}
            </NavigationContainer>
        </SafeAreaProvider>
        //onPress={onGuestLogin}
    );
}