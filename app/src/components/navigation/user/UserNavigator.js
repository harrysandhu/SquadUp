import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from '../../../../screens/main/HomeScreen';

export function UserNavigator({navigation}){
    // if the user is actually logged in 
    // if not navigation.popToTop()

    const Tab = createBottomTabNavigator();

    return (
        <Tab.navigation>
            <Tab.screen
                component={HomeNavigator}
            />
            <Tab.screen
                component={ChatNavigator}
            />
            <Tab.screen
                component={SearchNavigator}
            />
            <Tab.screen
                component={ProfileNavigator}
            />
        </Tab.navigation>
    )
}