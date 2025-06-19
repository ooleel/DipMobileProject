import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: any;
    settings?: any;
    user?: any;
}

const API_BASE_URL = 'http://localhost:3000'; 

export default function PostBulletinScreen({ navigation, settings, user }: Props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [bulletinType, setBulletinType] = useState<'member' | 'official'>('member'); 
    const [isSubmitting, setIsSubmitting] = useState(false);

    //Can user post an official bulletin? → if admin
    const canPostOfficial = user?.role === 'admin';

    const handlePost = async () => {
        //validation
        if (!title.trim() || !content.trim()) {
            Alert.alert('Error', 'Title cannot be empty.');
            return;
        }
        if (!content.trim()) {
            Alert.alert('Error', 'Please enter some content for your bulletin.');
            return;
        }
        if (bulletinType === 'official' && !canPostOfficial) {
            Alert.alert('Error', 'You do not have permission to post official bulletins, admin only.');
            return;
        }
        if (!user?.token) {
            Alert.alert('Error', 'You must be logged in to post a bulletin.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_BASE_URL}/createpost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.token,
                },
                body: JSON.stringify({
                    createdBy: user.id || user._id,
                    title: title.trim(),
                    content: content.trim(),
                    type: bulletinType, 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert(
                    'Success', 'Your bulletin has been posted successfully!',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                setTitle('');
                                setContent('');
                                setBulletinType('member'); 
                                navigation.navigate('BulletinsList');
                            }
                        }
                    ]
                );
            } else {
                Alert.alert('Error', data.message || 'Failed to post bulletin. Please try again.');
            }
        } catch (error) {
            console.error('Error posting bulletin:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTypeChange = (type: 'member' | 'official') => {
        if (type === 'official' && !canPostOfficial) {
            Alert.alert('Access denied', 'You do not have permission to post official bulletins, admin only.');
            return;
        }
        setBulletinType(type);
    };

    const settingsStyle = settings ? {
        fontSize: settings.fontSize || 16,
    } : {};

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.wrapper}>
                    {/* Main header */}
                    {/* <Text style={styles.title}>SeniorLearn</Text> */}

                    {/* Main content */}
                    <View style={styles.postContainer}>
                        <Text style={styles.subtitle}>Post a new Bulletin</Text>

                        {/* Bulletin type */}
                        <View style={styles.typeContainer}>
                            <Text style={[styles.label, settingsStyle]}>Bulletin Type</Text>

                            {/* member type */}
                            <View style={styles.radioContainer}>
                                <TouchableOpacity
                                    style={styles.radioButton}
                                    onPress={() => handleTypeChange('member')}
                                >
                                    <View style={[styles.radioCircle, bulletinType === 'member' && styles.radioSelected]}>
                                        {bulletinType === 'member' && <View style={styles.selectedDot} />}
                                    </View>
                                    <Text style={[styles.radioText, settingsStyle]}>Member Bulletin</Text>
                                </TouchableOpacity>
                            </View> {/* end member type */}

                            {/* official type */}
                            <View style={styles.radioContainer}>
                                <TouchableOpacity
                                    style={styles.radioButton}
                                    onPress={() => handleTypeChange('official')}
                                >
                                    <View style={[styles.radioCircle, bulletinType === 'official' && styles.radioSelected]}>
                                        {bulletinType === 'official' && <View style={styles.selectedDot} />}
                                    </View>
                                    <Text style={[styles.radioText, settingsStyle, canPostOfficial && styles.radioTextDisabled]}>Official Bulletin {!canPostOfficial && '(Admin only)'}</Text>
                                </TouchableOpacity>
                            </View> {/* end official type */}
                        </View> {/* end bulletin type container */}

                        {/* Bulletin fields */}
                        <View style={styles.postField}>
                            <Text style={[styles.label, settingsStyle]}>Title</Text>
                            <TextInput
                                style={[styles.input, settingsStyle]} 
                                placeholder="Your bulletin title here" 
                                value={title}
                                onChangeText={setTitle}
                                maxLength={100}
                                editable={!isSubmitting}
                            />
                        </View>
                        
                        <View style={styles.postField}>
                            <Text style={[styles.label, settingsStyle]}>Content</Text>
                            <TextInput
                                editable={!isSubmitting}
                                multiline
                                numberOfLines={6}
                                maxLength={1000}
                                value={content}
                                onChangeText={setContent}
                                placeholder="Write your bulletin here..."
                                placeholderTextColor="#898989"
                                style={[styles.textInput, settingsStyle]}
                                textAlignVertical='top'
                            />
                            <Text style={styles.characterCount}>{content.length}/1000 characters</Text>
                        </View>
                    </View>

                    {/* Post button */}
                    <View style={styles.postBtnContainer}>
                        <TouchableOpacity 
                            style={[styles.postButton, isSubmitting && styles.postButtonDisabled]}
                            onPress={handlePost}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.postButtonText}>
                                {isSubmitting ? 'Posting...' : 'Post Bulletin'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={() => navigation.goBack()}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View> {/* End post button container */}
                </View> {/* End main container */}
            </ScrollView>
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
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

    // Post container
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
    input: {
        height: 44,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 16,
        paddingHorizontal: 10,
        color: '#898989',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#898989',
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    characterCount: {
        textAlign: 'right',
        fontSize: 12,
        color: '#898989',
        marginTop: 4,
    },

    // Type container
    typeContainer: {
        marginBottom: 20,
    },
    radioContainer: {
        gap: 12,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#A51589',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioSelected: {
        borderColor: '#A51589',
        backgroundColor: '#A51589',
    },
    selectedDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FFFAFA',
    },
    radioText: {
        fontSize: 16,
        color: '#031602',
        fontWeight: '500',
    },
    radioTextDisabled: {
        color: '#898989',
        fontStyle: 'italic',
    },

    // Post btn
    postBtnContainer: {
        padding: 20,
        width: '95%',
    },
    postButton: {
        backgroundColor: '#FD7F00', 
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    postButtonText: {
        color: '#FFFAFA', 
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    postButtonDisabled: {
        backgroundColor: '#ccc',
    },
    cancelBtn: {
        backgroundColor: '#A51589',
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cancelButtonText: {
        color: '#FFFAFA',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    }
 });
