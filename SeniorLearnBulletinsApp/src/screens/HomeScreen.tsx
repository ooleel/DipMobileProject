import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: any;
    settings?: any;
    settingsStyle?: any;
}

//TODO: add ", settings, settingsStyle" to Props ↓ when Settings will be implemented
export default function HomeScreen({navigation}: Props) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>SeniorLearn</Text> 
                    {/* TODO: Add icon here */}
                    
                    {/* TODO: Add menu */}

                    <View style={styles.homeContainer}> 
                        <Text style={styles.subtitle}>Have a look</Text>
                        <View style={styles.btnContainer}>
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
                        </View> {/* End button container */}
                    </View> {/* End home container */}

                    <View style={styles.btnWrapper}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>How to use this app</Text>
                        </TouchableOpacity>
                    </View> {/* End button wrapper */}
                </View> {/* End main container */}
            </SafeAreaView>
        </SafeAreaProvider>
    );
 }

const styles = StyleSheet.create({
    //Main container styles
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    wrapper: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
    },

    homeContainer:{
        flex: 1,
        alignItems: 'center',
        padding: 20,
        width: '90%',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 30, //spacing below header
        alignSelf: 'center', //center the container horizontally  
    },

    //Button styles
    btnContainer: {
        width: '90%',
        marginTop: 20,
        gap: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    btnWrapper: {
        width: '90%',
        marginTop: 20,
        gap: 10,
    },
});