import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { MainScreen } from '../screens/main/MainScreen'
import { SignUpScreen } from '../screens/main/SignUpScreen'
import { LoginScreen } from '../screens/main/LoginScreen';
import { CompletionScreen } from '../screens/main/CompletionScreen';

import { BackArrow } from '../components/styled/components'
import Icon from 'react-native-vector-icons/FontAwesome'
import { HomeScreen } from '../screens/main/HomeScreen'




export const AuthNavigator = () =>{ 
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator>
            {/*Main Screen stack*/}
            <Stack.Screen 
                name="Main" 
                component={MainScreen}
                options={{ 
                        title: '',
                        headerTransparent: true
                        }}
            />
            {/*Sign Up Screen stack*/}
            <Stack.Screen 
                name="SignUp" 
                component={SignUpScreen}
                options={{
                        title: '',
                        headerLeft: () => (
                            <View></View>
                        ),
                        headerTransparent: true
                        }}
            />
            {/*Login Screen stack*/}
            <Stack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{
                    title: '',
                    headerLeft: () => (
                        <View></View>
                    ),
                    headerTransparent: true
                    }}
            />
            {/*Profile Completion Screen stack*/}
            <Stack.Screen 
                name="Completion" 
                component={CompletionScreen}
                options={{
                    title: '',
                    headerLeft: null,
                    gestureEnabled: false,
                    headerTransparent: true
                    }}
            />

            <Stack.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                    title: '',
                    headerLeft: null,
                    gestureEnabled: false,
                    headerTransparent: true
                    }}
            />
             <Stack.Screen 
                name="UserNavigator" 
                component={UserNavigator}
                options={{
                    title: '',
                    headerLeft: null,
                    gestureEnabled: false,
                    headerTransparent: true
                    }}
            />

</Stack.Navigator>

    )

}
