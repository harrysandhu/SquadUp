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
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { ImgSize, ProfileEdit } from '../../components/styled/components';
import { ProfileFlex } from '../../components/styled/components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AppModel from '../../models/AppModel';
import useObservable from '../../utils/useObservable';
import { GET_USER_BY_EMAIL } from '../../apollo/queries';
import { ActivityIndicator } from 'react-native';
import AppController from '../../controllers/AppController';

export function ProfileScreen({route, navigation}){
      AppModel.userProfileModel.userId.next(1)

  const [r, setR] = useState(0)
    // const client = useApolloClient();
    // let userProfile = {
    //   id: useObservable(AppModel.userProfileModel.id),
    //   name: useObservable(AppModel.userProfileModel.name),
    //   username: useObservable(AppModel.userProfileModel.username),
    //   avatarUrl: useObservable(AppModel.userProfileModel.avatarUrl),
    //   bio: useObservable(AppModel.userProfileModel.bio),
    //   uid: useObservable(AppModel.userProfileModel.uid),
    //   userId: useObservable(AppModel.userProfileModel.userId),
    // }

    // console.log("user profile object: ", userProfile)
    const [logout,  setLogout] = useState(false)

// useEffect(()=>{
//   console.log("yoo", userProfile.userId)
// }, [userProfile.userId])


useEffect(() =>{
  console.log("I RAN BRO")
})
  const {data, error, loading, refetch} = useQuery(GET_USER_BY_EMAIL, {
      variables:{
        email:AppModel.userModel.email.value
      },
  })


  console.log(data)



    async function handleContinue(){
      await AppController.user.logout()
        navigation.popToTop('Main')
  
    }


    if (loading) {
      return (
        <VFlex>
          <ActivityIndicator />
        </VFlex>
      )
    }
    let user = data.userByEmail
    let userProfile = user.profile
    let games = userProfile.games
    let teams = userProfile.teams

    console.log(games, teams)

    const renderItem = ({item}) => {
      return (
        <Image 
            source={{uri : item.coverUrl}} 
            style={{
                width: 100, 
                height: 150,  
                zIndex: 0, 
                borderRadius: 15,
                margin:10
            }} 
        />
      )
    }

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
              containerStyle={{
                width: '100%', 
                backgroundColor: 'none', 
                position: "absolute", 
                borderBottomColor: "transparent"
              }}
              leftComponent={{}}
              rightComponent={{}}
              rightContainerStyle={{}}
              statusBarProps={{}}
          />
          <ProfileFlex>
            <ProfilePictureView 
              style={{top: "20%"
              }}
            >
                <Image 
                  source={{ 
                    uri: userProfile.avatarUrl
                  }} 
                  style={{
                    height: 100, 
                    width: 100,
                    borderRadius: 50,
                    marginBottom: 10
                  }} 
                />  
                <Text 
                  style={{
                    color:"white", 
                    top: "0%"
                  }}
                >@{userProfile.username}
                </Text>
            </ProfilePictureView>
              <Text 
                style={{ 
                  display: "flex", 
                  color:"lightgrey"
                }}
              >
                {userProfile.userId}
              </Text>
              <Text 
                style={{ 
                  color:"lightgrey",
                  paddingTop:50
                  }}
                
              >
                {userProfile.name}
              </Text>
              <Text 
                style={{ 
                  color:"lightgrey"
                }}
              >
                {"" ? userProfile.bio == null : userProfile.bio}
              </Text>
              
             <VFlex>

               <FlatList 
                horizontal={true}
                data={games}
                keyExtractor={(game) => games.length > 0 ? game.id : ""}
                renderItem={renderItem}
               />
             </VFlex>
 
              <ButtonLogOut style={{
                  bottom: "15%"
                }}
                onPress={() => navigation.navigate("GameSelection", {user: user,  onGoBack: refetch } )}
                >
                  <Text 
                  style={{
                    color:"white"
                  }}
                >
                  Selected Games
                </Text>

              </ButtonLogOut>

              <ButtonLogOut 
                style={{
                  bottom: "5%"
                }} 
                onPress={async () => await handleContinue()}
              >
                <Text 
                  style={{
                    color:"white"
                  }}
                >
                  Logout
                </Text>
              </ButtonLogOut>
          </ProfileFlex>
        </View>
    )

}