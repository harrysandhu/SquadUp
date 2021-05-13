import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { TextBox, Current, Friend, HFlexT, VFlexT, TextColor } from 'components/styled/components';
import { HFlex, PicFlex } from './../../components/styled/components';

const chatData  = {
  "123": {
    message: "Hello",
    attachment: [],
    from: {
        id: "user1",
        name: "Bob Kumar",
        username: "bkbk"
    },
    to: {
      id: "user2",
      name: "Taylor Smooth",
      username: "tsmooth"
    },
    sentDT: "2021-05-28T10:26:39.359Z",
    receivedDT: "2021-05-28T10:28:39.359Z"
  },
  "124": {
    message: "yo",
    attachment: [],
    from: {
      id: "user2",
      name: "Taylor Smooth",
      username: "tsmooth "
    },
    to: {
      id: "user1",
      name: "Bob Kumar",
      username: "bkbk "

    },
    sentDT: "2021-05-28T10:36:39.359Z",
    receivedDT: "2021-05-28T10:37:39.359Z"
  },
  "125": {
    message: "kiddaann",
    attachment: [],
    from: {
        id: "user1",
        name: "Bob Kumar",
        username: "bkbk"
    },
    to: {
      id: "user2",
      name: "Taylor Smooth",
      username: "tsmooth"
    },
    sentDT: "2021-05-28T10:39:39.359Z",
    receivedDT: "2021-05-28T10:28:40.359Z"
  }
}



export const ChatScreen = () => {

  
let currentUser = "user2"

  return (
    
    
    <View style={{TextBox,Friend,Current, flex: 1, backgroundColor: '#070A1E'}}>
      
        
        {
        Object.keys(chatData).map(key => {
          return (
            <View style = {TextBox, Friend, Current}>
              <HFlexT>
                <PicFlex>
                  <TextColor>Avatar</TextColor>
                </PicFlex>
                <VFlexT>
            <View key={key} style={{TextBox}, (
              
              <Text> 
                chatData[key].from.id == currentUser)
              </Text>)}>
              
              <Text>
                    <HFlexT>
                    <TextColor>From: {chatData[key].from.name} @{chatData[key].from.username}</TextColor>
                    </HFlexT>
                    <HFlexT>
                    <TextColor>{chatData[key].message} </TextColor>
                    </HFlexT>

              </Text>
              </View>
              </VFlexT>
              </HFlexT>
            </View>
          )
        
        })
      }
    </View>
  );
};

