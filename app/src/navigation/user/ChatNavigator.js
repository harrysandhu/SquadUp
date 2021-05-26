
import React, {useState} from 'react'
import { ChatScreen } from 'screens/user/ChatScreen'
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

export const ChatNavigator = ({navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ChatScreen" 
                component={ChatScreen} 
                options={{
                    title: '',
                    headerLeft: null,
                    gestureEnabled: false,
                    headerTransparent: true
                }}
            />
        </Stack.Navigator>
    );
}