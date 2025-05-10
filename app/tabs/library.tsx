import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleSheet, Text, View } from 'react-native';
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

  useEffect(() => {
    console.log(JSON.stringify(results, null, 2))
  }, [results]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style = {styles.container}>
        <View style = {styles.container}>
        <Button
          title = "View a file that was previously opened:"
          onPress = {() => {
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
          }}
        />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  library: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors().ThemeColors().Light().TextColors().primaryColor,
  },
});