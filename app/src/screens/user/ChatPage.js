// TODO : Clean up - fix indentation
import React, {useState, useEffect} from "react";
import { View, Button, Text, StyleSheet, Image, KeyboardAvoidingView, Platform,
  TouchableWithoutFeedback, Keyboard, ScrollView, useWindowDimensions, TextInput, FlatList } from "react-native";
import { TextBox, Current, Friend, HFlexT, VFlexT, TextColor, Message, VFlex } from 'components/styled/components';
import { HFlex, PicFlex,ButtonSecondary, TopTitle, BackArrow } from './../../components/styled/components';
import { Input, Button as RNButton, Header } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome'





export function ChatPage(res) {
    const windowHeight = useWindowDimensions().height;
    const windowWidth = useWindowDimensions().width;
    let [inputPadding, setInputPadding] = useState(0)
    const [term, updateTerm] = useState('');


    let {data, error, loading } = res
    if(error) console.log("error", error)
    if (loading){
        return ( 
        <VFlex>
            <Text>Loading</Text>
        </VFlex>)
    }
    console.log(data)

    // useEffect(() => {
       
    //     console.log("GOT THEM PR", data)
    // }, [])

    return (
       
    
    <View
      style={{
        TextBox,
        Friend,
        Current, 
        flex: 1, 
        backgroundColor: '#070A1E', 
        height:'100%'
      }}>
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
            <Text>fsdfsd</Text>
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
    )
}