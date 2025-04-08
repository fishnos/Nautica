import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions = {{
        headerStyle: {
          backgroundColor: 'dodgerblue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name = "tabs"/>
      <Stack.Screen name = "home"/>
    </Stack>
  );
}