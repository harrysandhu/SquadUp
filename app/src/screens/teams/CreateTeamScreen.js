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
import { GET_TEAM_BY_TEAMID } from '../../apollo/queries';
import { CREATE_TEAM } from '../../apollo/mutations';

export function CreateTeamScreen({route, navigation}){

  

    const client = useApolloClient();
  
    const [teamnameText, setTeamnameText]  = useState("")
    const [teamnameIsActive, setTeamNameIsActive] = useState(false)

    const [teamIDText, setTeamIDText]  = useState("")
    const [teamIDIsActive, setTeamIDIsActive] = useState(false)

    const [teamState, setTeamState ] = useState({message: "", state: false})

    let {game} = route.params

    let {onGoBack} = route.params
  console.log("GAME TO:: ", route.params)


  async function handleTeamIDChange(value) {

    try {
      let result = await client.query({
        query: GET_TEAM_BY_TEAMID,
        variables: {teamId: value},
        fetchPolicy: "network-only"
      })
      console.log("WHAT::", result.data)
      if(result.data.teamByTeamId == null){
        setTeamState({message: "Team ID is available", state: true})
      }else{
        setTeamState({message: "Team ID not available", state: false})
      }
    }
    catch(e){
      alert("network error")
    }
  } 


  async function createTeam(){
    console.log("yo this::: ", game.id, AppModel.userProfileModel.id)
    try{
      let result = await client.mutate({
        mutation: CREATE_TEAM,
        variables: {name: teamnameText, teamId: String(teamIDText).toLowerCase(), gId: game.id, profileId: AppModel.userProfileModel.id.getValue()}
      })
        
      console.log(result)

      if(result.data.createTeam != null){
         await onGoBack.refetch()
          navigation.navigate('HomeScreen')
      }else{
        alert("Something went wrong")
      }
    }catch(e){
      alert(e)
    }
  }

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
             <Header
                barStyle="default"
                centerComponent={
                    <VFlex>
                    <TopTitle 
                        style={{
                            fontSize:18,
                            color: "white"
                        }}
                    >
                            Create Team
                    </TopTitle>
                    </VFlex>
                }
                centerContainerStyle={{}}
                containerStyle={{ 
                    width: '100%', 
                    height: 100, 
                    backgroundColor:'transparent',
                    borderBottomColor: "transparent"
                }}
                leftComponent={   
                    <BackArrow 
                        onPress={() => {navigation.pop()}}
                    >
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
                 <TopBar state={teamState.state} message={teamState.message} style={{position:"absolute", top: 0}}>
            <Text style={{color:"white"}}>{teamState.message}</Text>
        </TopBar>
          <View style={{flex: 1, alignItems: 'center', backgroundColor: '#070A1E'}}>
          
            <ProfileFlex>
            <Image 
                                source={{uri : game.coverUrl}} 
                                style={{
                                    width: 150, 
                                    height: 200,  
                                    zIndex: 0, 
                                    marginTop:'-80%',
                                    borderRadius: 15
                                }} 
                            />

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
                              await handleTeamIDChange(value)
                          }}

                      />
            </VFlex>
            <VFlex style={{bottom: 50, position: "absolute"}}>
                <ButtonPrimary onPress={async () => await createTeam()} style={{width: "80%"}} state={teamState.state} disable={teamState.state}>
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