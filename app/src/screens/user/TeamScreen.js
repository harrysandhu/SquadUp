import React, {useState} from "react";
import { View, Button, Text, StyleSheet, Image, Alert, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import {HFlex, VFlex, ImgSize, TopTitle, BackArrow, ButtonView, ButtonPrimary, ImgContainer, ButtonJoin, UserContainer} from '../../components/styled/components'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input, Button as RNButton, Header } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome'

const userteams = {
    "123":{
        id: "123",
        teamId: "t0mcr00se",
        teamName: "t0mcr00se",
        user1: require("../../../assets/images/avatar.png"),
        user1Id: "Mobez",
        user2: require("../../../assets/images/avatar.png"),
        user2Id: "Shubster",
        user3: require("../../../assets/images/avatar.png"),
        user3Id: "Mohib",
        user4: require("../../../assets/images/avatar.png"),
        user4Id: "Harman"
    },
    "456":{
        id: "456",
        teamId: "riders",
        teamName: "riders",
        user1: require("../../../assets/images/avatar.png"),
        user1Id: "Mobez",
        user2: require("../../../assets/images/avatar.png"),
        user2Id: "Shubster",
        user3: require("../../../assets/images/avatar.png"),
        user3Id: "Mohib",
        user4: require("../../../assets/images/avatar.png"),
        user4Id: "Harman"
    },
    "789":{
        id: "789",
        teamId: "defenderbots",
        teamName: "defenderbots",
        user1: require("../../../assets/images/avatar.png"),
        user1Id: "Mobez",
        user2: require("../../../assets/images/avatar.png"),
        user2Id: "Shubster",
        user3: require("../../../assets/images/avatar.png"),
        user3Id: "Mohib",
        user4: require("../../../assets/images/avatar.png"),
        user4Id: "Harman"
    },
    "012":{
        id: "012",
        teamId: "theLeaguers",
        teamName: "theLeaguers",
        user1: require("../../../assets/images/avatar.png"),
        user1Id: "Mobez",
        user2: require("../../../assets/images/avatar.png"),
        user2Id: "Shubster",
        user3: require("../../../assets/images/avatar.png"),
        user3Id: "Mohib",
        user4: require("../../../assets/images/avatar.png"),
        user4Id: "Harman"
    },
    "696":{
        id: "696",
        teamId: "overwatchb",
        teamName: "overwatchb",
        user1: require("../../../assets/images/avatar.png"),
        user1Id: "Mobez",
        user2: require("../../../assets/images/avatar.png"),
        user2Id: "Shubster",
        user3: require("../../../assets/images/avatar.png"),
        user3Id: "Mohib",
        user4: require("../../../assets/images/avatar.png"),
        user4Id: "Harman"
    },
    "969": {
        id: "969",
        teamId: "grizbois",
        teamName: "grizbois",
        user1: require("../../../assets/images/avatar.png"),
        user1Id: "Mobez",
        user2: require("../../../assets/images/avatar.png"),
        user2Id: "Shubster",
        user3: require("../../../assets/images/avatar.png"),
        user3Id: "Mohib",
        user4: require("../../../assets/images/avatar.png"),
        user4Id: "Harman"
        
    },
    "444": {
        id: "444",
        teamId: "goated team",
        teamName: "goated team",
        user1: require("../../../assets/images/avatar.png"),
        user1Id: "Mobez",
        user2: require("../../../assets/images/avatar.png"),
        user2Id: "Shubster",
        user3: require("../../../assets/images/avatar.png"),
        user3Id: "Mohib",
        user4: require("../../../assets/images/avatar.png"),
        user4Id: "Harman"
    }
    
}





export const TeamScreen = () => {

    let count = 0
    const teams = []
    
    for(let team of Object.values(userteams)){
        let i = (
                    <ImgSize 
                        key={
                            team.id
                        } 
                    >
                        <TouchableOpacity 
                            style={{
                                display: "flex", 
                                borderRadius: 10, 
                                overflow: "hidden", 
                                flexDirection: "row", 
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                marginTop: -20
                            }} 
                            onPress={() => console.log("pressed: ", game.id)}
                        >   
                            <VFlex 
                                style={{
                                    color: "white",
                                    backgroundColor: "#1e2230",
                                    padding: 10,
                                     
                                }}
                            >
                                <HFlex style={{flexStart:'flex-start', alignItems:'flex-start'}}>
                                <Text 
                                    style={{
                                        color: "white",
                                        width:'100%',
                                        fontSize: 17,
                                        padding:3
                                    }}
                                    
                                >
                                    ! {team.teamName}
                                </Text>
                                </HFlex>
                                <HFlex style={{justifyContent:'flex-start'}}>
                                    <UserContainer 
                                    
                                    >
                                        <VFlex style={{width:'auto'}}>
                                        <Image 
                                            source={
                                                team.user1
                                            }
                                            style={{
                                                resizeMode:"contain",
                                                width: 50,
                                                height:50,
                                                
                                            }}
                                        >
                                        </Image>
                                        <Text 
                                            style={{
                                                color:"white"
                                            }}
                                        >
                                            {team.user1Id}
                                        </Text>
                                        </VFlex>
                                      
                                       
                                    </UserContainer>
                                    <UserContainer>  
                                    <VFlex style={{width:'auto'}}>
                                        <Image 
                                            source={
                                                team.user1
                                            }
                                            style={{
                                                resizeMode:"contain",
                                                width: 50,
                                                height:50
                                            }}
                                        >
                                        </Image>
                                        <Text
                                            style={{
                                                color:"white"
                                            }}
                                        >
                                            {team.user2Id}
                                        </Text>
                                        </VFlex>
                                    </UserContainer>
                                    <UserContainer
                                    
                                    >
                                           <VFlex style={{width:'auto'}}>
                                        <Image 
                                            source={
                                                team.user1
                                            }
                                            style={{
                                                resizeMode:"contain",
                                                width: 50,
                                                height:50
                                            }}
                                        >
                                        </Image>
                                        <Text 
                                            style={{
                                                color:"white"
                                            }}
                                        >
                                            {team.user3Id}
                                        </Text>
                                        </VFlex>
                                    </UserContainer>
                                    <UserContainer>
                                    <VFlex style={{width:'auto'}}>
                                        <Image 
                                            source={
                                                team.user1
                                            }
                                            style={{
                                                resizeMode:"contain",
                                                width: 50,
                                                height:50
                                            }}
                                        >
                                        </Image>
                                        <Text 
                                            style={{
                                                color:"white"
                                            }}
                                        >
                                            {team.user4Id}
                                        </Text>
                                        </VFlex>
                                    </UserContainer>    

                                </HFlex>
                            </VFlex>
                            
                        </TouchableOpacity>
                    </ImgSize>
            )
    
      
        teams.push(i)
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
                            JOIN A TEAM
                    </TopTitle>
                    </VFlex>
                }
                centerContainerStyle={{}}
                containerStyle={{ 
                    width: '100%', 
                    height: 100, 
                    backgroundColor: '#070A1E', 
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
                    backgroundColor: "#070A1E", 
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
                            teams
                        }
                    </ImgContainer>
                
                </VFlex>
    
            </ScrollView>
   
    </View>
  );
};
