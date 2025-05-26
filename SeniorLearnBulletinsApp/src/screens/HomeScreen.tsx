import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
    navigation: any;
    settings?: any;
    settingsStyle?: any;
}

export default function HomeScreen({navigation, settings, settingsStyle}: Props) {
    return (
        <View style={styles.container}>
            <Text style={[styles.title, settingsStyle]}>Home</Text>
            <Text style={[styles.title, settingsStyle]}>Welcome to SeniorLearn!</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('BulletinsList')}>
                    <Text style={styles.buttonText}>View Bulletins</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('PostBulletin')}>
                    <Text style={styles.buttonText}>Post a new Bulletin</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('Settings')}>
                    <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>
            </View>
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
    buttonContainer: {
        width: '100%',
        gap: 15,
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});