import ImportModal from '@/app/modals/import-modal';
import BookStoreScreen from '@/app/tabs/book-store';
import HomeScreen from '@/app/tabs/home';
import LibraryScreen from '@/app/tabs/library';
import ProfileScreen from '@/app/tabs/profile';
import { createStaticNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// export const StackNavigations = createStackNavigator({
//   screens: {
//     home: HomeScreen,
//     profile: ProfileScreen,
//     import: ImportModal,
//     library: LibraryScreen,
//     bookStore: BookStoreScreen,
//   },
// });

// export const Navigation = createStaticNavigation(StackNavigations);