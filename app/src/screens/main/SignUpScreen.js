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
GoogleSignin.configure(firebaseConfig);

// Apollo
import {useQuery, useMutation, gql, useApolloClient } from "@apollo/client"
import { GET_DEVICE, GET_USER_BY_EMAIL } from 'apollo/queries';
import { SIGNUP_USER } from 'apollo/mutations';




// facebook app id : 1676299799220590

export function SignUpScreen({navigation}) {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [userInput, setUserInput] = useState({email: "yoosffs@dga.com"});
    const [email, setEmail] = useState("yoosffs@dga.com")
    const [deviceId, setDeviceId] = useState(DeviceInfo.getUniqueId())
    const [buttonState, setButtonState] = useState(false)
    const client = useApolloClient();

    /*
    * @Query
    * GET DEVICE'S ID BY deviceId
    */ 
    const getDevice = useQuery(GET_DEVICE, {
            variables : {
                deviceId: deviceId
            },
            fetchPolicy: "cache-first"
        })

        // if(!getDeviceData) return null
    /*
    * @Mutation
    * Sign Up user
    */ 

    const [signUpUser, {mutData}] = useMutation(SIGNUP_USER)


    const Provider = Object.freeze({
        'GOOGLE': 1,
        'FACEBOOK': 2
    })
    const [provider, setProvider] = useState(Provider.GOOGLE)
    

    // Handle user state changes
    async function onAuthStateChanged(user) {
       

    
            console.log("Device Data", getDevice.data)
            console.log("USER::::", user)
            
            let userInput = {}
            if(user != null){
                if (provider == Provider.GOOGLE){
                    userInput.name = user.displayName
                    userInput.email = user.email
                    userInput.avatarUrl = user.photoURL
                    userInput.userId = user.uid
                    userInput.dID = getDevice.data.device.id
                }
                
                setUserInput(userInput)
                await SecureStore.setItemAsync("userInput", JSON.stringify(userInput))
            }
          
            if(user != null){
                try{
                    const getUser = await client.query({
                        query: GET_USER_BY_EMAIL,
                        variables: {email: userInput.email},
                        fetchPolicy: "network-only"
                    })
                    console.log("WE GOT HIM", getUser.data)
                    console.log(userInput)
                    if(getUser.data.userByEmail){
                        console.log("user exists, signing in")
                        if(getUser.data.userByEmail.profile.username == null){
                            // username selection
                            console.log("navigating to completion")
                            await SecureStore.setItemAsync("user", JSON.stringify(getUser.data.userByEmail))
                            navigation.navigate('Completion', {user: getUser.data.userByEmail})
                        }else{
                            // home
                            navigation.navigate('UserNav', {user: getUser.data.userByEmail})
                            console.log("ethe")
                        }

                    }else{
                        console.log("user doesnt exist, signing up")
                        console.log(userInput)
                        const res = await client.mutate({
                            mutation: SIGNUP_USER,
                            variables: {userInput: userInput}
                        })
                        if("id" in Object(res.data.signUpUser)){
                            console.log("navigating to completion")
                            await SecureStore.setItemAsync("user", JSON.stringify(signUpUser.data.signUpUser))
                            navigation.navigate('Completion', {user: signUpUser.data.user})
                        }
                        
                        console.log(signUpUser)
                     }
                }catch(e){
                    // sign up user
                    // network error
                    console.log(e.message)
                    alert("Something went wrong!")
                }
               
            }

            setUser(user);
        if (initializing) setInitializing(false);
        
    }
  
    async function onFacebookButtonPress(){
        setProvider(Provider.FACEBOOK)
        // TODO Facebook login
    }

    async function onGoogleButtonPress() {
        setButtonState(true)
        setProvider(Provider.GOOGLE)
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
      }
    
    
    async function saveAuthState(){
        console.log(buttonState)
        if(buttonState){

            console.log("THIS RAN")
            await SecureStore.setItemAsync("AUTH_STATE", "SIGNUP")
            console.log(userInput)
        
        }
    
      }


  useEffect(() => {
        // auth().signOut().then(() => {
        //     console.log("signed out yo")
        // })
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
            <Image source={require("../../../assets/images/getstarted.png")} 
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