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
 
const primary_color = "#ff0000"

export const FlexView = styled.View`
    flex: 1;
    align-items: center;
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
    background-color: ${props => (props.disabledStyle === true) ? '#FF005C': '#FF005C'};

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
    background-color: ${props => (props.disabledStyle === true) ? '#2B4FC1': '#2B4FC1'};
`;


