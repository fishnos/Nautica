import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function ImportScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style = {styles.container}>
        <View style={styles.container}>
          <Text></Text>
          <Text style = {styles.import}>This is the import page! Make your first import:</Text>
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

  import: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'dodgerblue',
  },
});