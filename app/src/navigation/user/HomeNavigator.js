// stack navigator
// also drawer

import React, {useState} from 'react'
import { HomeScreen } from 'screens/user/HomeScreen'
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

export const HomeNavigator = ({navigation}) => {
    return (
        <Stack.Navigator>
          <Stack.Screen 
              name="HomeScreen" 
              component={HomeScreen}
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