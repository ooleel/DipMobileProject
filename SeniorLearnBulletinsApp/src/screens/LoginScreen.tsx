import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    onLogin: (userInfo: any) => void;
    onGuestLogin: () => void;
    settings?: any;
    settingsStyle?: any;
}

const API_BASE_URL = 'http://localhost:3000'; 

export default function LoginScreen({onLogin, onGuestLogin}: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [IsLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }

        setIsLoggingIn(true);

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email.trim().toLowerCase(), 
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                //fetch user details with token
                const userResponse = await fetch(`${API_BASE_URL}/user/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': data.token,
                    'Content-Type': 'application/json',
                },
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();
                const userInfo = {
                    ...userData.user,
                    token: data.token,
                    email: email.trim().toLowerCase(),
                };
                onLogin(userInfo); 
            } else {
                //fallback creating user from email
                const userInfo = {
                    email: email.trim().toLowerCase(),
                    username: email.trim().toLowerCase(),
                    name: email.split('@')[0],
                    role: 'member',
                    token: data.token,
                };
                onLogin(userInfo);
            }
            } else {
                Alert.alert('Login Failed', data.message || 'Invalid credentials, please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'An error occurred while logging in. Please try again later.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleGuestLogin = () => {
        Alert.alert(
            'Guest Access',
            'You will have limited access to official bulletinsand cannot post or view member bulletins.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Continue as Guest', onPress: onGuestLogin }
            ]
        );
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}> 
                <Text style={styles.title}>
                    SeniorLearn
                    <Image 
                        style={{width: 30, height: 30, marginLeft: 20}}
                        source={require('../../assets/images/hat-pixel.png')} 
                    />
                </Text> 

                <Text style={styles.subtitle}>Connect and learn together</Text>

                <View style={styles.loginContainer}>
                    <Text style={styles.areaTitle}>Log in</Text>

                    <View style={styles.emailWrapper}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput 
                            style={styles.input} 
                            keyboardType="email-address" 
                            autoCapitalize="none"
                            placeholder="youremail@here.com" 
                            value={email}
                            onChangeText={setEmail}
                            editable={!IsLoggingIn}
                        />

                        <Text style={styles.label}>Password</Text>
                        <View style={styles.pwInputWrapper}> 
                            <TextInput 
                                style={styles.pwInput} 
                                placeholder="Your password here"
                                secureTextEntry = {!showPassword}
                                value = {password}
                                onChangeText = {setPassword}
                                autoCapitalize="none"
                                editable={!IsLoggingIn}
                            />
                            <TouchableOpacity onPress={toggleShowPassword}> 
                                <Ionicons 
                                    name={showPassword ? "eye-off" : "eye"} 
                                    size={24} 
                                    color={IsLoggingIn ? "#ccc" : "black"} 
                                />
                            </TouchableOpacity>
                        </View> {/* End pwInputWrapper */}

                        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                            <Text style={styles.loginBtnText}>
                                {IsLoggingIn ? 'Logging in...' : 'Log in'}
                            </Text>
                        </TouchableOpacity>
                    </View> {/* End inputContainer */}
                </View> {/* End loginContainer */}

                {/* Guest access */}
                <View style={styles.btnWrapper}>
                    <TouchableOpacity style={[styles.guestBtn, IsLoggingIn && styles.buttonDisabled]} onPress={handleGuestLogin} disabled={IsLoggingIn}>
                        <Text style={styles.guestBtnText}>Guest access to official bulletins</Text>
                    </TouchableOpacity>

                    {/* or hyperlink?? */}
                    {/* TODO: add onPress */}
                    <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Forgot my password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Create a new account</Text>
                    </TouchableOpacity>
                </View> {/* End button wrapper */}
            </View> {/* End wrapper */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    //Main container styles
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FAF9F6', 
    },
    wrapper: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#A51589' 
    },
    subtitle: {
        fontSize: 20,
        color: '#A51589',
    },

    //Login container styles
    loginContainer:{
        padding: 20,
        width: '90%',
        backgroundColor: '#D0D8C3', 
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 30, //spacing below header
        alignSelf: 'center', //center the container horizontally 
    },
    areaTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#A51589', 
        paddingBottom: 20,
    },
    emailWrapper: {
        width: '100%',
        gap: 15,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#031602', 
    },
    input: {
        height: 44,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 16,
        paddingHorizontal: 10,
        color: '#898989', 
    },
    loginBtn: {
        backgroundColor: '#FD7F00', 
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    loginBtnText: {
        color: '#FFFAFA', 
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },

    //Password input styles
    pwInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        height: 44,
        marginBottom: 10,
    },
    pwInput: {
        flex: 1,
        fontSize: 16,
        color: '#898989', 
    },

    //other button styles
    btnWrapper: {
        width: '90%',
        marginTop: 20,
        gap: 10,
    },
    button: {
        backgroundColor: '#FFFAFA', 
        borderColor: '#FD7F00', 
        borderWidth: 1,
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#FD7F00', 
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    guestBtn: {
        backgroundColor: '#936589', 
        borderColor: '#936589', 
        borderWidth: 1,
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    guestBtnText: {
        color: '#FAF9F6', 
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        borderColor: '#ccc',
    },
});