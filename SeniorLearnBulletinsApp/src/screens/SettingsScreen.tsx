import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, SafeAreaView } from 'react-native';

/**
 * @description SettingsType interface defines the structure for user settings in the app.
 * @interface SettingsType
 * @typedef {SettingsType}
 */
interface SettingsType {
    /**
     * @description Font size for the app's text.
     * @type {number}
     */
    fontSize: number;
    /**
     * @description Boolean indicating whether sound is enabled in the app.
     * @type {boolean}
     */
    isSoundEnabled: boolean;
}

/**
 * @description Props interface defines the properties for the SettingsScreen component.
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
     * @description Settings object containing user preferences such as font size and sound settings.
     * @type {SettingsType}
     */
    settings: SettingsType;
    /**
     * @description Function to update the settings state in the app.
     * @type {React.Dispatch<React.SetStateAction<SettingsType>>}
     */
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
}

/**
 * @description SettingsScreen component for the SeniorLearn Bulletins app. This component allows users to adjust settings such as font size and sound preferences.
 * @export
 * @param {Props} param0 
 * @param {*} param0.navigation 
 * @param {SettingsType} param0.settings 
 * @param {React.Dispatch<React.SetStateAction<SettingsType>>} param0.setSettings 
 * @returns {*} 
 */
export default function SettingsScreen({ navigation, settings, setSettings }: Props) {
    const { fontSize = 16, isSoundEnabled = true } = settings;

    //High contrast mode state??
    //Dark mode??
    
    //Sound toggle 
    const toggleSound = (val: boolean) => {
        setSettings(s => ({...s, isSoundEnabled: val}));
    };

    //Font size
    const increaseFont = () => {
        if (fontSize < 30) {
            setSettings(s => ({...s, fontSize: s.fontSize + 2}));
        }
    };
    const decreaseFont = () => {
        if (fontSize >   12) {
            setSettings(s => ({...s, fontSize: s.fontSize - 2}));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.subtitle}>Settings</Text>

                <View style={styles.layoutContainer}>
                    <Text style={styles.sectionTitle}>Font Size</Text>
                    <Text style={[styles.currentValue, {fontSize}]}>
                        Current font size: {fontSize}px
                    </Text>

                    <View style={styles.fontControls}>
                        <TouchableOpacity 
                            style={[styles.button, fontSize <= 12 && styles.disabledButton]}
                            onPress={fontSize > 12 ? decreaseFont : undefined} 
                            disabled={fontSize <= 12}
                        >
                            <Text style={[styles.buttonText, fontSize <= 12 && styles.disabledButtonText]}>Smaller</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, fontSize >= 30 && styles.disabledButton]}
                            onPress={fontSize < 30 ? increaseFont : undefined}
                            disabled={fontSize >= 30} 
                        >
                            <Text style={[styles.buttonText, fontSize >= 30 && styles.disabledButtonText]}>Larger</Text>
                        </TouchableOpacity>
                    </View> {/* End button row */}
                </View> {/* End font container */}

                <View style={styles.layoutContainer}>
                    <Text style={styles.sectionTitle}>Sound</Text>
                    <Text style={[styles.switchLabel, {fontSize}]}>Enable sound</Text>
                    <Switch
                        value={isSoundEnabled}
                        onValueChange={toggleSound}
                        trackColor={{ false: '#E28378', true: '#53A267' }}
                        thumbColor={isSoundEnabled ? '#305F3C' : '#D23D2D'}
                    />
                </View> {/* End sound container */}

                <View style={styles.saveBtnContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.saveButtonText}>Save settings</Text>
                    </TouchableOpacity>
                </View> {/* End save button container */}
            </View> {/* End main container */}
        </SafeAreaView>
    );
}

//TODO: add colours and styles for disabled buttons?
/**
 * @description Styles for the SettingsScreen component.
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

    //Layout accessibility styles
    layoutContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: '90%',
        borderColor: '#DACFD5', 
        borderWidth: 1,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
        marginTop: 30, //spacing below header
        alignSelf: 'center', //center the container horizontally

    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#936589', 
    },
    currentValue: {
        color: '#031602', 
        marginBottom: 15,
    },
    fontControls: {
        flexDirection: 'row',
        gap: 25,
    },
    button: {
        backgroundColor: '#FFFAFA', 
        borderColor: '#936589', 
        borderWidth: 1,
        padding: 14,
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
    disabledButton: {
        backgroundColor: '#E0E0E0', 
        borderColor: '#B0B0B0', 
        color: '#A0A0A0', 
        opacity: 0.6, 
        shadowColor: 'transparent', 
        elevation: 0, 
    },
    disabledButtonText: {
        color: '#A0A0A0', 
    },
    switchRow: {
        width: '70%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    switchLabel: {
        flex: 1
    },

    //Save button styles
    saveBtnContainer: {
        padding: 20,
        width: '95%',
    },
    saveButton: {
        backgroundColor: '#FD7F00', 
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }, 
    saveButtonText: {
        color: '#FFFAFA', 
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    }
});