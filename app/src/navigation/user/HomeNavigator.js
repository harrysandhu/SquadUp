// stack navigator
// also drawer

import React, {useState} from 'react'
import { HomeScreen } from 'screens/user/HomeScreen'
import { createStackNavigator } from "@react-navigation/stack"
import { CreateTeamScreen } from '../../screens/teams/CreateTeamScreen'
import { TeamScreen } from '../../screens/user/TeamScreen'
import { HomePage } from '../../screens/user/HomePage'

const Stack = createStackNavigator()

export const HomeNavigator = ({navigation}) => {
    return (
        <Stack.Navigator>
          <Stack.Screen 
              name="HomeScreen" 
              component={HomePage}
              options={{
                title: '',
                headerLeft: null,
                gestureEnabled: false,
                  headerTransparent: true
              }}
          />

<Stack.Screen 
                    name="CreateTeam" 
                    component={CreateTeamScreen}
                    options={{
                        title: '',
                        headerLeft: null,
                        gestureEnabled: false,
                         headerTransparent: true
                        }}
                />

<Stack.Screen 
                    name="JoinTeam" 
                    component={TeamScreen}
                    options={{
                        title: '',
                        headerLeft: null,
                        gestureEnabled: false,
                         headerTransparent: true
                        }}
                />
        </Stack.Navigator>
    );
}