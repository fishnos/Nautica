import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name = "home"
        options = {{
          headerShown: false,
          title: "Home",
        }}
      />
      <Tabs.Screen 
        name = "details"
        options = {{
          headerShown: false,
          title: "Details",
        }}
      />
      <Tabs.Screen 
        name = "profile"
        options = {{
          headerShown: false,
          title: "Profile",
        }}
      />
      <Tabs.Screen 
        name = "library"
        options = {{
          headerShown: false,
          title: "Library",
        }}
      />
      <Tabs.Screen 
        name = "book-store"
        options = {{
          headerShown: false,
          title: "Book Store",
        }}
      />
    </Tabs>
  );
}