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
import { NavigationContainer } from '@react-navigation/native';
import AppModel from '../../models/AppModel';

export function HomeScreen({navigation}){

   useEffect(( ) => {
       console.log("home screen")
    AppModel.userProfileModel.userId.next(4)
   }, [])

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
           <Text style={{color:"white"}}>Hi!, this is your default news feed.</Text>    
           </VFlex>
            
        </View>
    )


}