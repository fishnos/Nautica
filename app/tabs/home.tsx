import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style = {styles.container}>
      <Text style = {styles.welcome}>Welcome!</Text>
      <Link href = "/tabs/details">
        <Text style = {styles.about}>Go to about page</Text>
      </Link>
    </View>
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