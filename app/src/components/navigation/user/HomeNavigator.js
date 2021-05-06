// stack navigator
// also drawer

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { UserNavigator } from './UserNavigator';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={UserNavigator} />
        </Drawer.Navigator>
    );
}