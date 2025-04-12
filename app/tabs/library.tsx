import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function LibraryScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style = {styles.container}>
        <View style = {styles.container}>
          <Text style = {styles.library}>This is the library!</Text>
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
    color: 'dodgerblue',
  },
});