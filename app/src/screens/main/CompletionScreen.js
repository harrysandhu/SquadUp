// TODO : Clean up - fix indentation
import React, {useState, useEffect} from 'react'
import { View, Text, Button, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { TopText, FlexView, InputTF, VFlex, HFlex, AtLabel, 
         BackArrow, InputDOB, ButtonPrimary, ButtonView, 
         ImageSelectorTouchable, TopTitle, TopBar } from 'components/styled/components';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker';
import { Input as InputEl } from "react-native-elements";
import { Header, Icon as Icc } from "react-native-elements";
import * as SecureStore from 'expo-secure-store'
import {useQuery, useMutation, gql, useApolloClient } from "@apollo/client"
import DeviceInfo from 'react-native-device-info';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';




const GET_PROFILE = gql `
    query getProfile($username: String!){
        profile(username: $username){
            username
        }
    }
`

const SET_USERNAME = gql`
    mutation setUsername($data: SetUsername!){
        setUsername(data: $data){
            username
        }
    }
`

export function CompletionScreen({route, navigation}){
    const client = useApolloClient();
    const [usernameText, setUsernameText]  = useState("")
    const [usernameIsActive, setUsernameIsActive] = useState(false)

    const [DOB, setDOB] = useState("")
    const [DOBIsActive, setDOBIsActive] = useState(false)
    const [user, setUser] = useState(route.params.user)
    let imgUrl = "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png"
    const [image, setImage] = useState((user.profile.avatarUrl) ? user.profile.avatarUrl : imgUrl );
    const [usernameState, setUsernameMessage ] = useState({message: "", state: false})
    const loadUser = async () => {
        return await SecureStore.getItemAsync("user")
    }
    // const [user, setUser] = useState(loadUser())
 
    
    useEffect(() => {

        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

    useEffect(()=>{
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault()
            console.log("goingback")
        })
    }, [navigation])


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
    
        if (!result.cancelled) {
          setImage(result.uri);
          console.log(result.base64);
        }
        
        console.log("Result:::", result)

    };

    async function handleContinue(){
        console.log(user.profile.id)
        try{
            let data = {
                username: usernameText,
                profile_id: user.profile.id
            }
            let result = await client.mutate({
                mutation: SET_USERNAME, 
                variables: {
                    data: data
                }
            })
            if(result.data.setUsername.username != null){
                user.profile.username = result.data.setUsername.username
                setUser(user)
            }
            alert("success")
            navigation.navigate('UserNav', {user: user})
        }catch(e){
            alert("Something went wrong")
        }
    }

    async function handleUsernameValueChange(value) {
        try{
            let result = await client.query({
                query: GET_PROFILE,
                variables: {username: value},
                fetchPolicy: "network-only"
            })
            
            if(result.data.profile == null){
                setUsernameMessage({message: "Username is available", state: true})
            }else{
                setUsernameMessage({message: "Username not available", state: false})
            }

        }
       catch(e){
           alert("Nework Error")
       }
    }

    // imageData(base64)  --->  firebase save (base64) : returns -> url -----> console.log(url) END
    // https://firebase-cdn.com/appid/assets/abc123/images/avatar.jpg

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070A1E'}}
        >
        
        <TopBar state={usernameState.state} message={usernameState.message}>
            <Text style={{color:"white"}}>{usernameState.message}</Text>
        </TopBar>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070A1E'}}>
        
             <Header
            barStyle="default"
            centerComponent={
                <VFlex>
                <TopTitle>COMPLETE YOUR PROFILE</TopTitle>
                </VFlex>
                }
            centerContainerStyle={{}}
                containerStyle={{ width: '100%', 
                backgroundColor: 'none', 
                position:'absolute', 
                top:-40, 
                borderBottomColor: "transparent"
            }}
            leftComponent={   
                <></>
                }
            placement="center"
            rightComponent={{}}
            rightContainerStyle={{}}
            
            statusBarProps={{}}
    />
            <ImageSelectorTouchable title="Choose Image from Camera Roll" onPress={pickImage} >
                
                {image && <Image source={{ uri: image }} style={{width: 200, height: 200 }} />}
            </ImageSelectorTouchable>

            <FlexView style={{paddingTop: "3%"}}>
                <HFlex>
                <Icon name='user' size={25} style={{color:"#a9a9a9", paddingTop: 20, paddingRight: 20}}/>
                 <InputTF
                        placeholder="Username"
                        placeholderTextColor="#a9a9a9"
                        active={usernameIsActive} 
                        value={usernameText}
                        autocorrect="false"
                        onFocus={()=>{
                            setUsernameIsActive(true)
                        }}

                        onBlur={() =>{
                            setUsernameIsActive(false)
                        }}
                            onChangeText={async (value) =>{
                            setUsernameText(value)
                            await handleUsernameValueChange(value)
                        }}

                    /> 
                </HFlex>
            </FlexView>

            <ButtonView>
                <ButtonPrimary style={{bottom: "-15%"}} state={usernameState.state} onPress={async () => await handleContinue()}>
                    <Text style={{color:"white"}}>CONTINUE</Text>
                </ButtonPrimary>
            </ButtonView>

        </View>
    
          </KeyboardAvoidingView>
    );
}


