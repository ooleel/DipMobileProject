import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

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
    settings?: any; 
    user?: any; 
    route?: any;
};

const API_BASE_URL = 'http://localhost:3000'; 

export default function BulletinsListScreen({ navigation, settings, user, route }: Props ) {
    const [bulletins, setBulletins] = useState<Bulletin[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'official' | 'member'>('official'); 

    //is user a guest or a member?
    const isGuest = user?.role === 'guest';
    const canViewMemberPosts = user && !isGuest;

    const fetchBulletins = useCallback(async (type: 'official' | 'member') => {
        setLoading(true);
        try {
            const headers: any = {
                'Content-Type': 'application/json',
            };

            //auth header for member posts 
            if (type === 'member' && user?.token) {
                headers.Authorization = user.token;
            }

            const response = await fetch(`${API_BASE_URL}/posts?type=${type}&limit=10`, {
                method: 'GET',
                headers: headers,
            });

            if (response.ok) {
                const data = await response.json();
                setBulletins(data.posts || []);
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Failed to fetch bulletins');
                setBulletins([]);
            }
        } catch (error) {
            console.error('Error fetching bulletins:', error);
            Alert.alert('Error', 'Failed to fetch bulletins, please try again.');
            setBulletins([]);
        } finally {
            setLoading(false);
        }
    }, [user?.token]);

    useFocusEffect(
        React.useCallback(() => {
            //fetch official bulletins by default
            fetchBulletins(activeTab);
        }, [activeTab, fetchBulletins]) 
    );

    const handleTabChange = (tab: 'official' | 'member') => {
        if (tab === 'member' && !canViewMemberPosts) {
            Alert.alert('Access Denied', 'PLease log in to view member posts.');
            return;
        }
        setActiveTab(tab);
    };

    const renderBulletin = ({ item }: { item: Bulletin }) => {
        const settingsStyle = settings ? {
            fontSize : settings.fontSize || 16,
        }
        : {};

        return (
            <TouchableOpacity
                style={styles.bulletinItem}
                onPress={() => navigation.navigate('BulletinDetails', { bulletin: item })}
            >
                <Text style={[styles.bulletinTitle, settingsStyle]}>{item.title}</Text>
                <Text style={[styles.bulletinDate, settingsStyle]}>
                    {new Date(item.createdAt).toLocaleDateString('en-AU')}
                </Text>
                <Text style={[styles.bulletinType, settingsStyle]}>
                    {item.type === 'official' ? 'Official' : 'Member'}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderEmptyList = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
                {loading ? 'Loading bulletins...' : `No ${activeTab} bulletins available.`}
            </Text>
        </View>
    ); 

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                {/* Main header */}
                {/* <Text style={styles.title}>SeniorLearn</Text>  */}

                {/* Tabs for official and member bulletins */}
                {canViewMemberPosts && (
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'official' && styles.activeTab]}
                            onPress={() => handleTabChange('official')}
                        >
                            <Text style={[styles.tabText, activeTab === 'official' && styles.activeTabText]}>Official</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'member' && styles.activeTab]}
                            onPress={() => handleTabChange('member')}
                        >
                            <Text style={[styles.tabText, activeTab === 'member' && styles.activeTabText]}>Member</Text>
                        </TouchableOpacity>
                    </View>
                )} {/* End tabs container */}

                {/* Main content */}
                <View style={styles.bulletinsContainer}>
                    <Text style={styles.subtitle}>
                        {activeTab === 'official' ? 'Official Bulletins' : 'Member Bulletins'}
                    </Text>
                    <FlatList
                        data={bulletins} 
                        renderItem={renderBulletin}
                        keyExtractor={(item) => item._id} 
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={renderEmptyList}
                        refreshing={loading}
                        onRefresh={() => fetchBulletins(activeTab)}
                    />
                </View> {/* End bulletins container */}

                {/* Post btn for logged in users? */}
                {user && !isGuest && (
                    <TouchableOpacity
                        style={styles.postButton}
                        onPress={() => navigation.navigate('PostBulletin')}
                    >
                        <Text style={styles.postButtonText}>New Bulletin</Text>
                    </TouchableOpacity>
                )} 
            </View> {/* End main header */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // Main container
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

    // Bulletin container
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
    bulletinType: {
        fontSize: 16,
        color: '#6B8E23',
        fontWeight: '600',
        textTransform: 'capitalize',
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

    // Tabs
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#E0E4D7',
        borderRadius: 8,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    activeTab: {
        backgroundColor: '#A51589',
    },
    tabText: {
        fontSize: 16,
        color: '#031602',
    },
    activeTabText: {
        color: '#FAF9F6',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#898989',
        textAlign: 'center',
    },
    postButton: {
        backgroundColor: '#FD7F00',
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '95%', 
        alignSelf: 'center',
    },
    postButtonText: {
        color: '#FFFAFA',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    postBtnContainer: {
        padding: 20,
        width: '95%',
        alignSelf: 'center',
    }, 
});