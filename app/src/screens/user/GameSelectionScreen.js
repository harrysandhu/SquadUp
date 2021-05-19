import React from "react";
import { View, Button, Text, StyleSheet, Image, Alert, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import {HFlex, VFlex, ImgSize, TopTitle, BackArrow, ButtonView, ButtonPrimary} from '../../components/styled/components'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input, Button as RNButton, Header } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome'

export const GameSelectionScreen = () => {
  return (
      <View>
          <Header
            barStyle="default"
            centerComponent={
                <VFlex>
                <TopTitle style={{fontSize:18, color: "white"}}>SELECT GAMES YOU PLAY</TopTitle>
                </VFlex>
                }
            centerContainerStyle={{}}
            containerStyle={{ width: '100%', height: 100, backgroundColor: '#a9a9a9', borderBottomColor: "transparent"}}
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
      <ScrollView style={{backgroundColor: "grey", height: "100%"}}>
          
      <VFlex style={{marginBottom:150}}>
        
        <HFlex>
            <ImgSize>
                <TouchableOpacity onPress={() => Alert.alert("Alert Title", "Yeur")}>
                    <Image source={require("../../../assets/images/amongUs.jpg")} style={{width: 150, height: 200}}></Image>
                </TouchableOpacity>
                </ImgSize>
                <ImgSize>
                <TouchableOpacity onPress={() => Alert.alert("Alert Title", "Yeur")}>
                    <Image source={require("../../../assets/images/fallGuy.jpeg")}  style={{width: 150, height: 200}}></Image>
                </TouchableOpacity>
                </ImgSize>
        </HFlex>
        <HFlex>
            <ImgSize>
                <TouchableOpacity onPress={() => Alert.alert("Alert Title", "Yeur")}>
                    <Image source={require("../../../assets/images/goatSimulator.jpg")} style={{width: 150, height: 200}}></Image>
                </TouchableOpacity>
                </ImgSize>
                <ImgSize>
                <TouchableOpacity onPress={() => Alert.alert("Alert Title", "Yeur")}>
                    <Image source={require("../../../assets/images/rocketLeague.jpg")}  style={{width: 150, height: 200}}></Image>
                </TouchableOpacity>
                </ImgSize>
        </HFlex>
        <HFlex>
            <ImgSize>
                <TouchableOpacity onPress={() => Alert.alert("Alert Title", "Yeur")}>
                    <Image source={require("../../../assets/images/theBindingofIsaac.jpg")} style={{width: 150, height: 200}}></Image>
                </TouchableOpacity>
                </ImgSize>
                <ImgSize>
                <TouchableOpacity onPress={() => Alert.alert("Alert Title", "Yeur")}>
                    <Image source={require("../../../assets/images/valheim.jpeg")}  style={{width: 150, height: 200}}></Image>
                </TouchableOpacity>
                </ImgSize>
        </HFlex>
        
        
            
        
    </VFlex>
    
    </ScrollView>
    <ButtonView style={{marginBottom: 90}}>
        <ButtonPrimary style={{ position: "absolute"}}>
            <Text style={{color:"white"}}>CONTINUE</Text>
        </ButtonPrimary>
    </ButtonView>
    </View>
  );
};
