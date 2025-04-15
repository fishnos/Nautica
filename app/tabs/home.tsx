import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
        <SafeAreaView style = {styles.container}>
            <View style = {styles.container}>
                <Text style = {styles.welcome}>Welcome!</Text>
                <Link href = "/modals/import-modal">
                    <Text style = {styles.about}>Go to import page</Text>
                </Link>
            </View>
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

  welcome: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'dodgerblue',
  },

  about: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: 'lightslategray',
  }
});