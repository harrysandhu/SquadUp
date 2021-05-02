import React, {useState} from 'react'
import {View, Text, Button, Image} from 'react-native'
import { ButtonPrimary, ButtonSecondary, ButtonView, VFlex, LogoImage } from '../../components/styled/components';


export function MainScreen({navigation}){
    return (
        <View style={{flex: 1, backgroundColor: '#070A1E'}}>
            <VFlex style={{paddingTop:'15%'}}>
                <Image source={require("../../assets/images/logo2.png")} style={{height:360, width:360, resizeMode:"contain"}}/>
            </VFlex>
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