import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
//FIXME: Add useState for font size? 

interface Props {
    navigation: any;
    settings?: any;
    settingsStyle?: any;
}

//FIXME: "← Home" = "← back" + screen name ????
//TODO: add ", settings, settingsStyle" to Props ↓ when Settings will be implemented
export default function HomeScreen({navigation}: Props) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.wrapper}>
                    {/* Main header */}
                    <View> 
                        {/* FIXME: header */}
                        <Text style={styles.title}>SeniorLearn</Text> 
                        {/* TODO: Add icon here */}
                        
                        {/* TODO: Add menu */}
                    </View>

                    {/* Main content */}
                    <View style={styles.homeContainer}> 
                        <Text style={styles.subtitle}>Have a look</Text>
                        <View style={styles.btnWrapper}>
                            <TouchableOpacity 
                                style={styles.button} 
                                onPress={() => navigation.navigate('BulletinsList')}
                            >
                                <Text style={styles.buttonText}>View Bulletins</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.button} 
                                onPress={() => navigation.navigate('PostBulletin')}
                            >
                                <Text style={styles.buttonText}>Post a new Bulletin</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.button} 
                                onPress={() => navigation.navigate('Settings')}
                            >
                                <Text style={styles.buttonText}>Settings</Text>
                            </TouchableOpacity>
                        </View> {/* End button container */}
                    </View> {/* End home container */}

                    <View style={styles.btnWrapper}>
                        <TouchableOpacity style={styles.buttonHowTo}>
                            {/* ADD: onPress={() => navigation.navigate('HowTo')} */}
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
        color: '#031602' 
    },
    homeContainer:{
        flex: 1,
        alignItems: 'center',
        padding: 20,
        width: '90%',
        backgroundColor: '#DACFD5', 
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
    btnWrapper: {
        width: '90%',
        marginTop: 20,
        gap: 10,
    },
    button: {
        backgroundColor: '#FFFAFA', 
        borderColor: '#A51589', 
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
        color: '##031602', 
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    buttonHowTo: {
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
    }
});