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
import Colors from '@/constants/colors';

export default function TabBar({ state, descriptors, navigation }: { state: any; descriptors: any; navigation: any }) {
  // TODO: fully implement this hook instead of using the constants theme file
  // const { colors } = useTheme(); 
  
  const { buildHref } = useLinkBuilder();

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
        const iconColor = isFocused ? Colors().ThemeColors().Light().TextColors().primaryColor : Colors().ThemeColors().Light().TextColors().secondaryColor;

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
            style = {[
              styles.importIcon,
              {backgroundColor: route.name === "import" ? Colors().ThemeColors().Light().TextColors().primaryColor : "transparent"}
            ]}
            href = {buildHref(route.name, route.params)}
            accessibilityState = {isFocused ? { selected: true } : {}}
            accessibilityLabel = {options.tabBarAccessibilityLabel}
            testID = {options.tabBarButtonTestID}
            onPress = {onPress}
            onLongPress = {onLongPress}
          >
            {getIcon(route.name, iconColor)}
            {route.name !== "import" && <Text style = {[
              styles.barItemFocused,
              {color: isFocused ? Colors().ThemeColors().Light().TextColors().primaryColor : Colors().ThemeColors().Light().TextColors().secondaryColor},
            ]}>{label}</Text>}
          </PlatformPressable>
        );
      })}
    </View>
  );

  function getIcon(routeName: string, color: string) {
    switch(routeName) {
      case "home":
        return <Feather name = "home" size = {24} color = {color}/>
      case "import":
        return <Feather name = "plus" size = {30} color = {Colors().ThemeColors().Light().BackgroundColor()}/>
      case "profile":
        return <AntDesign name = "user" size = {24} color = {color}/>
      case "library":
        return <MaterialIcons name = "library-books" size = {24} color = {color}/>
      case "book-store":
        return <Feather name = "book" size = {24} color = {color}/>
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
    backgroundColor: Colors().ThemeColors().Light().BackgroundColor(),
    marginHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 25,
    borderCurve: 'continuous',
  },

  barItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 10,
    borderColor: Colors().ThemeColors().Light().BackgroundColor(),
    paddingVertical: 0,
    paddingHorizontal: 0,
  },

  barItemFocused: {
    flexDirection: 'column',
    fontWeight: 'bold',
  },

  importIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 15,
    borderColor: Colors().ThemeColors().Light().BackgroundColor(),
    paddingVertical: 15,
    paddingHorizontal: 0,
  }
});