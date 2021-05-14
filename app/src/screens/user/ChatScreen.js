import React, {useState} from "react";
import { View, Button, Text, StyleSheet, Image, KeyboardAvoidingView, Platform,TouchableWithoutFeedback, Keyboard, ScrollView, useWindowDimensions } from "react-native";
import { TextBox, Current, Friend, HFlexT, VFlexT, TextColor, Message, VFlex } from 'components/styled/components';
import { HFlex, PicFlex,ButtonSecondary, TopTitle, BackArrow } from './../../components/styled/components';
import { Input, Button as RNButton, Header } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome'

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
    message: "aaaaasevsevs aaaaa dsgvsdbfaaaaaaaaaa",
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
  },
  "126": {
    message: "aaaaasevsevsfdsfdsgfsdggsf aaaaa dsgvsdbfaaaaaaaaaa, aaaaasevsevsfdsfdsgfsdggsf aaaaa dsgvsdbfaaaaaaaaaaaaaaasevsevsfdsfdsgfsdggsf aaaaa dsgvsdbfaaaaaaaaaaaaaaasevsevsfdsfdsgfsdggsf aaaaa dsgvsdbfaaaaaaaaaaaaaaasevsevsfdsfdsgfsdggsf aaaaa dsgvsdbfaaaaaaaaaaaaaaasevsevsfdsfdsgfsdggsf aaaaa dsgvsdbfaaaaaaaaaaaaaaasevsevsfdsfdsgfsdggsf aaaaa dsgvsdbfaaaaaaaaaaaaaaasevsevsfdsfdsgfsdggsf aaaaa dsgvsdbfaaaaaaaaaaaaaaasevsevsfdsfdsgfsdggsf aaaaa dsgvsdbfaaaaaaaaaaaaaaasevsevsfdsfdsgfsdggsf aaaaa dsgvsdbfaaaaaaaaaaaaaaasevsevsfdsfdsgfsdggsf aaaaa dsgvsdbfaaaaaaaaaaaaaaasevsevsfdsfdsgfsdggsf aaaaa dsgvsdbfaaaaaaaaaaaaaaasevsevsfdsfdsgfsdggsf aaaaa dsgvsdbfaaaaaaaaaaaaaaasevsevsfdsfdsgfsdggsf aaaaa dsgvsdbfaaaaaaaaaaaaaaasevsevsfdsfdsgfsdggsf aaaaa dsgvsdbfaaaaaaaaaa",
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
  },
  "127": {
    message: "aaaaasevsevs aaaaa dsgvsdbfaaaaaaaaaa",
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
  },
  "128": {
    message: "aaaaasevsevs aaaaa dsgvsdbfaaaaaaaaaa",
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
  },
  "129": {
    message: "aaaaasevsevs aaaaa dsgvsdbfaaaaaaaaaa",
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
  },
  "139": {
    message: "aaaaasevsevs aaaaa dsgvsdbfaaaaaaaaaa",
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
  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().width;
  let [inputPadding, setInputPadding] = useState(0)
let currentUser = "user2"

  return (
    
    
    <View style={{TextBox,Friend,Current, flex: 1, backgroundColor: '#070A1E', minHeight: Math.round(windowHeight)}}>
       <Header
            barStyle="default"
            centerComponent={
                <VFlex>
                <TopTitle>Rob Kumar</TopTitle>
                </VFlex>
                }
            centerContainerStyle={{}}
            containerStyle={{ width: '100%', height: 100, backgroundColor: 'none', borderBottomColor: "transparent"}}
            leftComponent={   
                <BackArrow onPress={() => {}}>
                    <Icon name='angle-left' size={25} style={{color:"white"}}/>
                </BackArrow>
                }
            placement="center"
            rightComponent={{}}
            rightContainerStyle={{}}
            
            statusBarProps={{}}
    />
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}
    >
      
      <TouchableWithoutFeedback onPress={() => {
         setInputPadding(0)
        Keyboard.dismiss
         }
      }>
        <VFlex>
          <ScrollView>

        {
        Object.keys(chatData).map(key => {
          return (
            <View>
              <HFlexT style = {{paddingRight: 15}}>

                <PicFlex>
                <Image source={require("../../../assets/images/avataaars.png")} style={{height:100, width:75, resizeMode:"contain", paddingRight: 30}}/>
                </PicFlex>

                <VFlexT>
            <View key={key} style={{TextBox}, (
              
              <Text> 
                chatData[key].from.id == currentUser)
              </Text>)}>
              
             
                    <HFlexT>
                    <Text style = {{fontSize: 18, marginTop: 10, color: "white", paddingLeft: 0}}>{chatData[key].from.name}</Text>
                    </HFlexT>
                    <View style={{flexDirection:'row', width: windowWidth - 200, padding: '2%'}}> 
                    <Message style={{flex: 1,flexShrink: 1, lineHeight: 18 }}>
                      {chatData[key].message}
                    </Message>
                    </View>

              
              </View>
              </VFlexT>
              </HFlexT>
            </View>
          )
        
        })
      }
      </ScrollView>

      <VFlex style={{ position: "absolute", bottom: 0, backgroundColor: '#070A1E'}}>
        <HFlex style={{width:'90%'}}>
          <Input
            containerStyle={{color:'#fff'}}
            disabledInputStyle={{ background: "#ddd" }}
            inputContainerStyle={{}}
            errorStyle={{}}
            errorProps={{}}
            inputStyle={{color:'#fff'}}
            labelStyle={{}}
            labelProps={{}}
            rightIconContainerStyle={{}}
            placeholder="Enter Message"
            onFocus = {() => setInputPadding(80)}
            onBlur = {() => setInputPadding(0)}
              />

<RNButton
      buttonStyle={{ width: 30, height: 30 }}
      containerStyle={{  marginTop: -30, paddingRight: 10}}
      disabledStyle={{
        borderWidth: 2,
        borderColor: "#00F"
      }}
      disabledTitleStyle={{ color: "#00F" }}
      linearGradientProps={null}
      icon={  <Icon name='angle-right' size={15} style={{color:"white"}}/>}
      iconContainerStyle={{ background: "#000" }}
      loadingProps={{ animating: true }}
      loadingStyle={{}}
      onPress={() => {
        setInputPadding(0)
        Keyboard.dismiss()
      }}
      titleProps={{}}
    />


              </HFlex>
            </VFlex>
        </VFlex>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
      
    </View>
  );
};

