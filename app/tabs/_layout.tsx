import { router, Stack, Tabs, useNavigation } from 'expo-router';
import React from 'react';
import TabBar from '@/components/TabBar';
import { createStaticNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ImportModal from '../modals/import-modal';
import BookStoreScreen from './book-store';
import HomeScreen from './home';
import LibraryScreen from './library';
import ProfileScreen from './profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function TabsLayout() {
  // const StackNavigations = createStackNavigator({
  //   screens: {
  //     home: HomeScreen,
  //     profile: ProfileScreen,
  //     import: ImportModal,
  //     library: LibraryScreen,
  //     bookStore: BookStoreScreen,
  //   },
  // });
  
  // const TabBar = createBottomTabNavigator();
  // const navigation = useNavigation();

  return (
    // <TabBar.Navigator>
    //     <TabBar.Screen name = 'Profile' component={ProfileScreen}/>
    //     <TabBar.Screen name = 'Home' component={HomeScreen}/>
    //     <TabBar.Screen name = 'Import' component={ImportModal}/>
    // </TabBar.Navigator>
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
            router.push('/modals/import-modal');
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