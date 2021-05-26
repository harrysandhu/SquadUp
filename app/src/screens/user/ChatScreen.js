// TODO : Clean up - fix indentation
import React, {useState, useEffect} from 'react'
import { View, Text, Button, Image, KeyboardAvoidingView, Platform, Dimensions, Keyboard, Animated } from 'react-native'
import { TopText, FlexView, InputTF, VFlex, HFlex, AtLabel, 
         BackArrow, InputDOB, ButtonPrimary, ButtonView, 
         ImageSelectorTouchable, TopTitle, TopBar, HamArrow } from 'components/styled/components';
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
import DrawerView from "components/DrawerView"

export function ChatScreen({navigation}){
    
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070A1E'}}>
           <VFlex style={{zIndex: -1}}>
            <Text style={{color:"white"}}>Chat Screen</Text>    
           </VFlex>
            
        </View>
    )


}