import { createStackNavigator } from '@react-navigation/stack';
import ImportModal from '@/app/modals/import-modal';
import HomeScreen from '@/app/tabs/home';

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Home" component = {HomeScreen} />
            <Stack.Screen name = "Import" component={ImportModal} />
        </Stack.Navigator>
    );
}