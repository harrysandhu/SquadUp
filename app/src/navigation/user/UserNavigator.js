import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, {useState} from 'react'
import { HomeNavigator } from './HomeNavigator';
import { ProfileNavigator } from './ProfileNavigator';

const Tab = createBottomTabNavigator();

export const UserNavigator = ({navigation}) => {
    // if the user is actually logged in 
    // if not navigation.popToTop()
    return (
      
        <Tab.Navigator>
            <Tab.Screen name ="HomeTab" 
            component={HomeNavigator}
        
                />
            <Tab.Screen name ="ProfileTab" 
            component={ProfileNavigator}
            />
        </Tab.Navigator>
    );
};
