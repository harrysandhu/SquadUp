import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'
import { TopText, BackArrow } from '../../components/styled/components';
import Icon from 'react-native-vector-icons/FontAwesome'


export function SignUpScreen({navigation}){
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070A1E'}}>
            <TopText>
                <Text style={{color:"white"}}>SIGN UP</Text>
            </TopText>

            <BackArrow onPress={() => navigation.goBack()}>
                <Icon name='angle-left' size={25} style={{color:"white"}}/>
            </BackArrow>

            <Button 
                title="Profile Completion" 
                onPress={() => navigation.navigate('Completion')} />
        </View>
    );
}

