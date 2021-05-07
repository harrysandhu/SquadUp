import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { MainScreen } from './src/screens/main/MainScreen'
import { SignUpScreen } from './src/screens/main/SignUpScreen'
import { LoginScreen } from './src/screens/main/LoginScreen';
import { CompletionScreen } from './src/screens/main/CompletionScreen';

import {ApolloProvider, useQuery, gql} from "@apollo/client"
import {apolloClient} from "./apollo"
import { BackArrow } from './src/components/styled/components'
import Icon from 'react-native-vector-icons/FontAwesome'
import { HomeScreen } from './src/screens/main/HomeScreen'




// here
const Stack = createStackNavigator()

// App component always stays here
export default function App(){
    return (
        <ApolloProvider client={apolloClient}>
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
              
            </Stack.Navigator>
        </NavigationContainer>
     
        </ApolloProvider>
    )
}






/**
 * 
 * Notes:
 * - Conventions:
 * * - capitalize route names
 * * screen names should be - <Name>Screen
 */