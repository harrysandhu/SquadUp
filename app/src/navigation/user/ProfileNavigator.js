// stack 

import React, {useState} from 'react'
import { ProfileScreen } from 'screens/user/ProfileScreen'
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

export const ProfileNavigator = ({route, navigation}) => {
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
        </Stack.Navigator>
    );
}