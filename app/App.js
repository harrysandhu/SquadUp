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
import { AuthNavigator } from './src/components/navigation/AuthNavigator';



// here
const Stack = createStackNavigator()

// App component always stays here
export default function App(){
    return (
        <ApolloProvider client={apolloClient}>
            <NavigationContainer>
                <AuthNavigator /> 
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