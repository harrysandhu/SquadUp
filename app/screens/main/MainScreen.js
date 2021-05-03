// TODO : Clean up - fix indentation
import React, {useState} from 'react'
import {View, Text, Button, Image, ActivityIndicator} from 'react-native'
import { ButtonPrimary, ButtonSecondary, ButtonView, VFlex, LogoImage } from '../../components/styled/components';
import {useQuery, gql} from "@apollo/client"


const GET_DEVICE = gql `
    query getDevice($deviceId: ID!){
        device(deviceId: $deviceId){
            id
            deviceId
            createdAt
        }
    }
`

function DeviceDetails(){
    const dId = "abc123"
    const {data, error, loading} = useQuery(GET_DEVICE, {
        variables: {deviceId: dId}
    });
    console.log(data)
    if(error) { console.log("ERROR FETCHING DEVICE: ", error)}
    return (
        <VFlex>
            {loading ? (
                <ActivityIndicator color="fff" size="small" />
            ) : (
                <VFlex>
                <Text style={{color:"white"}}>{data.device.id}</Text>
                <Text style={{color:"white"}}>{data.device.deviceId}</Text>
                <Text style={{color:"white"}}>{data.device.createdAt}</Text>
                </VFlex>
            )}

        </VFlex>
    )
}

export function MainScreen({navigation}){


   
    return (
        <View style={{flex: 1, backgroundColor: '#070A1E'}}>
            <VFlex style={{paddingTop:'15%'}}>
                <Image source={require("../../assets/images/logo2.png")} style={{height:360, width:360, resizeMode:"contain"}}/>
                <DeviceDetails />
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