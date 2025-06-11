import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Bulletin {
    _id: string;
    title: string;
    content: string;
    type: string;
    createdBy: string;
    createdAt: string;
};

interface Props {
    navigation: any;
    route: any;
    settings?: any;
    user?: any;
}

const API_BASE_URL = 'http://localhost:3000/api/bulletins'; //FIXME: update

export default function BulletinDetailsScreen({ navigation, route, settings, user }: Props) {
    const [bulletin, setBulletin] = useState<Bulletin | null>(null);
    const [loading, setLoading] = useState(true);

    //get bulletins from nav params
    useEffect(() => {
        if (route.params?.bulletin) {
            setBulletin(route.params.bulletin);
            setLoading(false);
        } else {
            Alert.alert('Error', 'No bulletin found.', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                },
            ]);
        }
    }, [route.params]); //FIXME: "React Hook useEffect has a missing dependency: 'navigation'. Either include it or remove the dependency array"

    const handleDelete = () => {
        Alert.alert(
            'Delete Bulletin',
            'Are you sure you want to delete this bulletin?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: confirmDelete
                }
            ]
        );
    };

    const confirmDelete = async () => {
        if (!bulletin || !user?.token) return;

        try {
            const response = await fetch(`${API_BASE_URL}/${bulletin._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: user.token,
                },
                body: JSON.stringify({
                    postId: bulletin._id,
                }),
            });

            if (response.ok) {
                Alert.alert(
                    'Success', 
                    'Bulletin deleted successfully.',
                    [{ text: 'OK', onPress: () => navigation.goBack() }]
                );
            } else {
                const data = await response.json();
                Alert.alert('Error', data.message || 'Failed to delete bulletin.');
            }

        } catch (error) {
            console.error('Error deleting bulletin:', error);
            Alert.alert('Error', 'An error occurred while deleting the bulletin.');
        }
    };

    const canDelete = user && bulletin && (
        user.id === bulletin.createdBy || 
        user._id === bulletin.createdBy ||
        user.role === 'admin' 
    );

    const settingsStyle = settings ? {
        fontSize: settings.fontSize || 16
    } : {};

    if (loading || !bulletin) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>SeniorLearn</Text>
                    <View style={styles.postContainer}>
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                {/* Main header */}
                <View> 
                    <Text style={styles.title}>SeniorLearn</Text> 
                </View>

                {/* Main content */}
                <View style={styles.postContainer}>
                    <Text style={[styles.subtitle, settingsStyle]}>{bulletin.title}</Text>

                    <View style={styles.metadataContainer}>
                        <View style={styles.metadataRow}>
                            <Text style={[styles.label, settingsStyle]}>Type: {bulletin.type === 'official' ? 'Official' : 'Member'}</Text>
                        </View>
                        <View style={styles.metadataRow}>
                            <Text style={[styles.label, settingsStyle]}>Created By: {bulletin.createdBy}</Text>
                        </View>
                        <View style={styles.metadataRow}>
                            <Text style={[styles.label, settingsStyle]}>
                                Created At: {new Date(bulletin.createdAt).toLocaleDateString('en-AU', {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'})}
                            </Text>  
                        </View>
                    </View> {/* End metadata container */}
                    
                    {/* Content */}
                    <View style={styles.postField}>
                        <Text style={[, settingsStyle]}>Content</Text>
                        <ScrollView style={styles.contentScrollView}>
                            <Text style={[styles.postContent, settingsStyle]}>{bulletin.content}</Text>
                        </ScrollView>
                    </View> {/* End content */}
                </View> {/* End post container */}

                {/* Actions */}
                { canDelete && (
                    <View style={styles.actionContainer}>
                        <TouchableOpacity 
                            style={styles.deleteBtn} 
                            onPress={handleDelete}
                        >
                            <Text style={styles.deleteBtnText}>Delete Bulletin</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Go back */}
                <TouchableOpacity 
                    style={styles.goBackBtn} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.goBackBtnText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // Main styles
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: '#FAF9F6',
    },
    scrollContainer:{
        flexGrow: 1,
        padding: 20,
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

    // Post container styles 
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
    postContent: {
        fontSize: 16,
        lineHeight: 24,
        color: '#031602',
    },
    contentScrollView: {
        maxHeight: 200,
        marginTop: 10,
        padding: 10,
        backgroundColor: '#F0F4E3',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    loadingText: {
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
        marginTop: 20,
    },
    
    // Metadata styles
    metadataContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#E8F0D3',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    metadataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 10,
    },

    // Action styles
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        width: '100%',
    },
    deleteBtn: {
        backgroundColor: '#FF6347', // Tomato color
        padding: 15,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    deleteBtnText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },      

    // Go back button styles
    goBackBtn: {
        backgroundColor: '#A51589', // Purple color
        padding: 15,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    goBackBtnText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});