import { Stack } from 'expo-router';

export default function TabsLayout() {
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
      <Stack.Screen name = "tabs" />
    </Stack>
  );
}