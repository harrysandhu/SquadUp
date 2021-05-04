// TODO : Clean up - fix indentation
import React, {useState, useEffect} from 'react'
import {View, Text, Button, Image} from 'react-native'
import { TopText, BackArrow, HFlex } from '../../components/styled/components';
import { ButtonPrimary, ButtonSecondary, ButtonView, VFlex, LogoImage, TopTitle, ButtonGoogle, ButtonFacebook} from '../../components/styled/components';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Header, Icon as Icc } from "react-native-elements";
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton
} from '@react-native-google-signin/google-signin'; 
import * as SecureStore from 'expo-secure-store'
import {useQuery, useMutation, gql } from "@apollo/client"
import DeviceInfo from 'react-native-device-info';

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '44453297241-2m9gjfh3p9q4aaad218cbd7aqdu0nb1k.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '44453297241-pgcvdp1h1ilbpjasp2eb9fdman8tr23r.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  });


const SIGNUP_USER = gql`
    mutation signUpUser($userInput: UserInputSignUp){
        signUpUser(userInput: $userInput){
            id
            userId
            idToken
            email
            password
            authType
            authStage
            createdAt
            dob
            profile{
                id
                name
                username
                avatar_url
                bio
            }
            device{
                id
                deviceId
                createdAt
            }
        }
    }
`

const GET_USER_BY_EMAIL = gql`
    query userByEmail($email: String!){
        userByEmail(email: $email){
            id
            profile{
                id
                name
                username
                avatar_url
            }
        }
    }
`

const GET_DEVICE = gql`
    query device($deviceId: ID!){
        device(deviceId: $deviceId){
            ID
        }
    }
`


// facebook app id : 1676299799220590

export function SignUpScreen({navigation}) {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [userInput, setUserInput] = useState({email: ""});
    const [signUpUser, {mutData}] = useMutation(SIGNUP_USER)

    /*
    * GET USER BY EMAIL
    * This is for checking if the account already exists. 
    * 
    */ 
    const {getUserData, getUserError, getUserLoading} = useQuery(GET_USER_BY_EMAIL, {
        variables: {email: userInput.email}
    })

    const {getDeviceData, getDeviceError, getDeviceLoading} = useQuery(GET_DEVICE, {
        variables : {deviceId: DeviceInfo.getUniqueId()}
    })

    const Provider = Object.freeze({
        'GOOGLE': 1,
        'FACEBOOK': 2
    })
    const [provider, setProvider] = useState(Provider.GOOGLE)
    

    // Handle user state changes
    async function onAuthStateChanged(user) {
        console.log("USER::::", user)
        let userInput = {}
        if(user != null){
            if (provider == Provider.GOOGLE){
                userInput.name = user.displayName
                userInput.email = user.email
                userInput.avatarUrl = user.photoURL
                userInput.userId = user.uid
                userInput.authType = "GOOGLE"
                userInput.dID = DeviceInfo.getUniqueId()
            }
            
            setUserInput(userInput)
            await SecureStore.setItemAsync("userInput", JSON.stringify(userInput))
            
    
            // check if user exists
                // if yes, 
                    // is username set?
                        // if yes 
                            // signin user
                        // if not
                            // profile completion screen
            // if not, register
    
          setUser(user);

        }
        if (initializing) setInitializing(false);
    }


    async function onFacebookButtonPress(){
        setProvider(Provider.FACEBOOK)
        // TODO Facebook login
    }

    async function onGoogleButtonPress() {
        setProvider(Provider.GOOGLE)
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
      }
      async function saveAuthState(){
        await SecureStore.setItemAsync("AUTH_STATE", "SIGNUP")
      }


  useEffect(() => {
    saveAuthState()
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

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
    
        <VFlex style={{paddingTop:'15%'}}>
            <Image source={require("../../assets/images/getstarted.png")} 
                   style={{height:360, width:360, resizeMode:"contain"}}/>
        </VFlex>
        <ButtonView>
            <ButtonGoogle onPress={() => onGoogleButtonPress()}>
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