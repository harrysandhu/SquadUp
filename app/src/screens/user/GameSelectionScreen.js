import React, {useState} from "react";
import { View, Button, Text, StyleSheet, Image, Alert, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import {HFlex, VFlex, ImgSize, TopTitle, BackArrow, ButtonView, ButtonPrimary, ImgContainer, ButtonJoin} from '../../components/styled/components'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input, Button as RNButton, Header } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome'
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { GET_ALL_GAMES, GET_USER_BY_EMAIL } from "../../apollo/queries";
import { JOIN_GAME } from "../../apollo/mutations";
import { ActivityIndicator } from "react-native";


export const GameSelectionScreen = ({navigation, route}) => {
    const {data, error, loading} = useQuery(GET_ALL_GAMES)
    const client = useApolloClient();
    let {user} = route.params
    console.log(route.params)
    console.log(user.profile.id, user.profile.games)
    let count = 0

    const games = []
    
    if (loading) {
        return (
          <VFlex>
            <ActivityIndicator />
          </VFlex>
        )
      }
    
    for(let game of data.games){
    if (user.profile.games.filter(g => g.name == game.name).length == 0){

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
                            onPress={() => Alert.alert("Join Game", 
                            `Do you want to join ${game.name}`, 
                            [
                                {
                                    text: 'Yes',
                                    onPress: async () => {
                                        try{
                                            let res = await client.mutate({
                                                mutation: JOIN_GAME, 
                                                variables: {
                                                    profileId: user.profile.id,
                                                    gId: game.id
                                                }
                                            })
                                            console.log(game)
                                        }catch(e){
                                            console.log("ERROR AT JOINGAME", e)
                                        }
                                        route.params.onGoBack()
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
                                source={{uri : game.coverUrl}} 
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
                        onPress={() => {navigation.pop()}}
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
                
                statusBarProps={{}}
                />
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
