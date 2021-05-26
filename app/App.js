import React, {useState, useEffect} from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import {ApolloProvider} from "@apollo/client"
import {apolloClient} from "apollo/apollo"
import { AuthNavigator } from 'navigation/main/AuthNavigator';
import { UserNavigator } from './src/navigation/user/UserNavigator';
import { Alert } from 'react-native'
import AppController from './src/controllers/AppController'
import { View } from 'react-native'
import { Text } from 'react-native'



// here
const Stack = createStackNavigator()

// App component always stays here
export default function App(){
    const [isLoading, setIsLoading] = useState(true)

    async function load(){
        try{
            await AppController.load()
            setIsLoading(false)
        }catch (error) {
            Alert.alert("Something went wrong", error.message, [
                {
                    text: "Retry",
                    onPress: () => load(),
                },
            ]);
        }
    }

    useEffect(() => {
        load()
    }, [])

    return (
        isLoading ? ( 
             <View style={{flex: 1}}>
                 <Text>loading</Text>
             </View>
             ) : ( 
                  <ApolloProvider client={apolloClient}>
                     <AuthNavigator /> 
                 </ApolloProvider> 
             )
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