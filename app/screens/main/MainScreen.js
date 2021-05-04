// TODO : Clean up - fix indentation
import React, {useEffect, useState} from 'react'
import {View, Text, Button, Image, ActivityIndicator} from 'react-native'
import { ButtonPrimary, ButtonSecondary, ButtonView, VFlex, LogoImage } from '../../components/styled/components';
import {useQuery, useMutation, gql} from "@apollo/client"
import DeviceInfo from 'react-native-device-info';

import * as SXX from 'expo-secure-store'



const GET_DEVICE = gql `
    query getDevice($deviceId: ID!){
        device(deviceId: $deviceId){
            id
            deviceId
            createdAt
        }
    }
`



const REGISTER_DEVICE = gql`
    mutation registerDevice($deviceId: ID!){
        registerDevice(deviceId: $deviceId){
            id
            deviceId
            createdAt
        }
    }
`

function DeviceDetails(){
    const [deviceId, setDeviceId] = useState(DeviceInfo.getUniqueId())
    const {data, error, loading} = useQuery(GET_DEVICE, {
        variables: {deviceId: deviceId}
    });
    const [registerDevice, {mutData}] = useMutation(REGISTER_DEVICE)


    if (!loading){
        console.log("yooo", data)
    }
    
    if(error) { console.log("ERROR FETCHING DEVICE: ", error)}

    async function setupDevice(){
        console.log("yooo::", DeviceInfo.getUniqueId().trim())
        try{
            let isDeviceReg = await SXX.getItemAsync("DEVICE_REG_STATE")
            if(isDeviceReg != "REGISTERED"){
                if(data.device == null){
                    registerDevice({
                        variables: {deviceId: deviceId}
                    })
                    console.log("mutData", mutData)
                }
                await SXX.setItemAsync("DEVICE_REG_STATE", "REGISTERED")
            }else{
                await SXX.setItemAsync("DEVICE_REG_STATE", "NOT_REGISTERED")
                console.log("bruh what")
            }
        }catch(e){
            console.log(e)
            console.log("here")
        }
    }

    useEffect(() => {
        setupDevice()
    }, [])


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