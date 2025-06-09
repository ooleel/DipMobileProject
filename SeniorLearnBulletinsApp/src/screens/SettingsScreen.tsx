import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//FIXME: Add useState for font size? 

interface Props {
    navigation: any;
    fontSize: number;
    setFontSize: (size: number) => void;
    settings: {
        brightness: number;
        isSoundEnabled: boolean;
    };
    setSettings: (settings: any) => void;
}

//FIXME: "← Settings" fix navigation
export default function SettingsScreen({ navigation, fontSize, setFontSize, settings, setSettings }: Props) {
    //Font size state and functions
    const increaseFontSize = () => {
        if (fontSize < 30) {
            setFontSize(fontSize + 2);
        }
    };
    const decreaseFontSize = () => {
        if (fontSize > 14) {
            setFontSize(fontSize - 2);
        }
    };

    //High contrast mode state
    //Dark mode 
    
    //Sound toggle function
    const toggleSound = () => {
        setSettings({
            ...settings,
            isSoundEnabled: !settings.isSoundEnabled,
        });
    };

    //Save settings function
    const handleSave = () => {
        navigation.goBack(); //back to previous screen (Home)
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                {/* FIXME: header */}
                <Text style={styles.title}>SeniorLearn</Text> 
                {/* TODO: Add icon here */}
                
                {/* TODO: Add menu */}

                <Text style={styles.subtitle}>Settings</Text>

                <View style={styles.layoutContainer}>
                    <Text style={styles.sectionTitle}>Font Size</Text>
                    <Text style={[styles.currentValue, {fontSize}]}>
                        Current font size: {fontSize}px
                    </Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity 
                            style={[styles.button, fontSize <= 14 && styles.disabledButton]}
                            onPress={decreaseFontSize} 
                            disabled={fontSize <= 14}
                        >
                            <Text style={styles.buttonText}>Smaller</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, fontSize >= 30 && styles.disabledButton]}
                            onPress={increaseFontSize} 
                            disabled={fontSize >= 30}
                        >
                            <Text style={styles.buttonText}>Larger</Text>
                        </TouchableOpacity>
                    </View> {/* End button row */}
                </View> {/* End font container */}

                <View style={styles.layoutContainer}>
                    <Text style={styles.sectionTitle}>Sound</Text>
                    <Text style={[styles.switchLabel, {fontSize}]}>Enable sound</Text>
                    <Switch
                        value={settings.isSoundEnabled}
                        onValueChange={toggleSound}
                        trackColor={{ false: '#E28378', true: '#53A267' }}
                        thumbColor={settings.isSoundEnabled ? '#305F3C' : '#D23D2D'}
                    />
                </View> {/* End sound container */}

                <View style={styles.saveBtnContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save settings</Text>
                    </TouchableOpacity>
                </View> {/* End save button container */}
            </View> {/* End main container */}
        </SafeAreaView>
    );
}

//TODO: add colours and styles for disabled buttons
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
    buttonRow: {
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
        color: '##FD7F00', 
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