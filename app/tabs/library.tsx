import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/colors';
import { 
  DocumentPickerResponse, 
  DirectoryPickerResponse, 
  DirectoryPickerResponseLongTerm,
  errorCodes,
  isErrorWithCode,
  pick,
  types
} from '@react-native-documents/picker';
import { handleError } from '@/utilities/errorHandling';
import { viewDocument } from '@react-native-documents/viewer';
import useLibraryFunctions from '@/utilities/useLibraryFunctions';

export default function LibraryScreen() {
  const { fileButtonsState } = useLibraryFunctions();

  return (
    <SafeAreaProvider>
      <SafeAreaView style = {styles.container}>
        <ScrollView>
          <View style = {styles.container}>
          <Text style = {styles.textHeader}>
              Files:
          </Text>
          {fileButtonsState.length > 0 ? (
              fileButtonsState.map(fileButton => (
                <React.Fragment key = {fileButton.key}>
                  {fileButton}
                </React.Fragment>
              ))
            ) : (
              <Text style = {styles.textStyle}>
                No files found...
              </Text>
            )
          }
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    borderRadius: 9,
    elevation: 2,
    width: 360,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonOpen: {
    backgroundColor: Colors().ThemeColors().Light().WidgetBackgroundColor(),
  },

  buttonClose: {
    backgroundColor: Colors().ThemeColors().Light().WidgetBackgroundColor(),
  },

  fileButton: {
    borderRadius: 9,
    elevation: 2,
    width: 360,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  textStyle: {
    color: Colors().ThemeColors().Light().TextColors().primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },

  textHeader: {
    color: Colors().ThemeColors().Light().TextColors().primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },

  library: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors().ThemeColors().Light().TextColors().primaryColor,
  },
});