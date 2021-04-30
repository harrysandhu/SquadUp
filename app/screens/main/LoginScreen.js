import React, {useState} from 'react'
import { View, Text, Button } from 'react-native'
import { TopText, InputView, Inputs, BackArrow } from '../../components/styled/components';
import Icon from 'react-native-vector-icons/FontAwesome'


export function LoginScreen({navigation}){
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070A1E'}}>
            <TopText>
                <Text style={{color:"white"}}>LOGIN</Text>
            </TopText>

            <BackArrow onPress={() => navigation.goBack()}>
                <Icon name='angle-left' size={25} style={{color:"white"}}/>
            </BackArrow>
        </View>
    );
}

