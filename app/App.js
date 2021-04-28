import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"


// this is the demo main screen
// will be moved to a different file
function MainScreen({navigation}){
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Main screen</Text>
            <Button 
                title="Sign Up" 
                onPress={() => navigation.navigate('SignUp')}/>
        </View>
    );
}

// this is the demo signup screen
// will be moved to a different file
function SignUpScreen({navigation}){
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Sign Up bro</Text>
            <Button 
                title="Go back" 
                onPress={() => navigation.goBack()} />
        </View>
    );
}


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