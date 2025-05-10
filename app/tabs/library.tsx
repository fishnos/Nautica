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
import { handleError } from '@/utilities/errorHandling';
import { viewDocument } from '@react-native-documents/viewer';

export const fileButtons: JSX.Element[] = [];

export default function LibraryScreen() {
  const [results, _setResults] = React.useState<
    Array<DocumentPickerResponse[] | DirectoryPickerResponse | DirectoryPickerResponseLongTerm[]>
  >([]);
  
  const [bookmark, setBookmark] = React.useState<
    { fileName: string; bookmark: string } | undefined
  >();

  // const [fileButtons, setFileButtons] = React.useState<
  //   JSX.Element[]
  // >([]);

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

  return (
    <SafeAreaProvider>
      <SafeAreaView style = {styles.container}>
        <ScrollView>
          <View style = {styles.container}>
            <Text style = {styles.textHeader}>
              Files:
            </Text>
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