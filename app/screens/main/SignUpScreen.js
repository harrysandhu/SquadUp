// TODO : Clean up - fix indentation
import React, {useState} from 'react'
import {View, Text, Button, Image} from 'react-native'
import { TopText, BackArrow, HFlex } from '../../components/styled/components';
import { ButtonPrimary, ButtonSecondary, ButtonView, VFlex, LogoImage, TopTitle, ButtonGoogle, ButtonFacebook} from '../../components/styled/components';
import Icon from 'react-native-vector-icons/FontAwesome'

import { Header, Icon as Icc } from "react-native-elements";
// export function SignUpScreen({navigation}){
//     return (
//         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070A1E'}}>
//             <TopText>
//                 <Text style={{color:"white"}}>SIGN UP</Text>
//             </TopText>



//             <Button 
//                 title="Profile Completion" 
//                 onPress={() => navigation.navigate('Completion')} />
//         </View>
//     );
// }

export function SignUpScreen({navigation}) {


    return (
        <View style={{flex: 1, backgroundColor: '#070A1E'}}>
       <Header
            barStyle="default"
            centerComponent={
                <VFlex>
                <TopTitle>SIGN UP</TopTitle>
                </VFlex>
                }
            centerContainerStyle={{}}
            containerStyle={{ width: '100%', backgroundColor: 'none', borderBottomColor: "transparent"}}
            leftComponent={   
                <BackArrow onPress={() => navigation.goBack()}>
                    <Icon name='angle-left' size={25} style={{color:"white"}}/>
                </BackArrow>
                }
            placement="center"
            rightComponent={{}}
            rightContainerStyle={{}}
            
            statusBarProps={{}}
    />
    
        <VFlex style={{paddingTop:'15%'}}>
            <Image source={require("../../assets/images/getstarted.png")} style={{height:360, width:360, resizeMode:"contain"}}/>
        </VFlex>
        <ButtonView>
            <ButtonGoogle onPress={() => navigation.navigate('Completion')}>
            <HFlex>
                <Icon name='google' size={20} style={{color:"white", paddingRight:20}}/>
                <Text style={{color:"white"}}>Sign Up with Google</Text>
                </HFlex>
                
            </ButtonGoogle>
            <ButtonFacebook onPress={() => navigation.navigate('Completion')}>
            <HFlex>
                <Icon name='facebook-f' size={20} style={{color:"white", paddingRight:20}}/>
                <Text style={{color:"white"}}>Sign Up with Facebook</Text>
                </HFlex>
            </ButtonFacebook>
        </ButtonView>
        </View>
    )
}