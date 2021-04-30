import styled from 'styled-components'
import { Button, 
        Text, 
        View, 
        TouchableOpacity,
        Animated,
        Image,
        TextInput,
        KeyboardAvoidingView,
        Picker } from 'react-native';
        
const primary_color = "#FF005C";
const secondary_color = "#2B4FC1";

export const FlexView = styled.View`
    display: flex;
    align-items: center;
    justify-content:center;
    width:100%
`;

export const VFlex = styled.View`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:100%
`
export const HFlex = styled.View`
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width:100%
    height: auto;
`

export const TopText = styled.Text`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 8%;
`;


export const InputTF = styled.TextInput `
    width: 80%;
    height: 48px;
    background: ${props => (props.active === true)? 'rgba(216, 205, 208, 0.2)' : 'rgba(216, 205, 208, 0.2)'};
    border-radius: 10px;
    padding-left: 25px;
    color: #fff;
    border: ${props => (props.active) ? '2px solid #E1DDDD': 'none'};
    font-size:20px;
    margin-top:20px;
    text-align:left;
    ${'' /* box-shadow: ${props => (props.active === true) ? '0px 0px 10px rgba(0, 0, 0, 0.15)' : '0px 0px 0px rgba(0, 0, 0, 0)'} */}
`


export const ButtonView = styled.View`
    width: 100%;
    height: auto;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    bottom: 5%;
`;

export const AtLabel = styled.Text`
    color: ${props => (props.active === true)? 'rgba(216, 215, 215, 1)' : 'rgba(255, 255, 255, 0.5)'} ;
    font-size: 30px;
    padding-right: 10px;
    margin-top: 15px;

`

export const ButtonPrimary = styled.TouchableOpacity`
    width: 375px;
    height: 55px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto';
    margin-bottom: 4%;
    opacity:${props => (props.disabledStyle === true) ? '0.5': '1'}; 
    background-color: ${props => (props.disabledStyle === true) ? primary_color : primary_color};

`;

export const ButtonSecondary = styled.TouchableOpacity`
    width: 375px;
    height: 55px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto';
    bottom: 0px;
    opacity:${props => (props.disabledStyle === true) ? '0.5': '1'}; 
    background-color: ${props => (props.disabledStyle === true) ? secondary_color : secondary_color};
`;



