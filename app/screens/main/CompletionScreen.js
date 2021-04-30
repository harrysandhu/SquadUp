import React, {useState} from 'react'
import { View, Text, Button } from 'react-native'
import { TopText, FlexView, InputTF, HFlex, AtLabel, BackArrow, InputDOB, ButtonPrimary, ButtonView } from '../../components/styled/components';
import Icon from 'react-native-vector-icons/FontAwesome'

export function CompletionScreen({navigation}){

    const [usernameText, setUsernameText]  = useState("")
    const [usernameIsActive, setUsernameIsActive] = useState(false)

    const [DOB, setDOB] = useState("")
    const [DOBIsActive, setDOBIsActive] = useState(false)

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070A1E'}}>
            <TopText>
                <Text style={{color:"white"}}>PROFILE COMPLETION</Text>
            </TopText>

            <BackArrow onPress={() => navigation.goBack()}>
                <Icon name='angle-left' size={25} style={{color:"white"}}/>
            </BackArrow>

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
                <ButtonPrimary style={{bottom: "-15%"}} onPress={() => navigation.navigate('#')}>
                    <Text style={{color:"white"}}>CONTINUTE</Text>
                </ButtonPrimary>
            </ButtonView>

        </View>
    );
}



/**
 * name, email, dob, profile picture, grab a
 * 
 * 
 */