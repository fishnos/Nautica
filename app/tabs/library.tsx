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

export function useLibraryFunctions() {
  const [results, _setResults] = React.useState<
      Array<DocumentPickerResponse[] | DirectoryPickerResponse | DirectoryPickerResponseLongTerm[]>
  >([]);
  
  const [bookmark, setBookmark] = React.useState<
      { fileName: string; bookmark: string } | undefined
  >();

  const [fileButtonsState, setFileButtons] = useState<JSX.Element[]>([]);

  useEffect(() => {
      console.log(fileButtonsState);
  }, [fileButtonsState]);

  //TODO: please make an actual key system at one point
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
              AsyncStorage.setItem('bookmark', JSON.stringify(bookmarkToStore));
              addFileButton(bookmarkToStore.fileName, result.uri);
          } else {
              console.error(result);
          }
          // console.log(result);
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

  // function handleViewer() {
  //     const lastResults = results[0];
  
  //     if (
  //         lastResults &&
  //         Array.isArray(lastResults) &&
  //         lastResults.length > 0 &&
  //         lastResults[0]
  //     ) {
  //         const uriToOpen: string = lastResults[0].uri;
  //         viewDocument({ uri: uriToOpen }).catch(handleError);
  //     } else if (bookmark) {
  //         viewDocument({ bookmark: bookmark.bookmark }).catch(handleError);
  //     } else {
  //         console.warn('No URI found.', lastResults);
  //     }
  // };
  
  function addFileButton(fileName: string, uri: string) {
      const handleButtonPress = () => {
          viewDocument({ uri: uri }).catch(handleError);
      };

      const newFileButton = (
          <Pressable
              style = {[
                  styles.fileButton,
                  styles.buttonOpen,
              ]}
              onPress = {handleButtonPress}
              key = {fileName}
          >
              <Text style = {styles.textStyle}>{fileName}</Text>
          </Pressable>
      );

      setFileButtons(prevFileButtons => {
          const newFileButtons = [...prevFileButtons, newFileButton];
          return newFileButtons;
      });
  }

  return { handleImport, addFileButton, fileButtonsState };
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