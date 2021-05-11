// TODO : Clean up - fix indentation
import React, {useState, useEffect} from 'react'
import { View, Text, Button, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { TopText, FlexView, InputTF, VFlex, HFlex, AtLabel, 
         BackArrow, InputDOB, ButtonPrimary, ButtonView, 
         ImageSelectorTouchable, TopTitle, TopBar } from 'components/styled/components';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker';
import { Input as InputEl } from "react-native-elements";
import { Header, Icon as Icc } from "react-native-elements";
import * as SecureStore from 'expo-secure-store'
import {useQuery, useMutation, gql, useApolloClient } from "@apollo/client"
import DeviceInfo from 'react-native-device-info';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

export function ProfileScreen({route, navigation}){
    const [initializing, setInitializing] = useState(true);

    const client = useApolloClient();

   let s = new Object({"__typename": "User", "authStage": "SIGNUP", "authType": "GOOGLE", "createdAt": "2021-05-07T21:34:12.033Z", "device": {"__typename": "Device", "createdAt": "2021-05-07T21:33:31.801Z", "deviceId": "A16B90C6-CFD6-44D4-A32E-0801C9E2854F", "id": "30"}, "dob": "1999-05-28T10:26:39.359Z", "email": "hrvsandhu6@gmail.com", "id": "f336be17-9170-437f-ac3d-0260f0c9a2de", "idToken": null, "password": null, "profile": {"__typename": "Profile", "avatarUrl": "https://lh3.googleusercontent.com/a-/AOh14Gj07KmstmrQQWBJPhsK4QetSBUmeofqryoEb5I2=s96-c", "bio": null, "id": "695ff03b-1848-41bb-84db-a27e71e6f9a6", "name": "H S", "username": "Harry"}, "userId": "XhbE7U59FMU7loIiNR7eJ0W8KHw2"})
    const [user, setUser] = useState(s)
    const [logout,  setLogout] = useState(false)
    // const [user, setUser] = useState(loadUser())
    
    
    // useEffect(()=>{
    //     navigation.addListener('beforeRemove', (e) => {
    //         if(logout) {
    //             const action = e.data.action;
    //             console.log(action)
    //             navigation.dispatch(action)
    //         }else{
    //             console.log("this ran")
    //             e.preventDefault()
    //             console.log("goingback")
    //         }
     
    //     })
    // }, [navigation, logout])

    async function onAuthStateChanged(user) {
    }

    useEffect(async () => {
        let user =  await SecureStore.getItemAsync("user")
        // setUser(user)
        return () => console.log("hello")
    }, [])

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
           

       
        return subscriber; // unsubscribe on unmount
    
    
  }, []);


    async function handleContinue(){
        setLogout(true)
         auth().signOut().then(() => {
            navigation.popToTop('Main')
        })

            
    }


    console.log(user)
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070A1E'}}>
        <Header
            barStyle="default"
            centerComponent={
                <VFlex>
                <TopTitle>Profile</TopTitle>
                </VFlex>
                }
            centerContainerStyle={{}}
            containerStyle={{ width: '100%', backgroundColor: 'none',top:0, position: "absolute", borderBottomColor: "transparent"}}
            leftComponent={ {}}
            placement="center"
            rightComponent={{}}
            rightContainerStyle={{}}
            
            statusBarProps={{}}
    />
    
           <VFlex>
           <Text style={{color:"white"}}>Hi!, {user.profile.name}</Text>    
           <Text style={{color:"white"}}>@{user.profile.username}</Text>
           <Text style={{color:"white"}}>{user.id}</Text>
           <Text style={{color:"white"}}>{user.email}</Text> 

           <ButtonPrimary style={{bottom: "-15%"}} onPress={async () => await handleContinue()}>
                    <Text style={{color:"white"}}>Logout</Text>
            </ButtonPrimary>

           </VFlex>
            
        </View>
    )


}