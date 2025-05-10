import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/colors';

export default function ProfileScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style = {styles.container}>
        <View style = {styles.container}>
          <Text style = {styles.profile}>This is your profile!</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  profile: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors().ThemeColors().Light().TextColors().primaryColor,
  },
});