// stack navigator
// also drawer

import React, {useState} from 'react'
import { HomeScreen } from 'screens/user/HomeScreen'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

export const ChatNavigator = () => {
    return (
        <Text>Chat</Text>
    );
}