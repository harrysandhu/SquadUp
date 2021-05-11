// TODO : Clean up - fix indentation
import React, {useEffect, useState} from 'react'
import {View, Text, Button, Image, ActivityIndicator} from 'react-native'
import { ButtonPrimary, ButtonSecondary, ButtonView, VFlex, LogoImage } from 'components/styled/components';
import {useQuery, useMutation, gql, useApolloClient} from "@apollo/client"
import DeviceInfo from 'react-native-device-info';
import * as SecureStore from 'expo-secure-store'
import useObservable from '../../utils/useObservable';



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


export function MainScreen({navigation}){
    
    const client = useApolloClient()
    // deviceId
    const [deviceId, setDeviceId] = useState(DeviceInfo.getUniqueId())


    async function setupDevice(){
        //check device reg state
        try{
            let result = await client.query({
                query: GET_DEVICE,
                variables: {deviceId: deviceId},
                fetchPolicy: "network-only"
            })
            const deviceIsRegistered = ("id" in Object(result.data.device))
            console.log("data:: ", result.data)
            //TODO - Singleton state

            if(deviceIsRegistered){
                console.log("device is regsiterede")
            }else{
                console.log("C")
                console.log("device is NOT regsiterede")
                let result = await client.mutate({
                    mutation: REGISTER_DEVICE,
                    variables: {deviceId: deviceId}
                })
                console.log(result)
            }
        }catch(error){
            // possible network errors,
            console.log(error)
            alert("Something went wrong.")
        }
    }


    useEffect(() => {
        setupDevice()

        //clean up function
        return () => {
            console.log("This will be logged on unmount");
        }
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: '#070A1E'}}>
            <VFlex style={{paddingTop:'15%'}}>
                <Image source={require("../../../assets/images/logo2.png")} style={{height:360, width:360, resizeMode:"contain"}}/>
                {/* <DeviceDetails /> */}
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