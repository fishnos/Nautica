import { View, Platform, StyleSheet } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign'
import ProfileScreen from '@/app/tabs/profile';
import HomeScreen from '@/app/tabs/home';
import ImportScreen from '@/app/tabs/import';
import LibraryScreen from '@/app/tabs/library';
import BookStoreScreen from '@/app/tabs/book-store';

export default function TabBar({ state, descriptors, navigation }: { state: any; descriptors: any; navigation: any }) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  // const icons = {
  //   home: (props: any) => <Feather name = "home" size = {24} {...props}/>,
  //   import: (props: any) => <MaterialIcons name = "library-add" size = {24} {...props}/>,
  //   profile: (props: any) => <AntDesign name = "user" size = {24} {...props}/>,
  //   library: (props: any) => <MaterialIcons name = "library-books" size = {24} {...props}/>,
  //   bookStore: (props: any) => <Feather name = "book" size = {24} {...props}/>,
  // }

  return (
    <View style = {styles.bar}>
      {state.routes.map((route: { key: string | number; name: string; params: object | undefined; }, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key = {route.key}
            style = {styles.barItem}
            href = {buildHref(route.name, route.params)}
            accessibilityState = {isFocused ? { selected: true } : {}}
            accessibilityLabel = {options.tabBarAccessibilityLabel}
            testID = {options.tabBarButtonTestID}
            onPress = {onPress}
            onLongPress = {onLongPress}
          >
            {getIcon(route.name)}
            <Text style = {{ color: isFocused ? colors.primary : colors.text }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );

  function getIcon(routeName: string) {
    switch(routeName) {
      case "home":
        return <Feather name = "home" size = {24}/>
      case "import":
        return <MaterialIcons name = "library-add" size = {24}/>
      case "profile":
        return <AntDesign name = "user" size = {24}/>
      case "library":
        return <MaterialIcons name = "library-books" size = {24}/>
      case "book-store":
        return <Feather name = "book" size = {24}/>
    }
  }
}

const Tabs = createBottomTabNavigator({
  tabBar: (props) => <TabBar {...props} />,
  screens: {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Import: ImportScreen,
    Library: LibraryScreen,
    BookStore: BookStoreScreen,
  },
});

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 18,
    borderCurve: 'continuous',
  },

  barItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});