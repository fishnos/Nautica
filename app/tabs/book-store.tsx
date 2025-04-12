import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function BookStoreScreen() {
    return (
        <SafeAreaProvider>
          <SafeAreaView style = {styles.container}>
            <View style = {styles.container}>
              <Text style = {styles.bookStore}>This is the book store!</Text>
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

  bookStore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'dodgerblue',
  },
});