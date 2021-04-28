import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'


export function SignUpScreen({navigation}){
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Sign Up bro</Text>
            <Button 
                title="Go back" 
                onPress={() => navigation.goBack()} />
        </View>
    );
}

