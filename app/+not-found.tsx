import { Link, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import React from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options = {{ title: "Oops! This screen doesn't exist." }} />
      <View style = {styles.container}>
        <Link href = "/tabs/home">Go to home screen</Link>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  homeScreen: {
    fontSize: 40,
    fontWeight: 'semibold',
    color: 'lightslategray',
  },
});
