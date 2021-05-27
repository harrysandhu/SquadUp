
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
import AppModel from 'models/AppModel';
import { ServerButton } from './styled/components';



export default function DrawerView(){
    const usergames = {
        "123":{
            id: "123",
            name: "Among Us",
            gameId: "amongus",
            maxSize: 10,
            coverURL: require("../../assets/images/amongUs.jpg")
        },
        "456":{
            id: "456",
            name: "Fall Guys",
            gameId: "fallguys",
            maxSize: 4,
            coverURL: require("../../assets/images/fallGuy.jpeg")
        },
        "789":{
            id: "789",
            name: "Valheim",
            gameId: "valheim",
            maxSize: 10,
            coverURL: require("../../assets/images/valheim.jpeg")
        },
        "012":{
            id: "012",
            name: "Rocket League",
            gameId: "rocketleague",
            maxSize: 10,
            coverURL: require("../../assets/images/rocketLeague.jpg")
        },
        "696":{
            id: "696",
            name: "Overwatch",
            gameId: "overwatch",
            maxSize: 6,
            coverURL: require("../../assets/images/overwatch.jpeg")
        }
    }
    
    
    const userTeams = 
    {
        "901" : {
            id: "901",
            name: "KILL BILL",
            teamId: "kill_bill",
            gameId: "456",
            isActive: true,
            createdAt: null
        },
        "420" : {
            id: "420",
            name: "Khiladis",
            teamId: "akshaykumar420",
            gameId: "456",
            isActive: true,
            createdAt: null
        },
        "669" : {
            id: "669",
            name: "Chain Smokers",
            teamId: "chain_s",
            gameId: "456",
            isActive: true,
            createdAt: null
        },
        "323" : {
            id: "901",
            name: "One Direction",
            teamId: "nozaynnohomo",
            gameId: "012",
            isActive: true,
            createdAt: null
        },
        "344" : {
            id: "344",
            name: "Viking Squad",
            teamId: "vikes",
            gameId: "789",
            isActive: true,
            createdAt: null
        },
        "111" : {
            id: "111",
            name: "WhoIsImposter",
            teamId: "imposters",
            gameId: "123",
            isActive: true,
            createdAt: null
        },
    
    }
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    
    let [selectedGame, setSelectedGame] = useState(Object.keys(usergames)[0])


    getGames = () => {
        let teams = Object.values(userTeams).filter(game => game.gameId == selectedGame)
        return teams
    }

    return (
        <View style={{zIndex: 100, backgroundColor: "#0C1C4E", width: windowWidth, 
                        height: windowHeight, top: -windowHeight/2, position: "absolute" , 
                        alignItems: 'center', justifyContent: 'center'}}>

            <HFlex>
                <VFlex style={{paddingLeft: "25%", height: windowHeight, 
                                width: windowWidth*0.5 ,backgroundColor: "#30468B"}}>
                    {
                    //loop through the games and display them
                    // gamebox onPress={select game}  text  /gamebox

                        Object.keys(usergames).map((id, index) => {
                            return (
                                <ServerButton onPress={() => setSelectedGame(id)}>
                                    <Image source={usergames[id].coverURL} style={{top: -windowHeight/10, height: 70, width: 60, borderRadius: 25}}/>
                                </ServerButton>   
                            )
                        })

                    }
                </VFlex>
                <VFlex style={{paddingRight: "30%", paddingLeft: "5%", alignItems: 'flex-start', height: "100%", width: windowWidth}}>
                    <VFlex style={{alignItems: 'flex-start', paddingLeft: "5%", top: windowHeight/6, position: "absolute"}}>
                            <Text style={{color: "white", fontSize: 25, fontWeight: "500"}}>{usergames[selectedGame].name}</Text>
                            <Text style={{color: "white", fontSize: 16, fontWeight: "100"}}>!Teams</Text>
                    </VFlex>
                    {
                        // display the teams (loop through them), for the game that is selected.
                       
                        getGames().map((team, index, gameId) => {
                            return (

                                <ServerButton>
                                    <Text style={{flex: 1, color: "white"}}>{"!" + team.name}</Text>
                                </ServerButton>
                                
                            )   
                        })

                    }

                    <VFlex style={{}}>
                        <ButtonPrimary style={{position: 'absolute', bottom: 0}}>
                            <Text>
                                Join a Team
                            </Text>
                        </ButtonPrimary>
                        <ButtonPrimary>
                            <Text>
                                Create a Team
                            </Text>
                        </ButtonPrimary>
                    </VFlex>
                </VFlex>
            </HFlex>
        </View>
    )
}


