// stack navigator
// also drawer

import React, {useState} from 'react'
import { HomeScreen } from 'screens/user/HomeScreen'
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

export const HomeNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomePage" component={HomeScreen}></Stack.Screen>
        </Stack.Navigator>
    );
}