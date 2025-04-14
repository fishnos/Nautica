import { router, Tabs } from 'expo-router';
import { Image } from 'react-native';
import React from 'react';
import TabBar from '@/components/TabBar';

export default function TabsLayout() {
  return (
    <Tabs tabBar = {props => <TabBar {...props} />}>
      <Tabs.Screen 
        name = "home"
        options = {{
          headerShown: false,
          title: "Home",
        }}
      />
      <Tabs.Screen 
        name = "import"
        options = {{
          headerShown: false,
          title: "Import",
        }}
        listeners = {{
          tabPress: (e: any) => {
            e.preventDefault();
            router.push("/modals/import-modal");
          }
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
          title: "Store",
        }}
      />
    </Tabs>
  );
}