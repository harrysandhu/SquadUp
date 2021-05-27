
import React, {useState} from 'react'
import { ProfileScreen } from 'screens/user/ProfileScreen'
import { createStackNavigator } from "@react-navigation/stack"
import { GameSelectionScreen } from '../../screens/user/GameSelectionScreen'

const Stack = createStackNavigator()

export const ProfileNavigator = ({navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ProfileScreen" 
                component={ProfileScreen} 
                options={{
                    title: '',
                    headerLeft: null,
                    gestureEnabled: false,
                    headerTransparent: true
                }}
            />

<Stack.Screen 
                name="GameSelection" 
                component={GameSelectionScreen} 
                options={{
                    title: '',
                    headerLeft: null,
                    gestureEnabled: false,
                    headerTransparent: true
                }}
            />
        </Stack.Navigator>
    );
}