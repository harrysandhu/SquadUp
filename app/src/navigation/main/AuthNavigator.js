import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"


import {ApolloProvider, useQuery, gql} from "@apollo/client"
import {apolloClient} from "apollo/apollo"

// main
import { MainScreen } from 'screens/main/MainScreen'
import { SignUpScreen } from 'screens/main/SignUpScreen'
import { LoginScreen } from 'screens/main/LoginScreen';
import { CompletionScreen } from 'screens/main/CompletionScreen';


//user
import { HomeScreen } from 'screens/user/HomeScreen'
import { UserNavigator } from '../user/UserNavigator';




// here
const Stack = createStackNavigator()

export function AuthNavigator(){

    //is the user logged in? 
    // if yeah - > go to UserNavigator
    // if no: 
    // let it be,... it'll open up main screen


    return (

        <NavigationContainer>

            {/*Main Screen stack*/}
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
                    name="UserNav" 
                    component={UserNavigator}
                    options={{
                        title: '',
                        headerLeft: null,
                        gestureEnabled: false,
                         headerTransparent: true
                        }}
                />

                


            </Stack.Navigator>
            

        </NavigationContainer>
    )
}