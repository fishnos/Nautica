import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { viewDocument } from '@react-native-documents/viewer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import Colors from '@/constants/colors';
import { handleError } from '@/utilities/errorHandling';
import { DocumentPickerResponse, DirectoryPickerResponse, DirectoryPickerResponseLongTerm } from '@react-native-documents/picker';

export default function LibraryScreen() {
  const [results, _setResults] = React.useState<
    Array<DocumentPickerResponse[] | DirectoryPickerResponse | DirectoryPickerResponseLongTerm[]>
  >([]);
  
  const [bookmark, setBookmark] = React.useState<
    { fileName: string; bookmark: string } | undefined
  >();

  const fileButtons: JSX.Element[] = [];

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const storedBookmark = await AsyncStorage.getItem('bookmark');
        if (storedBookmark) {
          setBookmark(JSON.parse(storedBookmark));
        }
      } catch (error) {
        console.error('Failed to load bookmark:', error);
      }
    };
  
    fetchBookmark();
  }, []);

  function handleViewer() {
    const lastResults = results[0];

    if (
      lastResults &&
      Array.isArray(lastResults) &&
      lastResults.length > 0 &&
      lastResults[0]
    ) {
      const uriToOpen: string = lastResults[0].uri;
      viewDocument({ uri: uriToOpen }).catch(handleError);
    } else if (bookmark) {
      viewDocument({ bookmark: bookmark.bookmark }).catch(handleError);
    } else {
      console.warn('No URI found.', lastResults);
    }
  };

  function addFileButton(fileName: string) {
    fileButtons.push(
      <Pressable
        style = {[
          styles.button,
          styles.buttonOpen,
        ]}
        onPress = {handleViewer}
      >
        <Text style = {styles.textStyle}>{fileName}</Text>
      </Pressable>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style = {styles.container}>
        <ScrollView>
          <View style = {styles.container}>
            {fileButtons}
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

  textStyle: {
    color: Colors().ThemeColors().Light().TextColors().primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  library: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors().ThemeColors().Light().TextColors().primaryColor,
  },
});