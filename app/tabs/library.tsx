import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/colors';
import { 
  DocumentPickerResponse, 
  DirectoryPickerResponse, 
  DirectoryPickerResponseLongTerm 
} from '@react-native-documents/picker';
import { useLibraryFunctions } from '../modals/import-modal';

export default function LibraryScreen() {
  const [results, _setResults] = React.useState<
    Array<DocumentPickerResponse[] | DirectoryPickerResponse | DirectoryPickerResponseLongTerm[]>
  >([]);
  
  const [bookmark, setBookmark] = React.useState<
    { fileName: string; bookmark: string } | undefined
  >();

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

  const { getFileButtons, handleImport, addFileButton } = useLibraryFunctions();

  return (
    <SafeAreaProvider>
      <SafeAreaView style = {styles.container}>
        <ScrollView>
          <View style = {styles.container}>
          <Text style = {styles.textHeader}>
              Files:
          </Text>
          {getFileButtons().length > 0 ? (
              getFileButtons().map(fileButton => fileButton)
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