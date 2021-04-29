import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'


export function LoginScreen({navigation}){
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Login Bro</Text>
            <Button 
                title="Go back" 
                onPress={() => navigation.goBack()} />
        </View>
    );
}

