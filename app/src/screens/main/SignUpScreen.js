// TODO : Clean up - fix indentation

// React UI Components
import React, {useState, useEffect} from 'react'
import {View, Text, Button, Image} from 'react-native'
import { TopText, BackArrow, HFlex } from 'components/styled/components';
import { ButtonPrimary, 
    ButtonSecondary, 
    ButtonView, 
    VFlex, 
    LogoImage, 
    TopTitle, 
    ButtonGoogle, 
    ButtonFacebook} from  'components/styled/components';
    import Icon from 'react-native-vector-icons/FontAwesome'
import { Header, Icon as Icc } from "react-native-elements";


// Utils
import * as SecureStore from 'expo-secure-store'
import DeviceInfo from 'react-native-device-info';


// Firebase
import { firebaseConfig } from 'app/firebase.config';
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton
} from '@react-native-google-signin/google-signin'; 
import useObservable from '../../utils/useObservable';
import AppController from '../../controllers/AppController';
import AppModel from '../../models/AppModel';
import { Provider } from 'utils/constants';
import { Alert } from 'react-native';
GoogleSignin.configure(firebaseConfig);


export function SignUpScreen({navigation}){
    const [initializing, setInitializing] = useState(true); 
    const error = useObservable(AppModel.userModel.error)
    const [provider, setProvider] = useState(Provider.GOOGLE)
    const route = useObservable(AppModel.userModel.route)
    const dID = useObservable(AppModel.deviceModel.id)
    const [buttonState, setButtonState] = useState(false)
    console.log("ROUTE: ", route)
    async function onAuthStateChanged(user) {
       
        let userInput = {}
        if(user != null){
            if (provider == Provider.GOOGLE){
                userInput.name = user.displayName
                userInput.email = user.email
                userInput.avatarUrl = user.photoURL
                userInput.userId = user.uid
                userInput.dID = dID
            }
            try{
                console.log("THIS IS RUNNING", AppModel.userModel.route.getValue())
                if("userId" in userInput){
                    await AppController.user.signUp(userInput)
                    console.log("navigating to ...", AppModel.userModel.route.getValue())
                    navigation.navigate(AppModel.userModel.route.getValue())
                    console.log("we herer")   
                } 
            }catch(e){
                console.log(e)
                Alert.alert("Something went wrong", e);
            }
            

        }
      
    if (initializing) setInitializing(false);
    
    }

    useEffect(() => {
        // auth().signOut().then(() => {
        //     console.log("signed out yo")
        // })
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);




    async function onGoogleButtonPress() {
        setProvider(Provider.GOOGLE)
        setButtonState(true)
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    }

    if (initializing) return null;



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
    
            <VFlex 
                style={{
                    paddingTop:'15%'
                }}
            >
                <Image 
                    source={
                        require("../../../assets/images/getstarted.png")
                    } 
                    style={{
                        height:360, width:360, resizeMode:"contain"
                    }}
                />
            </VFlex>
            <ButtonView>
                <ButtonGoogle 
                    onPress={() => onGoogleButtonPress()}
                >
                <HFlex>
                    <Icon 
                        name='google' 
                        size={20} 
                        style={{
                            color:"white", 
                            paddingRight:20
                        }}
                    />
                    <Text 
                        style={{
                            color:"white"
                        }}
                    >
                        Sign Up with Google
                    </Text>
                </HFlex>
                    
                </ButtonGoogle>
            </ButtonView>
        </View>
    )
}