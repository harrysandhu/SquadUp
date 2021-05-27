
// TODO : Clean up - fix indentation
import React, {useState, useEffect} from 'react'
import { View, Text, Button, Image, KeyboardAvoidingView, Platform, Dimensions, Keyboard, Animated } from 'react-native'
import { TopText, FlexView, InputTF, VFlex, HFlex, AtLabel, 
         BackArrow, InputDOB, ButtonPrimary, ButtonView, 
         ImageSelectorTouchable, TopTitle, TopBar, HamArrow, TeamButton } from 'components/styled/components';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker';
import { Input as InputEl } from "react-native-elements";
import { Header, Icon as Icc } from "react-native-elements";
import * as SecureStore from 'expo-secure-store'
import {useQuery, useMutation, gql, useApolloClient } from "@apollo/client"
import DeviceInfo from 'react-native-device-info';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import AppModel from 'models/AppModel';
import { ServerButton } from './styled/components';
import { ButtonSecondary } from './styled/components';



export default function DrawerView({ navigation, games, teams, slideOut }){
    teams.map(g => {
        console.log(g)
    })
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
    
    let [selectedGame, setSelectedGame] = useState(games[0].id)
    let [activeTeam, setActiveTeam] = useState(teams.filter(t => t.game.id == selectedGame)[0].id)

    console.log("activeeeee:::", activeTeam)
    getGames = () => {
        let teams = Object.values(userTeams).filter(game => game.gameId == selectedGame)
        return teams
    }

    renderGame = ({item}) => {
        return (
            <ServerButton key={item.id} onPress={() => setSelectedGame(item.id)}>
            <Image source={{uri: item.coverUrl}} style={{top: -windowHeight/10, height: 70, width: 60, borderRadius: 25}}/>
        </ServerButton>  
        )
    }

    return (
        <View style={{zIndex: 100, backgroundColor: "#0C1C4E", width: windowWidth, 
                        height: windowHeight, top: -windowHeight/2, position: "absolute" , 
                        alignItems: 'center', justifyContent: 'center'}}>

            <HFlex>
                <VFlex style={{paddingLeft: "20%", height: windowHeight, 
                                width: windowWidth*0.5 ,backgroundColor: "#30468B"}}>

                    <FlatList
                    bounces={false}
                    style={{paddingTop:100, marginTop:100, width:'100%'}}
                    horizontal={false}
                    data={games}
                    renderItem={renderGame}
                    keyExtractor={item => item.id}
                    />
                    
                  
                </VFlex>
                <VFlex style={{paddingRight: "30%", paddingLeft: "5%", 
                    justifyContent:'flex-start',
                                alignItems: 'flex-start', height: "100%", 
                                width: windowWidth}}>
                    <VFlex style={{alignItems: 'flex-start', paddingLeft: "5%", top: windowHeight/6, position: "absolute"}}>
                            <Text style={{color: "white", fontSize: 25, fontWeight: "500"}}>{games.filter(g => g.id == selectedGame)[0].name}</Text>
                            <Text style={{color: "white", fontSize: 16, fontWeight: "100"}}>!Teams</Text>
                 
                    {
                        // display the teams (loop through them), for the game that is selected.
                       
                        teams.filter(t => t.game.id == selectedGame).map(t => {
                            console.log("yoo", t)
                            console.log("thisisisis: ", t.id == activeTeam)
                            return (
                        
                                <TeamButton key={t.id} active={t.id === activeTeam ? 'true' : 'false'} onPress={() => {setActiveTeam(t.id); slideOut(activeTeam, selectedGame)}}>
                                    <Text style={{flex: 1, color: "white"}}>{"!" + t.name}</Text>
                                </TeamButton>
                                
                            )   
                        })

                    }
                    </VFlex>
                    <VFlex style={{bottom: 40, position: 'absolute', marginLeft: 24,
                                alignItems: 'flex-start', height: "20%"}}>
                        <ButtonPrimary 
                            style={{position: 'absolute', bottom: 0, height:40, width: '100%'}}
                            onPress={() => navigation.navigate('JoinTeam')}>
                            <Text style={{color: '#fff'}}>
                                Join a Team
                            </Text>
                        </ButtonPrimary>
                        <ButtonSecondary
                            style={{position: 'absolute', bottom: 60 , height:40, width: '100%'}}
                            onPress={() => navigation.navigate('CreateTeam')}>
                            <Text style={{color: '#fff'}}>
                                Create a Team
                            </Text>
                        </ButtonSecondary>
                    </VFlex>
                </VFlex>
            </HFlex>
        </View>
    )
}


