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
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AppModel from '../../models/AppModel';
import useObservable from '../../utils/useObservable';

export function CreateTeamScreen({route, navigation}){

    const client = useApolloClient();

    const [teamnameText, setTeamnameText]  = useState("")
    const [teamnameIsActive, setTeamNameIsActive] = useState(false)

    const [teamIDText, setTeamIDText]  = useState("")
    const [teamIDIsActive, setTeamIDIsActive] = useState(false)

    return (

        <KeyboardAvoidingView
          behavior={
            Platform.OS === "ios" ? "padding" : "height"
          }
          style={{
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: '#070A1E'
          }}
        >
          <View style={{flex: 1, alignItems: 'center', backgroundColor: '#070A1E'}}>
            <Header
                barStyle="default"
                centerComponent={
                    <VFlex>
                      <TopTitle>CREATE A TEAM</TopTitle>
                    </VFlex>
                }
                centerContainerStyle={{}}
                containerStyle={{
                  width: '100%', 
                  height: 100, 
                  backgroundColor: 'none', 
                  position: "absolute", 
                  borderBottomColor: "transparent"
                }}
                leftComponent={
                    <BackArrow onPress={() => navigation.goBack()}>
                        <Icon 
                            name='angle-left' 
                            size={25} 
                            style={{
                                color:"white"
                            }}
                        />
                    </BackArrow>
                }
                placement="center"
                rightComponent={{}}
                rightContainerStyle={{}}
                statusBarProps={{}}
            />
            <ProfileFlex>
              <ProfilePictureView 
                style={{top: "20%"
                }}
              >
                  <Image/>  
              </ProfilePictureView>

            <VFlex style={{width:"90%"}}>
                  <InputTF
                          placeholder="Team Name"
                          placeholderTextColor="#a9a9a9"
                          active={teamnameIsActive} 
                          value={teamnameText}
                          autocorrect="false"
                          onFocus={()=>{
                            setTeamNameIsActive(true)
                          }}

                          onBlur={() =>{
                            setTeamNameIsActive(false)
                          }}
                              onChangeText={async (value) =>{
                                setTeamnameText(value)
                              await handleUsernameValueChange(value)
                          }}

                      />
            </VFlex>
            <VFlex style={{width:"90%"}}>
                    <InputTF
                          placeholder="Team ID"
                          placeholderTextColor="#a9a9a9"
                          active={teamIDIsActive} 
                          value={teamIDText}
                          autocorrect="false"
                          onFocus={()=>{
                            setTeamIDIsActive(true)
                          }}

                          onBlur={() =>{
                            setTeamIDIsActive(false)
                          }}
                              onChangeText={async (value) =>{
                                setTeamIDText(value)
                              await handleUsernameValueChange(value)
                          }}

                      />
            </VFlex>
            <VFlex style={{bottom: 50, position: "absolute"}}>
                <ButtonPrimary style={{width: "80%"}}>
                    <Text 
                        style={{
                        color:"white"
                        }}
                    >
                        Create
                    </Text>
                </ButtonPrimary>
            </VFlex>
            </ProfileFlex>
          </View>
        </KeyboardAvoidingView>
    )


}