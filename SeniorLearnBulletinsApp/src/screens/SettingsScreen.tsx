import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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

export default function SettingsScreen({ navigation, fontSize, setFontSize, settings, setSettings }: Props) {

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
    
    const toggleSound = () => {
        setSettings({
            ...settings,
            isSoundEnabled: !settings.isSoundEnabled,
        });
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View style={styles.container}>
                    <Text style={styles.title}>Settings</Text>
                    <Text style={[styles.subtitle, {fontSize: fontSize - 2}]}>
                        Customise the settings to fit your needs.
                    </Text>

                    <View style={styles.settingsSection}>
                        <Text style={styles.sectionTitle}>Font Size</Text>
                        <Text style={[styles.currentValue, {fontSize}]}>
                            Current font size: {fontSize}px
                        </Text>
                    </View>

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
                    </View>

                    <View style={styles.settingsSection}>
                        <Text style={[styles.sectionTitle, {fontSize}]}>Sound</Text>
                        <Text style={[styles.switchLabel, {fontSize}]}>Enable sound</Text>
                        <Switch
                            value={settings.isSoundEnabled}
                            onValueChange={toggleSound}
                            trackColor={{ false: 'red', true: 'green' }}
                            thumbColor={settings.isSoundEnabled ? 'blue' : 'orange'}
                        />
                    </View>
                </View> {/* End main container */}
            </SafeAreaView>
        </SafeAreaProvider>

        
    );
}

//TODO: add colours and styles for disabled buttons
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        marginBottom: 20,
        textAlign: 'center',
    },
    settingsSection: {
        marginBottom: 30,
        padding: 15,
        //borderRadius: 8,
        // backgroundColor??
    },
    sectionTitle: {
        fontWeight: '600',
        marginBottom: 10,
    },
    currentValue: {
        color: 'violet',
        marginBottom: 15,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        backgroundColor: 'yellow',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
        flex: 1,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: 'lightgray',
    },
    buttonText: {
        fontWeight: '600',
        color: 'black',
        fontSize: 16,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    switchLabel: {
        flex: 1
    },
});