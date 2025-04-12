import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name = "home"
        options = {{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ }) => (
            <>
              <Image source = {require('@/assets/icons/home.png')}/>
            </>
          )
        }}
      />
      <Tabs.Screen 
        name = "import"
        options = {{
          headerShown: false,
          title: "Import",
          tabBarIcon: ({ }) => (
            <>
              <Image source = {require('@/assets/icons/import.png')}/>
            </>
          )
        }}
      />
      <Tabs.Screen 
        name = "profile"
        options = {{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ }) => (
            <>
              <Image source = {require('@/assets/icons/profile.png')}/>
            </>
          )
        }}
      />
      <Tabs.Screen 
        name = "library"
        options = {{
          headerShown: false,
          title: "Library",
          //need to add animations from closed to open here
          tabBarIcon: ({ }) => (
            <>
              <Image source = {require('@/assets/icons/open-library.png')}/>
            </>
          )
        }}
      />
      <Tabs.Screen 
        name = "book-store"
        options = {{
          headerShown: false,
          title: "Book Store",
          tabBarIcon: ({ }) => (
            <>
              <Image source = {require('@/assets/icons/archive.png')}/>
            </>
          )
        }}
      />
    </Tabs>
  );
}