import React, {useState} from 'react'
import {View, Text, Button} from 'react-native'
import { TopText } from '../../components/styled/components';


export function CompletionScreen({navigation}){
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#070A1E'}}>
            <TopText>
                <Text style={{color:"white"}}>PROFILE COMPLETION</Text>
            </TopText>

            <Button 
                title="Go back" 
                onPress={() => navigation.goBack()} />
        </View>
    );
}
