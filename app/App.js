import React, {useState} from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import {ApolloProvider} from "@apollo/client"
import {apolloClient} from "apollo/apollo"
import { AuthNavigator } from 'navigation/main/AuthNavigator';



// here
const Stack = createStackNavigator()

// App component always stays here
export default function App(){
    return (
        <ApolloProvider client={apolloClient}>
                <AuthNavigator /> 
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

// navigation 