// TODO : Clean up - fix indentation
import React, {useState, useEffect} from 'react'
import { View, Text, Button, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { TopText, FlexView, InputTF, VFlex, HFlex, AtLabel, 
         BackArrow, InputDOB, ButtonPrimary, ButtonView, ProfilePictureView, 
         ImageSelectorTouchable, TopTitle, TopBar, ButtonLogOut } from 'components/styled/components';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker';
import { Input as InputEl } from "react-native-elements";
import { Header, Icon as Icc } from "react-native-elements";
import * as SecureStore from 'expo-secure-store'
import {useQuery, useMutation, gql, useApolloClient } from "@apollo/client"
import DeviceInfo from 'react-native-device-info';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { ProfileEdit } from '../../components/styled/components';
import { ProfileFlex } from '../../components/styled/components';

export function ProfileScreen({route, navigation}){
    const [initializing, setInitializing] = useState(true);

    const client = useApolloClient();

    let s = new Object({"__typename": "User", "authStage": "SIGNUP", "authType": "GOOGLE", "createdAt": "2021-05-07T21:34:12.033Z", "device": {"__typename": "Device", "createdAt": "2021-05-07T21:33:31.801Z", "deviceId": "A16B90C6-CFD6-44D4-A32E-0801C9E2854F", "id": "30"}, "dob": "1999-05-28T10:26:39.359Z", "email": "hrvsandhu6@gmail.com", "id": "f336be17-9170-437f-ac3d-0260f0c9a2de", "idToken": null, "password": null, "profile": {"__typename": "Profile", "avatarUrl": "https://lh3.googleusercontent.com/a-/AOh14Gj07KmstmrQQWBJPhsK4QetSBUmeofqryoEb5I2=s96-c", "bio": "Hey, I'm Harman!", "id": "695ff03b-1848-41bb-84db-a27e71e6f9a6", "name": "H S", "username": "Harry"}, "userId": "XhbE7U59FMU7loIiNR7eJ0W8KHw2"})
    const [user, setUser] = useState(s)
    const [logout,  setLogout] = useState(false)

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
        <View style={{flex: 1, alignItems: 'center', backgroundColor: '#070A1E'}}>
          <Header
              barStyle="default"
              centerComponent={
                  <VFlex>
                    <TopTitle>Profile</TopTitle>
                  </VFlex>
                  }
              centerContainerStyle={{}}
              containerStyle={{width: '100%', 
                                backgroundColor: 'none', 
                                position: "absolute", 
                                borderBottomColor: "transparent"}}
              leftComponent={{}}
              rightComponent={{}}
              rightContainerStyle={{}}
              
              statusBarProps={{}}
          />
          <ProfileFlex>
            <ProfilePictureView style={{top: "20%"}}>
                <Image source={user.profile.avatarUrl} style={{height: 120, width: 120}} />  
                <Text style={{color:"white", top: "0%"}}>@{user.profile.username}</Text>
            </ProfilePictureView>
              
                <Text style={{ display: "flex", color:"lightgrey"}}>{user.profile.name}</Text>
                <Text style={{ display: "flex", color:"lightgrey"}}>{user.profile.bio}</Text>

              <ButtonLogOut style={{bottom: "5%"}} onPress={async () => await handleContinue()}>
                <Text style={{color:"white"}}>Logout</Text>
              </ButtonLogOut>
          </ProfileFlex>
        </View>
    )


}