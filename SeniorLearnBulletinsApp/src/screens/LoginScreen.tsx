import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'; 
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    navigation: any;
    settings?: any;
    settingsStyle?: any;
}

export default function LoginScreen({navigation, settingsStyle}: Props) {
    const handleLogin = () => {
        //Navigate to Home after login
        navigation.navigate('Home');
    };

    // State for password input and show/hide password toggle
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <SafeAreaProvider>
             <SafeAreaView style={styles.container}>
                <View> 
                    <Text style={[styles.title, settingsStyle]}>SeniorLearn</Text> 
                    {/* TODO: Add icon here */}
                    <Text style={[styles.subtitle, settingsStyle]}>Connect and learn together</Text>
                </View>

                <View style={styles.loginContainer}>
                    <Text style={styles.areaTitle}>Log in</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="youremail@here.com" 
                            keyboardType="email-address" 
                            autoCapitalize="none"
                        />

                        <Text style={styles.label}>Password</Text>
                        <TextInput 
                            secureTextEntry = {!showPassword}
                            value = {password}
                            onChangeText = {setPassword}
                            style={styles.input} 
                            placeholder="Your Password here" 
                            keyboardType="email-address" 
                            autoCapitalize="none"
                        />
                        <Ionicons 
                            name={showPassword ? "eye-off" : "eye"} 
                            size={24} 
                            color="black" 
                            onPress={toggleShowPassword} 
                            style={{ marginLeft: 10 }}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Log in</Text>
                        </TouchableOpacity>
                    </View>

                    {/* or hyperlink?? */}
                    {/* TODO: add onPress */}
                    <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Forgot my password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Create a new account</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </SafeAreaProvider>
       
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    loginContainer:{
        width: '100%',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    areaTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        width: '100%',
        gap: 15,
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#007bff',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});