import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; 

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

    return (
        <View style={styles.container}>
            <Text style={[styles.title, settingsStyle]}>Login</Text>
            <Text style={[styles.subtitle, settingsStyle]}>Welcome to SeniorLearn!</Text>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
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