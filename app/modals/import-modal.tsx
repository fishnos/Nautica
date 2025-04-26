import Colors from '@/constants/colors';
import { pick, types, isErrorWithCode, errorCodes } from '@react-native-documents/picker';
import { router, Stack, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Modal, View, Pressable, Alert, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function ImportModal() {
    const [modalVisible, setModalVisible] = useState(false);
    // const navigation = useNavigation();

    const handleImport = async () => {
        try {
            const [result] = await pick({
                mode: 'open',
                requestLongTermAccess: true,
                type: [types.pdf, types.docx],
                allowMultiSelection: false,
                presentationStyle: 'pageSheet',
            });
            if (result.bookmarkStatus === 'success') {
                const bookmarkToStore = {
                    fileName: result.name ?? 'unknown name',
                    bookmark: result.bookmark,
                };
                localStorage.set('bookmark', JSON.stringify(bookmarkToStore));
            } else {
                console.error(result);
            }
            console.log(result);
        } catch (err) {
            if (isErrorWithCode(err)) {
                switch (err.code) {
                    case errorCodes.IN_PROGRESS:
                        console.warn('Attempted to present a picker, but a previous one was already presented.');
                        break;
                    case errorCodes.UNABLE_TO_OPEN_FILE_TYPE:
                        Alert.alert('File type error', 'Unable to open file type.');
                        break;
                    case errorCodes.OPERATION_CANCELED:
                        break;
                    default:
                        console.error(err);
                }
            } else {
                console.error(err);
            }
        }
    };

    return (
        <SafeAreaProvider>
            <Stack.Screen
                name = 'Import:'
                options = {{
                    presentation: 'formSheet',
                    animation: 'slide_from_bottom',
                    title: 'Import Data',
                    headerShown: false,
                }}
            />
            <SafeAreaView style = {{ flex: 1, backgroundColor: "white", padding: 60 }}>
                <View style = {styles.modalView}>
                    <Text style = {styles.modalText}>Import:</Text>
                    <Pressable
                        style = {[styles.button, styles.buttonClose]}
                        onPress = {handleImport}
                    >
                        <Text style={styles.textStyle}>Import from files</Text>
                    </Pressable>
                    <Pressable
                        style = {[
                          styles.button, 
                          styles.buttonClose, 
                          { top: 12 }
                        ]}
                        onPress = {() => router.dismiss(3)}
                    >
                        <Text style = {styles.textStyle}>Back to tabs</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    modalView: {
        margin: 20,
        backgroundColor: Colors().ThemeColors().Light().BackgroundColor(),
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },

    buttonOpen: {
        backgroundColor: Colors().ThemeColors().Light().WidgetBackgroundColor(),
    },

    buttonClose: {
        backgroundColor: Colors().ThemeColors().Light().WidgetBackgroundColor(),
    },

    textStyle: {
        color: Colors().ThemeColors().Light().TextColors().primaryColor,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});