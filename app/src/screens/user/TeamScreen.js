import React, {useState} from "react";
import { View, Button, Text, StyleSheet, Image, Alert, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import {HFlex, VFlex, ImgSize, TopTitle, BackArrow, ButtonView, ButtonPrimary, ImgContainer, ButtonJoin, UserContainer} from '../../components/styled/components'
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Input, Button as RNButton, Header } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome'
import { GET_AVAILABLE_TEAMS } from "../../apollo/queries";

import { JOIN_TEAM } from "../../apollo/mutations";
import { useApolloClient, useQuery } from "@apollo/client";
import { ActivityIndicator } from "react-native";
import AppModel from "../../models/AppModel";



export const TeamScreen = ({navigation, route}) => {

    let count = 0
    const teams = []
    const client = useApolloClient();
    let {game} = route.params
    let {user} = route.params

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
    console.log("alllll", allteams)
    for(let team of allteams){
        console.log(team)

        let arr = []
        for(let u in team.users){
            arr.push(team.users[u].id)
        }
        console.log(arr)
        if(!arr.includes(AppModel.userProfileModel.id.getValue())){
            if(team.name != "Default"){
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
                                marginTop: -20,
                                zIndex:100
                            }} 
                            onPress={() => Alert.alert("Join Game", 
                            `Do you want to join ${team.name}`, 
                            [
                                {
                                    text: 'Yes',
                                    onPress: async () => {
                                        try{
                                            let res = await client.mutate({
                                                mutation: JOIN_TEAM, 
                                                variables: {
                                                    profileId: AppModel.userProfileModel.id.getValue(),
                                                    gId: team.game.id,
                                                    tId: team.id
                                                }
                                            })
                                            console.log(game)
                                        }catch(e){
                                            console.log("ERROR AT JOINGAME", e)
                                        }
                                        route.params.onGoBack.refetch()
                                        navigation.pop()
                                    }
                                },
                                {
                                    text: "Cancel",
                                    style: "cancel",
                                }
                            ]
                            )}
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
                                }
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
            
                </VFlex>
                
            </ScrollView>
        
   
    </View>
  );
};
