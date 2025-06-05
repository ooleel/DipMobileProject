import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
//import { useFocusEffect } from '@react-navigation/native';
//import { fetchBulletins } from '../api/bulletins'; 

interface Props {
    navigation: any;
    settings?: any; 
    settingsStyle?: any; 
}

export default function BulletinsListScreen({ navigation, settings, settingsStyle }: Props ) {
    //useFocusEffect to fetch bulletins when the screen is focused
    //fetchBulletins function should be defined to fetch data from the API

    const renderBulletin = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.bulletinItem}
            onPress={() => navigation.navigate('BulletinDetail', { bulletin: item })}
        >
            <Text style={[styles.bulletinTitle, settingsStyle]}>{item.title}</Text>
            <Text style={[styles.bulletinDate, settingsStyle]}>{item.date}</Text>
        </TouchableOpacity>
    );

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
                    <View style={styles.bulletinsContainer}>
                        <Text style={styles.subtitle}>Bulletins List</Text>
                        <FlatList
                            data={[]} 
                            renderItem={renderBulletin}
                            keyExtractor={(item) => item.id.toString()} //each bulletin has a unique id
                            contentContainerStyle={styles.listContent}
                        />
                    </View> {/* End bulletins container */}
                    
                </View> {/* End main header */}
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
    bulletinsContainer: {
        padding: 20,
        width: '90%',
        backgroundColor: '#D0D8C3', 
        borderRadius: 8,
    },
    subtitle: {
        fontSize: 20,
        color: '#A51589',
        paddingBottom: 20,
    },
    bulletinItem: {
        padding: 15,
        backgroundColor: '#E0E4D7',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        gap: 5,
    },
    bulletinTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#031602',
    },
    bulletinDate: {
        fontSize: 14,
        color: '#6B8E23',
    },
    listContent: {
        paddingBottom: 20, 
        flexGrow: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%', 
        gap: 10, 
        marginTop: 20, 
        marginBottom: 20, 
        backgroundColor: '#FAF9F6', 
        borderRadius: 8, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
        alignSelf: 'center', 
        paddingHorizontal: 20,
    },
 });
