// TODO : Clean up - fix indentation
import React, {useState, useEffect} from 'react'
import { View, Text, Button, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { TopText, FlexView, InputTF, VFlex, HFlex, AtLabel, 
         BackArrow, InputDOB, ButtonPrimary, ButtonView, 
         ImageSelectorTouchable, TopTitle, TopBar } from '../../components/styled/components';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker';
import { Input as InputEl } from "react-native-elements";
import { Header, Icon as Icc } from "react-native-elements";
import * as SecureStore from 'expo-secure-store'
import {useQuery, useMutation, gql, useApolloClient } from "@apollo/client"
import DeviceInfo from 'react-native-device-info';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

export function HomeScreen({route, navigation}){
    const [initializing, setInitializing] = useState(true);

    const client = useApolloClient();

   
    const [user, setUser] = useState(route.params.user)
     let imgUrl = "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png"
    const [image, setImage] = useState((user.profile.avatarUrl) ? user.profile.avatarUrl : imgUrl );
    const loadUser = async () => {
        return await SecureStore.getItemAsync("user")
    }
    const [logout,  setLogout] = useState(false)
    // const [user, setUser] = useState(loadUser())
    console.log(user)
    
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
                <TopTitle>Home</TopTitle>
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