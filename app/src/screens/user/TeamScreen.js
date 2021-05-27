import React, {useState} from "react";
import { View, Button, Text, StyleSheet, Image, Alert, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import {HFlex, VFlex, ImgSize, TopTitle, BackArrow, ButtonView, ButtonPrimary, ImgContainer, ButtonJoin, UserContainer} from '../../components/styled/components'
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Input, Button as RNButton, Header } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome'
import { GET_AVAILABLE_TEAMS } from "../../apollo/queries";
import { useQuery } from "@apollo/client";
import { ActivityIndicator } from "react-native";

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





export const TeamScreen = ({route, navigation}) => {

    let count = 0
    const teams = []
    
    let {game} = route.params

    let {onGoBack} = route.params

    const {data, error, loading, refetch} = useQuery(GET_AVAILABLE_TEAMS, {
        variables:{
         gId: game.id
        },
        fetchPolicy: 'network-only'
    })
if (loading) {
      return (
        <VFlex>
          <ActivityIndicator />
        </VFlex>
      )
    }

    renderUser = ({item}) => {
        return (
            <UserContainer key={item.id}>
                <VFlex style={{width:'auto'}}>
                                        <Image 
                                            source={{uri: item.avatarUrl}}
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
                                            {item.username}
                                        </Text>
                                        </VFlex>
                                      
                                       
            </UserContainer>
        )
    }



    let allteams = data.get_available_teams
  

    for(let team of allteams){
        console.log(team.name)
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
                                    ! {team.name}
                                </Text>
                                </HFlex>
                                <HFlex style={{justifyContent:'flex-start'}}>

                                <FlatList 
                                horizontal={true}
                                data={team.users}
                                keyExtractor={(user) => user.length > 0 ? user.id : ""}
                                renderItem={renderUser}
                            />
                                        
                                    
                            

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
                        onPress={() => navigation.goBack()}
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
                
                <ButtonPrimary>
                   <Text style ={{color: 'white'}}>Next</Text> 
                </ButtonPrimary>
                </VFlex>
                
            </ScrollView>
        
   
    </View>
  );
};
