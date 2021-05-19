import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, {useState} from 'react'
import { HomeNavigator } from './HomeNavigator';
import { ProfileNavigator } from './ProfileNavigator';
import { ChatNavigator } from './ChatNavigator';

const Tab = createBottomTabNavigator();

export const UserNavigator = ({navigation}) => {
    // if the user is actually logged in 
    // if not navigation.popToTop()
    return (
      
        <Tab.Navigator>
            <Tab.Screen name ="Home" 
            component={HomeNavigator}
            />
            <Tab.Screen name ="Profile" 
            component={ProfileNavigator}
            />
            <Tab.Screen name ="Chat" 
            component={ChatNavigator}
            />
        </Tab.Navigator>
    );
};
