// TODO : Clean up - fix indentation
import React, {useState, useEffect} from 'react'
import { View, Text, Button, Image } from 'react-native'
import { TopText, FlexView, InputTF, VFlex, HFlex, AtLabel, 
    BackArrow, InputDOB, ButtonPrimary, ButtonView, ImageSelectorTouchable, TopTitle } from '../../components/styled/components';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker';
import { Input as InputEl } from "react-native-elements";
import { Header, Icon as Icc } from "react-native-elements";


export function CompletionScreen({navigation}){

    const [usernameText, setUsernameText]  = useState("")
    const [usernameIsActive, setUsernameIsActive] = useState(false)

    const [DOB, setDOB] = useState("")
    const [DOBIsActive, setDOBIsActive] = useState(false)

    const [image, setImage] = useState("https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png");

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

    // imageData(base64)  --->  firebase save (base64) : returns -> url -----> console.log(url) END
    // https://firebase-cdn.com/appid/assets/abc123/images/avatar.jpg

    return (
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
                top:0, 
                borderBottomColor: "transparent"
            }}
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
                        autoCapitalize="none"
                        onFocus={()=>{
                            setUsernameIsActive(true)
                        }}

                        onBlur={() =>{
                            setUsernameIsActive(false)
                        }}
                            onChangeText={(value) =>{
                            setUsernameText(value)
                            }}

                    /> 
                </HFlex>
            </FlexView>

            <ButtonView>
                <ButtonPrimary style={{bottom: "-15%"}}>
                    <Text style={{color:"white"}}>CONTINUE</Text>
                </ButtonPrimary>
            </ButtonView>

        </View>
    );
}


