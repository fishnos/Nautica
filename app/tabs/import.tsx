import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable, Modal, Alert } from 'react-native';
import { pick, types, errorCodes, isErrorWithCode } from '@react-native-documents/picker'
import { useState } from 'react';

export default function ImportScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style = {{flex: 1, backgroundColor: "white", padding: 60}}>
        <Modal
          animationType = "slide"
          visible = {modalVisible}
          onRequestClose = {() => {
            setModalVisible(!modalVisible);
          }}
          presentationStyle = 'pageSheet'
        >
          <View style = {{flex: 1, backgroundColor: 'white', padding: 60}}>
            <View style = {styles.modalView}>
              <Text style = {styles.modalText}>Import:</Text>
              <Pressable
                style = {[
                  styles.button, 
                  styles.buttonClose,
                ]}
                onPress = {async () => {
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
                      }
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
                          //implement a telemtry log for errors here
                          console.error(err);
                      }
                    } else {
                      //implement a telemetry log for errors here
                    }
                  }
                }}
              >
                <Text style = {styles.textStyle}>Import from files</Text>
              </Pressable>
              <Pressable
                style = {[styles.button, 
                  styles.buttonClose, 
                  {top: 12},
                ]}
                onPress = {() => setModalVisible(!modalVisible)}>
                <Text style = {styles.textStyle}>Back to tabs</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style = {[styles.button, styles.buttonOpen]}
          onPress = {() => setModalVisible(!modalVisible)}>
          <Text style = {styles.textStyle}>Import here!</Text>
        </Pressable>
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
    backgroundColor: 'white',
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
    backgroundColor: 'dodgerblue',
  },
  buttonClose: {
    backgroundColor: 'dodgerblue',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});