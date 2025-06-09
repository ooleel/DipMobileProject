import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    navigation: any;
    settings?: any;
    settingsStyle?: any;
}

export default function LoginScreen({navigation}: Props) {
    const handleLogin = () => {
        if (!email.trim() || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }

        //TODO: call api and verif credentials here
        const userEx = { email, role: 'member' };

        //Navigate to Home after login
        navigation.replace('HomeStack', { user: userEx } ); 
    };

    // State for password input and show/hide password toggle
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}> 
                <Text style={styles.title}>
                    SeniorLearn
                    <Image 
                        style={{width: 30, height: 30, marginLeft: 10}}
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
                            />
                            <TouchableOpacity onPress={toggleShowPassword}> 
                                <Ionicons 
                                    name={showPassword ? "eye-off" : "eye"} 
                                    size={24} 
                                    color="black" 
                                />
                            </TouchableOpacity>
                        </View> {/* End pwInputWrapper */}

                        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                            <Text style={styles.loginBtnText}>Log in</Text>
                        </TouchableOpacity>
                    </View> {/* End inputContainer */}
                </View> {/* End loginContainer */}

                <View style={styles.btnWrapper}>
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
});