import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { HomeNavigator } from './HomeNavigator';
import { ProfileNavigator } from './ProfileNavigator';
import { ChatNavigator } from './ChatNavigator';

const Tab = createBottomTabNavigator();

export const UserNavigator = ({navigation}) => {
    // if the user is actually logged in 
    // if not navigation.popToTop()
    return (
      
        <Tab.Navigator
            tabBarOptions={{
                style:{
                    backgroundColor: '#00001a'
                }
            }}
        >

            <Tab.Screen 
            name ="Home" 
            component={HomeNavigator}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: () => <Icon name="home" color="white" size={24} />,
                
              }}

            />

            <Tab.Screen 
            name ="Profile" 
            component={ProfileNavigator}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: () => <Icon name="user-circle" color="white" size={24} />,
              }}
            />
            
      
        </Tab.Navigator>
    );
};
