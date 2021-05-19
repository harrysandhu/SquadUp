import React, {useState} from "react";
import { View, Button, Text, StyleSheet, Image, Alert, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import {HFlex, VFlex, ImgSize, TopTitle, BackArrow, ButtonView, ButtonPrimary, ImgContainer, ButtonJoin} from '../../components/styled/components'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input, Button as RNButton, Header } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome'

const usergames = {
    "123":{
        id: "123",
        name: "Among Us",
        gameId: "amongus",
        maxSize: 10,
        coverURL: require("../../../assets/images/amongUs.jpg")
    },
    "456":{
        id: "456",
        name: "Fall Guys",
        gameId: "fallguys",
        maxSize: 4,
        coverURL: require("../../../assets/images/fallGuy.jpeg")
    },
    "789":{
        id: "789",
        name: "Valheim",
        gameId: "valheim",
        maxSize: 10,
        coverURL: require("../../../assets/images/valheim.jpeg")
    },
    "012":{
        id: "012",
        name: "Rocket League",
        gameId: "rocketleague",
        maxSize: 10,
        coverURL: require("../../../assets/images/rocketLeague.jpg")
    },
    "696":{
        id: "696",
        name: "Overwatch",
        gameId: "overwatch",
        maxSize: 6,
        coverURL: require("../../../assets/images/goatSimulator.jpg")
    },
    "969": {
        id: "969",
        name: "Goat Simulator",
        gameId: "goatsimulator",
        maxSize: 20,
        coverURL: require("../../../assets/images/goatSimulator.jpg")
    },
    "444": {
        id: "444",
        name: "Binding Of Isaac",
        gameId: "bindingofisaac",
        maxSize: 4,
        coverURL: require("../../../assets/images/theBindingofIsaac.jpg")
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


export const GameSelectionScreen = () => {

    let count = 0
    const games = []
    
    for(let game of Object.values(usergames)){
        let i = (
                    <ImgSize 
                        key={
                            game.id
                        } 
                    >
                        <TouchableOpacity 
                            style={{
                                display: "flex", 
                                borderRadius: 15, 
                                overflow: "hidden", 
                                flexDirection: "column", 
                                justifyContent: "center",
                                alignItems: "center"
                            }} 
                            onPress={() => console.log("pressed: ", game.id)}
                        >
                            <ButtonJoin 
                                style={{
                                    position: "absolute", 
                                    zIndex: 100, 
                                    bottom : 0, 
                                    height: 45, 
                                    width: '100%'
                                }}
                            >
                                <Text 
                                    style={{
                                        color:"white"
                                    }}
                                >Join
                                </Text>
                            </ButtonJoin>
                            <Image 
                                source={
                                    game.coverURL
                                } 
                                style={{
                                    width: 150, 
                                    height: 200,  
                                    zIndex: 0, 
                                    borderRadius: 15
                                }} 
                            />
                        </TouchableOpacity>
                    </ImgSize>
            )
    
      
        games.push(i)
    }


  return (
        <View>
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
                            SELECT GAMES YOU PLAY
                    </TopTitle>
                    </VFlex>
                }
                centerContainerStyle={{}}
                containerStyle={{ 
                    width: '100%', 
                    height: 100, 
                    backgroundColor: '#a9a9a9', 
                    borderBottomColor: "transparent"
                }}
                leftComponent={   
                    <BackArrow 
                        onPress={() => {}}
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
                
                statusBarProps={{}}/
            >
            <ScrollView 
                style={{
                    backgroundColor: "grey", 
                    height: "100%"
                }}
            >
          
                <VFlex 
                    style={{
                        marginBottom:150
                    }}
                >
                    <ImgContainer >
                        {
                            games
                        }
                    </ImgContainer>
                
                </VFlex>
    
            </ScrollView>
   
    </View>
  );
};