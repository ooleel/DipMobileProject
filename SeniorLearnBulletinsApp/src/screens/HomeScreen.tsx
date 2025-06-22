import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

/**
 * @description HomeScreen component for the SeniorLearn Bulletins app. This component serves as the main screen of the app, providing navigation options to view bulletins, post new bulletins, and access settings.
 * @interface Props
 * @typedef {Props}
 */
interface Props {
    /**
     * @description Navigation prop for navigating between screens in the app.
     * @type {*}
     */
    navigation: any;
    /**
     * @description Settings object containing user preferences such as font size.
     * @type {?*}
     */
    settings?: any;
    /**
     * @description Style object for applying settings such as font size to the components.
     * @type {?{ fontSize: number; }}
     */
    settingsStyle?: { fontSize: number; }; 
    /**
     * @description User object containing information about the logged-in user, such as role, email, and optional username.
     * @type {{ role: string; email: string; username?: string; }}
     */
    user: { role: string; email: string; username?: string; };
}

/**
 * @description HomeScreen component for the SeniorLearn Bulletins app. This component serves as the main screen of the app, providing navigation options to view bulletins, post new bulletins, and access settings.
 * @export
 * @param {Props} param0 
 * @param {*} param0.navigation 
 * @param {*} param0.settings 
 * @param {{ fontSize: number; }} param0.settingsStyle 
 * @param {{ role: string; email: string; username?: string; }} param0.user 
 * @returns {*} 
 */
export default function HomeScreen({ navigation, settings, settingsStyle, user }: Props) {
    const appliedSettings = settings ? { fontSize: settings.fontSize || 16 } : {};

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                {/* Main header */}
                {/* <Text style={[styles.title, settingsStyle]}>SeniorLearn</Text>  */}

                {/* Main content */}
                <View style={styles.homeContainer}> 
                    <Text style={styles.subtitle}>Have a look</Text>
                    <View style={styles.btnWrapper}>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => navigation.navigate('BulletinsList')}
                        >
                            <Text style={[styles.buttonText, appliedSettings]}>View Bulletins</Text>
                        </TouchableOpacity>

                        {/* FIXME: Post an official bulletin??? */}
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => navigation.navigate('PostBulletin')}
                        >
                            <Text style={[styles.buttonText, appliedSettings]}>Post a new Bulletin</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => navigation.navigate('Settings')}
                        >
                            <Text style={[styles.buttonText, appliedSettings]}>Settings</Text>
                        </TouchableOpacity>
                    </View> {/* End button container */}
                </View> {/* End home container */}

                <View style={styles.btnWrapper}>
                    <TouchableOpacity style={styles.buttonHowTo}>
                        {/* TODO: onPress={() => navigation.navigate('HowTo')} */}
                        <Text style={styles.buttonText}>How to use this app</Text>
                    </TouchableOpacity>
                </View> {/* End button wrapper */}
            </View> {/* End main container */}
        </SafeAreaView>
    );
}

//post an official bulletin
/*
{user.role === 'admin' && (
    <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('PostBulletin')}
    >
        <Text style={[styles.buttonText, settingsStyle]}>Post a new Bulletin</Text>
    </TouchableOpacity>
)}
*/

/**
 * @description Styles for the HomeScreen component.
 * @type {*}
 */
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
        color: '#031602', 
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