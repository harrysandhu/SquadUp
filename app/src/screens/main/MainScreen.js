// TODO : Clean up - fix indentation
import React, {useEffect, useState} from 'react'
import {View, Text, Button, Image, ActivityIndicator} from 'react-native'
import { ButtonPrimary, ButtonSecondary, ButtonView, VFlex, LogoImage } from 'components/styled/components';
import {useQuery, useMutation, gql, useApolloClient} from "@apollo/client"
import DeviceInfo from 'react-native-device-info';
import * as SecureStore from 'expo-secure-store'
import useObservable from '../../utils/useObservable';
import DeviceController from '../../controllers/DeviceController';
import AppModel from '../../models/AppModel';

export function MainScreen({navigation}){
    
    const device = useObservable(AppModel.deviceModel.id)
    const route = useObservable(AppModel.userModel.route)
    useEffect(() => {
        if(route != "Main"){
            navigation.navigate(route)
        }
      
    }, [])
   
    
    return (
        <View 
            style={{
                flex: 1, 
                backgroundColor: '#070A1E'
            }}
        >
            <VFlex 
                style={{
                    paddingTop:'15%'
                }}
            >
                <Image 
                    source={
                        require("../../../assets/images/logo2.png")
                    } 
                    style={{
                        height:360, 
                        width:360, 
                        resizeMode:"contain"
                    }}
                />
                {/* <DeviceDetails /> */}
            </VFlex>
            <ButtonView>
                <ButtonPrimary 
                onPress={() => navigation.navigate('Login')}
                >
                    <Text 
                        style={{
                            color:"white"
                        }}
                    >
                        LOGIN
                    </Text>
                </ButtonPrimary>
                <ButtonSecondary 
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text 
                        style={{
                            color:"white"
                        }}
                    >
                        SIGN UP
                    </Text>
                </ButtonSecondary>
            </ButtonView>
        </View>
    );
}