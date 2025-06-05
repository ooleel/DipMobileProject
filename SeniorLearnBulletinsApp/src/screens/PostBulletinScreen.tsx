import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function PostBulletinScreen() {
    //const [value, onChangeText] = React.useState('Write your bulletin here...');

    //TODO: const handlePost = () => {

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
                        <Text style={styles.subtitle}>Post a new Bulletin</Text>

                        {/* TODO: add (radio) buttons for members/official bulletins*/}
                        
                        <View style={styles.postField}>
                            <Text style={styles.label}>Title</Text>
                            <TextInput
                                style={styles.input} 
                                placeholder="Your post title here" 
                            />
                        </View>
                        
                        <View style={styles.postField}>
                            <Text style={styles.label}>Content</Text>
                            <TextInput
                                editable
                                multiline
                                numberOfLines={5}
                                maxLength={256}
                                // onChangeText={text => onChangeText(text)}
                                // value={value}
                                placeholder="Write your bulletin here..."
                                placeholderTextColor="#898989"
                                style={styles.textInput}
                            />
                        </View>
                    </View>

                    {/* onPress={handlePost} */}
                    <View style={styles.postBtnContainer}>
                        <TouchableOpacity style={styles.postButton}>
                            <Text style={styles.postButtonText}>Post</Text>
                        </TouchableOpacity>
                    </View> {/* End post button container */}
                </View> {/* End main container */}
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
    }
 });
