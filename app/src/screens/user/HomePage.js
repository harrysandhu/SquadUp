// TODO : Clean up - fix indentation
import React, {useState, useEffect} from 'react'
import { View, Text, Button, Image, KeyboardAvoidingView, Platform, Dimensions, Keyboard, Animated } from 'react-native'
import { TopText, FlexView, InputTF, VFlex, HFlex, AtLabel, 
         BackArrow, InputDOB, ButtonPrimary, ButtonView, 
         ImageSelectorTouchable, TopTitle, TopBar, HamArrow } from 'components/styled/components';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker';
import { Input as InputEl } from "react-native-elements";
import { Header, Icon as Icc } from "react-native-elements";
import * as SecureStore from 'expo-secure-store'
import {useQuery, useMutation, gql, useApolloClient } from "@apollo/client"
import DeviceInfo from 'react-native-device-info';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import AppModel from '../../models/AppModel';
import DrawerView from "components/DrawerView"
import { GET_ALL_MESSAGES, GET_USER_BY_EMAIL } from '../../apollo/queries';
import { ActivityIndicator } from 'react-native';
import { ChatPage } from './ChatPage';



export function HomePage({navigation}){


//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    let [x, setX] = useState(new Animated.Value(-windowWidth*2))
    let [mrc, setMrc] = useState(-45)
    let [vis, setVis] = useState(false)
    let [drawerOpen, setDrawerOpen] = useState(false)



    slideIn = () => {
        setDrawerOpen(true)
        Animated.timing(x, {
            toValue: -windowWidth/2,
            duration: 250,
            useNativeDriver: true
        }).start()
    }

    slideOut = () => {
        setDrawerOpen(false)
        Animated.timing(x, {
            toValue: -windowWidth*2,
            duration: 250,
            useNativeDriver: true
        }).start()
    }

    getLeftComponent = () => {
        if(!drawerOpen){
            return  ( <HamArrow onPress={() => {drawerOpen ? slideOut() : slideIn()}}>
            <Icon name='server' size={25} style={{color:"white"}}/>
        </HamArrow>)
        }else{
            return ({})
        }
    }
 
    getRightComponent = () => {
     if(drawerOpen){
         return  ( <HamArrow onPress={() => {drawerOpen ? slideOut() : slideIn()}}>
         <Icon name='server' size={25} style={{color:"white"}}/>
     </HamArrow>)
     }else{
         return ({})
     }
 }
 ////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////////


    const userResult = useQuery(GET_USER_BY_EMAIL, {
        variables: {
            email: AppModel.userModel.email.getValue()
        }
    })

    if (userResult.error) {console.log("ERROR FETCHING")}
    if (userResult.loading) return null


    let user = userResult.data.userByEmail

    let {games} = userResult.data.userByEmail.profile
    let {teams} = userResult.data.userByEmail.profile

    let {refetch} = userResult

    let [activeGame, setActiveGame] = useState("")
    let [activeTeam, setActiveTeam] = useState("")
    let [activeChatId,setActiveChatId] = useState("")

    useEffect(() => {
        if (Object.entries(teams).length > 0 && Object.entries(games).length > 0){
            setActiveGame(games[0].id)
            for(let team of teams){
                console.log("chko", team)
                if(team.game.id == games[0].id){
                    setActiveTeam(team.id)
                    break;
                }
            }
        }
    
    }, [])
    console.log("initial state", activeGame, " lelo ", activeTeam)

    useEffect(() => {
        if (Object.entries(teams).length > 0 && Object.entries(games).length > 0){
            console.log("SHIT CHANGED", activeGame)

        }
    }, [activeGame])

    useEffect(() => {
        if (Object.entries(teams).length > 0 && Object.entries(games).length > 0){
            //get new chat
            for(let team of teams){
                if(team.id == activeTeam){
                   setActiveChatId(team.chat.id)
                    break;
                }
            }


        }
    }, [activeTeam])


    const chatResult = useQuery(GET_ALL_MESSAGES, {
            variables: {
                chatId: activeChatId
            }
    })





    console.log("ACTIVE GAME CHANGED", activeGame)
    console.log("HERE", chatResult)







    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070A1E'}}>
        <Animated.View
            style={[{zIndex: 100, width:"100%"}], {
                transform: [
                    {translateX: x}
                ]
            }}>
                <DrawerView navigation={navigation} games={games} teams={teams} slideOut={ (tId, gId) => {
                    setActiveTeam(tId)  
                    setActiveGame(gId)
                    slideOut()}} refetch={refetch}/> 
                
            </Animated.View>
            <Header
            barStyle="default"
            centerComponent={{}}
                // <VFlex style={drawerOpen ? {display: 'none'} :  {display: 'flex'}} >
                // <Text style={{color: "white", fontSize: 18, fontWeight: "500"}}>{games.filter(g => g.id == selectedGame)[0].name}</Text>
                //             <Text style={{color: "white", fontSize: 16, fontWeight: "300"}}>!{teams.filter(t => t.id == activeTeam)[0].teamId}</Text>
                //             </VFlex>
                
                centerContainerStyle={{alignItems: 'flex-start', justifyContent:'flex-start', marginLeft: "20%", top: 40, position: "absolute", width:'50%'}}
                containerStyle={{ zIndex: 0, position: "absolute", width: '100%', backgroundColor: 'none',top:0, borderBottomColor: "transparent"}}
                leftComponent={getLeftComponent()}
                leftContainerStyle={{paddingLeft: 10}}
                placement="center"
                rightComponent={getRightComponent()}
                rightContainerStyle={{paddingRight: 10}}
                
                statusBarProps={{}}
        />
         <VFlex style={{zIndex: -1}}>
           <ChatPage {...chatResult} /> 
        </VFlex>
        </View>
    )
}