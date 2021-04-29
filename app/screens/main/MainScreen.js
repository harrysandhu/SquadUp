import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'
import { RedButton, ButtonPrimary, ButtonSecondary, ButtonView } from '../../components/styled/components';


export function MainScreen({navigation}){
    return (
        <View style={{flex: 1, backgroundColor: '#070A1E'}}>
            <ButtonView>
                <ButtonPrimary onPress={() => navigation.navigate('Login')}>
                    <Text style={{color:"white"}}>LOGIN</Text>
                </ButtonPrimary>
                <ButtonSecondary onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{color:"white"}}>SIGN UP</Text>
                </ButtonSecondary>
            </ButtonView>
        </View>
    );
}