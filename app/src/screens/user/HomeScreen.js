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
import { GET_ALL_MESSAGES, GET_USER_BY_EMAIL } from '../../apollo/queries';
import { ActivityIndicator } from 'react-native';
import { ChatPage } from './ChatPage';

export function HomeScreen({navigation}){

    const {data, error, loading, refetch} = useQuery(GET_USER_BY_EMAIL, {
        variables:{
          email:AppModel.userModel.email.getValue()
        },
        nextFetchPolicy:'cache-and-network'
    })




    slideIn = () => {
        setDrawerOpen(true)
        Animated.timing(x, {
            toValue: -windowWidth/2,
            duration: 250,
            useNativeDriver: true
        }).start()
    }

    slideOut = () => {
        setDrawerOpen(false)
        Animated.timing(x, {
            toValue: -windowWidth*2,
            duration: 250,
            useNativeDriver: true
        }).start()
    }

    
   useEffect(( ) => {
       console.log("home screen")
    AppModel.userProfileModel.userId.next(4) 
   }, [])


   getLeftComponent = () => {
       if(!drawerOpen){
           return  ( <HamArrow onPress={() => {drawerOpen ? slideOut() : slideIn()}}>
           <Icon name='server' size={25} style={{color:"white"}}/>
       </HamArrow>)
       }else{
           return ({})
       }
   }

   getRightComponent = () => {
    if(drawerOpen){
        return  ( <HamArrow onPress={() => {drawerOpen ? slideOut() : slideIn()}}>
        <Icon name='server' size={25} style={{color:"white"}}/>
    </HamArrow>)
    }else{
        return ({})
    }
}
  if (loading) {
      return (
        <VFlex>
          <ActivityIndicator />
        </VFlex>
      )
    }else if('userByEmail' in data){


    let user = data.userByEmail
    if(user == null){
        
        return (
            <VFlex>
              <ActivityIndicator />
            </VFlex>
          )
         
    }
    let userProfile = user.profile
    let games = userProfile.games
    let teams = userProfile.teams
    if (games == 'undefined' || teams == 'undefined'){
        games = [{id: ""}]
        teams = [{game: {id: ""}}]
    }else if(games.length == 0 || teams.length == 0){
         games = [{id: ""}]
         teams = [{game: {id: ""}}]
     }
    let [selectedGame, setSelectedGame] = useState(games.length > 0 ? games[0].id: "")
    let id = ""
    try{
        id =  teams.filter(t => t.game.id == selectedGame)[0].id
    }catch(e){

    }
    let [activeTeam, setActiveTeam] = useState(id)
    
    console.log("dDATATATA:", teams)
        let idx = ""
        for(let team of teams){
            if(team.id == activeTeam){
                idx = team.chat.id
                break;
            }
        }
        console.log("idxXXX", idx)
        const result = useQuery(GET_ALL_MESSAGES, {
            variables:{
                chatId : idx
            }
        })

  
    console.log("GAMES", games, teams)
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070A1E'}}>
            <Animated.View
                style={[{zIndex: 100, width:"100%"}], {
                    transform: [
                        {translateX: x}
                    ]
                }}>
                    <DrawerView navigation={navigation} games={games} teams={teams} slideOut={ (tId, gId) => {
                        setActiveTeam(tId)  
                        setSelectedGame(gId)
                        slideOut()}} refetch={refetch}/> 
                    
                </Animated.View>
        <Header
            barStyle="default"
            centerComponent={
                <VFlex style={drawerOpen ? {display: 'none'} :  {display: 'flex'}} >
                <Text style={{color: "white", fontSize: 18, fontWeight: "500"}}>{games.filter(g => g.id == selectedGame)[0].name}</Text>
                            <Text style={{color: "white", fontSize: 16, fontWeight: "300"}}>!{teams.filter(t => t.id == activeTeam)[0].teamId}</Text>
                            </VFlex>
                }
                centerContainerStyle={{alignItems: 'flex-start', justifyContent:'flex-start', marginLeft: "20%", top: 40, position: "absolute", width:'50%'}}
                containerStyle={{ zIndex: 0, position: "absolute", width: '100%', backgroundColor: 'none',top:0, borderBottomColor: "transparent"}}
                leftComponent={getLeftComponent()}
                leftContainerStyle={{paddingLeft: 10}}
                placement="center"
                rightComponent={getRightComponent()}
                rightContainerStyle={{paddingRight: 10}}
                
                statusBarProps={{}}
        />    
        <VFlex style={{zIndex: -1}}>
           <ChatPage {...result} /> 
        </VFlex>
            
        </View>
    )

}
}