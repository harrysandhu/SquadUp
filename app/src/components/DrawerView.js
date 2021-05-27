
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
import { FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import AppModel from 'models/AppModel';
import { ServerButton } from './styled/components';
import { ButtonSecondary } from './styled/components';



export default function DrawerView({ navigation, games, teams, slideOut, refetch}){
    teams.map(g => {
        console.log(g)
    })
 
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    
    let [selectedGame, setSelectedGame] = useState(games[0].id)
    let [activeTeam, setActiveTeam] = useState(teams.filter(t => t.game.id == selectedGame)[0].id)

    console.log("activeeeee:::", activeTeam)



    renderGame = ({item}) => {
        return (
            <ServerButton key={item.id} onPress={() => setSelectedGame(item.id)} style={item.id == selectedGame? {shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,
            
            elevation: 24} : {}}>
            <Image source={{uri: item.coverUrl}} style={item.id == selectedGame? {top: -windowHeight/10, height: 70, width: 60, borderRadius: 25, opacity: 1} : {top: -windowHeight/10, height: 70, width: 60, borderRadius: 25,opacity: 0.5}}/>
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
                    
                    <ScrollView style={{width:'100%', height:windowHeight-400}}>
                    {
                        // display the teams (loop through them), for the game that is selected.
                       
                        teams.filter(t => t.game.id == selectedGame).map(t => {
                            console.log("yoo", t)
                            console.log("thisisisis: ", t.id == activeTeam)
                            return (
                        
                                <TeamButton key={t.id} active={t.id === activeTeam ? 'true' : 'false'} onPress={() => {setActiveTeam(t.id); slideOut(t.id, selectedGame)}}>
                                    <Text style={{flex: 1, color: "white"}}>{"!" + t.teamId}</Text>
                                </TeamButton>
                                
                            )   
                        })

                    }
                    </ScrollView>
                    </VFlex>
                    <VFlex style={{bottom: 40, position: 'absolute', marginLeft: 24,
                                alignItems: 'flex-start', height: "20%"}}>
                        <ButtonPrimary 
                            style={{position: 'absolute', bottom: 0, height:40, width: '100%'}}
                            onPress={() => navigation.navigate('JoinTeam', {game: games.filter(g => g.id == selectedGame)[0], onGoBack: {refetch} })}>
                            <Text style={{color: '#fff'}}>
                                Join a Team
                            </Text>
                        </ButtonPrimary>
                        <ButtonSecondary
                            style={{position: 'absolute', bottom: 60 , height:40, width: '100%'}}
                            onPress={() => navigation.navigate('CreateTeam', {game: games.filter(g => g.id == selectedGame)[0], onGoBack: {refetch} })}>
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


