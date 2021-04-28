import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { MainScreen } from './screens/main/MainScreen'
import { SignUpScreen } from './screens/main/SignUpScreen'



// here
const Stack = createStackNavigator()

// App component always stays here
export default function App(){
    return (
        <NavigationContainer>
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
                            title: 'Sign Up',
                            headerTransparent: true
                            }}
                />
                                  
              
            </Stack.Navigator>
        </NavigationContainer>
    )
}






/**
 * 
 * Notes:
 * - Conventions:
 * * - capitalize route names
 * * screen names should be - <Name>Screen
 */