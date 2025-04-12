import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function DetailsScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style = {styles.container}>
        <View style={styles.container}>
          <Text></Text>
          <Text style = {styles.details1}>About me:</Text>
            <Link href = "https://github.com/fishnos">
                <Text style = {styles.details2}>Support me on Github</Text>
            </Link>
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

  details1: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'dodgerblue',
  },

  details2: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: 'lightslategray',
  }
});