import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function BulletinDetailsScreen() {
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
                    <View style={styles.postContainer}>
                        <Text style={styles.subtitle}></Text> {/* Post title should be here */}
                        
                        <View style={styles.postField}>
                            <Text style={styles.label}>Content</Text>
                            <Text
                                style={styles.postContent}
                            />
                        </View>

                        <View style={styles.postField}>
                            <Text style={styles.label}>Tags</Text>
                            <Text
                                style={styles.tagsContent} 
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container:{
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
    postContainer:{
        padding: 20,
        width: '90%',
        backgroundColor: '#D0D8C3', 
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 30, 
        alignSelf: 'center',
    },
    subtitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#A51589',
        paddingBottom: 20,
    }, 
    postField: {
        marginBottom: 20,
        width: '100%',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#031602',
    },
    postContent: {},
    tagsContent: {},
});