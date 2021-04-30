import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'
import { TopText, FlexView, InputTF, HFlex, AtLabel } from '../../components/styled/components';
import { Icon } from 'react-native-vector-icons/MaterialIcons';


export function CompletionScreen({navigation}){

    const [usernameText, setUsernameText]  = useState("")
    const [usernameIsActive, setUsernameIsActive] = useState(false)

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070A1E'}}>
            <TopText>
                <Text style={{color:"white"}}>PROFILE COMPLETION</Text>
            </TopText>

            <FlexView>
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
            </FlexView>
            <Button 
                title="Go back" 
                onPress={() => navigation.goBack()} />
        </View>
    );
}



/**
 * name, email, dob, profile picture, grab a
 * 
 * 
 */