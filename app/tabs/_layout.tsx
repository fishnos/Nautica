import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name = "index"
        options = {{
          headerShown: false,
        }}
      />
      <Tabs.Screen 
        name = "details"
        options = {{
          headerShown: false,
        }}
      />
      <Tabs.Screen 
        name = "profile"
        options = {{
          headerShown: false,
        }}
      />
      <Tabs.Screen 
        name = "library"
        options = {{
          headerShown: false,
        }}
      />
      <Tabs.Screen 
        name = "book-store"
        options = {{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}