
export function AuthNavigator(){

    //is the user logged in? 
    // if yeah - > go to UserNavigator
    // if no: 
    // let it be,... it'll open up main screen

    let Stack = createStackNavigator

    return (

        <NavigationContainer>

            {/*Main Screen stack*/}
            <Stack.Navigator>

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
        </NavigationContainer>
    )
}