
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

const usergames = {
    "123":{
        id: "123",
        name: "Among Us",
        gameId: "amongus",
        maxSize: 10
    },
    "456":{
        id: "456",
        name: "Fall Guys",
        gameId: "fallguys",
        maxSize: 4
    },
    "789":{
        id: "789",
        name: "Valheim",
        gameId: "valheim",
        maxSize: 10
    },
    "012":{
        id: "012",
        name: "Rocket League",
        gameId: "rocketleague",
        maxSize: 10
    },
    "696":{
        id: "012",
        name: "Overwatch",
        gameId: "overwatch",
        maxSize: 6
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

export default function DrawerView(){

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    
    let [selectedGame, setSelectedGame] = useState(
            usergames.length > 0 ? Object.keys(usergames)[0] : -1
    )


    getGames = () => {
        let teams = Object.values(userTeams).filter(game => game.gameId == selectedGame)
        return teams
    }

    return (
        <View style={{zIndex: 100, backgroundColor: "#2E1A56", width: windowWidth, 
                        height: windowHeight,top: -windowHeight/2, position: "absolute" , 
                        alignItems: 'center', justifyContent: 'center'}}>

            <HFlex>
                <VFlex style={{paddingLeft: "30%", height: windowHeight, 
                                width: windowWidth*0.6 ,backgroundColor: "#0B1B4E"}}>
                    {
                    //loop through the games and display them
                    // gamebox onPress={select game}  text  /gamebox

                        Object.keys(usergames).map((id, index) => {
                            return (
                                <ServerButton onPress={() => setSelectedGame(id)}>
                                    <Text style={{color: "white"}}>{usergames[id].name}</Text>
                                </ServerButton>   
                            )
                        })

                    }
                </VFlex>
                <VFlex style={{paddingRight: "30%"}}>

                    {
                        // display the teams (loop through them), for the game that is selected.
                       
                        getGames().map((team, index) => {
                            return (
                                <ServerButton >
                                    <Text style={{color: "white"}}>{team.name}</Text>
                                </ServerButton>
                            )   
                        })

                    }
                </VFlex>
            </HFlex>
        </View>
    )
}


