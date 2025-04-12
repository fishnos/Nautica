import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Pressable, Modal, Alert } from 'react-native';
import { useState } from 'react';

export default function ImportScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: "white", padding: 60}}>
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
                style = {[styles.button, styles.buttonClose]}
                onPress = {() => setModalVisible(!modalVisible)}>
                <Text style = {styles.textStyle}>Back to tabs</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style = {[styles.button, styles.buttonOpen]}
          onPress = {() => setModalVisible(true)}>
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