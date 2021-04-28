import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'


export function MainScreen({navigation}){
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Main screen</Text>
            <Button 
                title="Sign Up" 
                onPress={() => navigation.navigate('SignUp')}/>
        </View>
    );
}