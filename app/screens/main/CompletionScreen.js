import React, {useState, useEffect} from 'react'
import { View, Text, Button, Image } from 'react-native'
import { TopText, FlexView, InputTF, VFlex, HFlex, AtLabel, 
    BackArrow, InputDOB, ButtonPrimary, ButtonView, ImageSelectorTouchable } from '../../components/styled/components';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker';

export function CompletionScreen({navigation}){

    const [usernameText, setUsernameText]  = useState("")
    const [usernameIsActive, setUsernameIsActive] = useState(false)

    const [DOB, setDOB] = useState("")
    const [DOBIsActive, setDOBIsActive] = useState(false)

    const [image, setImage] = useState(null);

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
            <TopText>
                <Text style={{color:"white"}}>PROFILE COMPLETION</Text>
            </TopText>

            <BackArrow onPress={() => navigation.goBack()}>
                <Icon name='angle-left' size={25} style={{color:"white"}}/>
            </BackArrow>

            <ImageSelectorTouchable title="Choose Image from Camera Roll" onPress={pickImage} >
                {image && <Image source={{ uri: image }} style={{width: 200, height: 200 }} />}
            </ImageSelectorTouchable>

            <FlexView style={{paddingTop: "3%"}}>
                <HFlex>
                    <AtLabel active={usernameIsActive}>@</AtLabel>
                    <InputTF
                        placeholder="Username"
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
                <HFlex>
                    <AtLabel active={DOBIsActive}><Icon name='calendar' size={30} style={AtLabel}/></AtLabel>
                    <InputDOB 
                    placeholder="MM/DD/YYYY"
                    active={DOBIsActive} 
                    value={DOB}
                    autoCapitalize="none"
                    onFocus={()=>{
                        setDOBIsActive(true)
                    }}

                    onBlur={() =>{
                        setDOBIsActive(false)
                    }}
                        onChangeText={(value) =>{
                        setDOB(value)
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


