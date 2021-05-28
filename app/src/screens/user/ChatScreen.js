import React, {useState} from "react";
import { View, Button, Text, StyleSheet, Image, KeyboardAvoidingView, Platform,
  TouchableWithoutFeedback, Keyboard, ScrollView, useWindowDimensions, TextInput, FlatList } from "react-native";
import { TextBox, Current, Friend, HFlexT, VFlexT, TextColor, Message, VFlex } from 'components/styled/components';
import { HFlex, PicFlex,ButtonSecondary, TopTitle, BackArrow } from './../../components/styled/components';
import { Input, Button as RNButton, Header } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome'

const chatData  = {
  "132": {
    id: "132",
    message: "aaaaasevsevs aaaaa dsgvsdbfaaaaaaaaaa",
    attachment: [],
    from: {
        userId: "user1",
        name: "Bob Kumar",
        username: "bkbk"
    },
    to: {
      userId: "user2",
      name: "Taylor Smooth",
      username: "tsmooth"
    },
    sentDT: "2021-05-28T10:26:39.359Z",
    receivedDT: "2021-05-28T10:28:39.359Z"
  },
  "133": {
    id: "133",
    message: "aaaaasevsevs aaaaa dsgvsdbfaaaaaaaaaa",
    attachment: [],
    from: {
        userId: "user1",
        name: "Bob Kumar",
        username: "bkbk"
    },
    to: {
      userId: "user2",
      name: "Bob Kumar",
      username: "bkbk "

    },
    sentDT: "2021-05-28T10:36:39.359Z",
    receivedDT: "2021-05-28T10:37:39.359Z"
  },
  "134": {
    id: "134",
    message: "aaaaasevsevs aaaaa dsgvsdbfaaaaaaaaaa",
    attachment: [],
    from: {
        userId: "user1",
        name: "Bob Kumar",
        username: "bkbk"
    },
    to: {
      userId: "user2",
      name: "Taylor Smooth",
      username: "tsmooth"
    },
    sentDT: "2021-05-28T10:39:39.359Z",
    receivedDT: "2021-05-28T10:28:40.359Z"
  },
  "135": {
    id: "135",
    message: "aaaaasevsevs aaaaa dsgvsdbfaaaaaaaaaa",
    attachment: [],
    from: {
        userId: "user1",
        name: "Bob Kumar",
        username: "bkbk"
    },
    to: {
      userId: "user2",
      name: "Taylor Smooth",
      username: "tsmooth"
    },
    sentDT: "2021-05-28T10:39:39.359Z",
    receivedDT: "2021-05-28T10:28:40.359Z"
  },
  "136": {
    id: "136",
    message: "aaaaasevsevs aaaaa dsgvsdbfaaaaaaaaaa",
    attachment: [],
    from: {
        userId: "user1",
        name: "Bob Kumar",
        username: "bkbk"
    },
    to: {
      userId: "user2",
      name: "Taylor Smooth",
      username: "tsmooth"
    },
    sentDT: "2021-05-28T10:39:39.359Z",
    receivedDT: "2021-05-28T10:28:40.359Z"
  },
  "137": {
    id: "137",
    message: "aaaaasevsevs aaaaa dsgvsdbfaaaaaaaaaa",
    attachment: [],
    from: {
        userId: "user1",
        name: "Bob Kumar",
        username: "bkbk"
    },
    to: {
      userId: "user2",
      name: "Taylor Smooth",
      username: "tsmooth"
    },
    sentDT: "2021-05-28T10:39:39.359Z",
    receivedDT: "2021-05-28T10:28:40.359Z"
  },
  "138": {
    id: "138",
    message: "aaaaasevsevs aaaaa dsgvsdbfaaaaaaaaaa",
    attachment: [],
    from: {
        userId: "user1",
        name: "Bob Kumar",
        username: "bkbk"
    },
    to: {
      userId: "user2",
      name: "Taylor Smooth",
      username: "tsmooth"
    },
    sentDT: "2021-05-28T10:39:39.359Z",
    receivedDT: "2021-05-28T10:28:40.359Z"
  },
  "139": {
    id: "139",
    message: "aaaaasevsevs aaaaa dsgvsdbfaaaaaaaaaa",
    attachment: [],
    from: {
        userId: "user1",
        name: "Bob Kumar",
        username: "bkbk"
    },
    to: {
      userId: "user2",
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
  const [term, updateTerm] = useState('');

let currentUser = "user2"

let count = 0
    const chats = []
    
    for(let chat of Object.values(chatData)){
        let i = (
              <View>
                <HFlexT style = {{paddingRight: 15}}>
  
                  <PicFlex>
                    <Image source={require("../../../assets/images/avataaars.png")} style={{height:100, width:75, resizeMode:"contain", paddingRight: 30}}/>
                  </PicFlex>
  
                  <VFlexT>
                    <View style={{TextBox}}> 
                      <HFlexT>
                        <Text 
                          style = {{
                            fontSize: 18, 
                            marginTop: 10, 
                            color: "white", 
                            paddingLeft: 0
                          }}
                        >
                          {chat.from.name}
                        </Text>
                      </HFlexT>
                      <View 
                        style={{
                          flexDirection:'row', 
                          width: windowWidth - 200, 
                          padding: '2%'
                          }}
                        > 
                        <Message style={{
                          flex: 1,
                          flexShrink: 1, 
                          lineHeight: 18 }}
                        >
                          {chat.message}
                        </Message>
                      </View>
  
                
                </View>
                </VFlexT>
                </HFlexT>
              </View>
            )
          
      
        chats.push(i)
    }

  return (
    
    
    <View
      key = {chatData.id} 
      style={{
        TextBox,
        Friend,
        Current, 
        flex: 1, 
        backgroundColor: '#070A1E', 
        minHeight: Math.round(windowHeight)}}>
       <Header
            barStyle="default"
            centerComponent={
                <VFlex>
                <TopTitle>Rob Kumar</TopTitle>
                </VFlex>
                }
            centerContainerStyle={{}}
            containerStyle={{ 
              width: '100%', 
              height: 100, 
              backgroundColor: ' #a9a9a9', 
              borderBottomColor: "transparent"}}
            leftComponent={{}}
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
          <View>
            {chats}
          </View>
        </ScrollView>

      <VFlex style={{ position: "absolute", bottom: 0, backgroundColor: '#070A1E'}}>
        <HFlex style={{width:'80%'}}>
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

