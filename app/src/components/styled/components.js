import styled from 'styled-components'
import {
    Icon
} from 'react-native-vector-icons/MaterialIcons';
import {
    Button,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Picker
} from 'react-native';

const primary_color = "#FF005C";
const secondary_color = "#2B4FC1";
const error_red = "#C25A53"
const success_green = "#92BE65"

export const FlexView = styled.View `
    display: flex;
    align-items: center;
    justify-content:center;
    width:100%
`;

export const VFlex = styled.View `
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:100%
`
export const HFlex = styled.View `
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width:100%
    height: auto;
`

export const TopText = styled.Text `
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 8%;
`;

export const BackArrow = styled.TouchableOpacity `
    width: 25px;
    height: 25px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 7.5%;
    left: 10%;
`;


export const InputTF = styled.TextInput `
    width: 80%;
    height: 48px;
    background: ${props => (props.active === true)? 'rgba(216, 205, 208, 0.2)' : 'rgba(216, 205, 208, 0.2)'};
    border-radius: 10px;
    padding-left: 25px;
    color: #fff;
    border: ${props => (props.active) ? '2px solid #E1DDDD': 'none'};
    font-size:15px;
    margin-top:20px;
    text-align:left;
    ${'' /* box-shadow: ${props => (props.active === true) ? '0px 0px 10px rgba(0, 0, 0, 0.15)' : '0px 0px 0px rgba(0, 0, 0, 0)'} */}
`

export const InputDOB = styled.TextInput `
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
`;

export const ButtonView = styled.View `
    width: 100%;
    height: auto;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    bottom: 5%;
`;

export const ProfileView = styled.TouchableOpacity `
    width: 150px;
    height: 150px;
    border: 2px white;
    border-radius: 50px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 20%;
    align-items: center;
`;

export const AtLabel = styled.Text `
    color: ${props => (props.active === true)? 'rgba(216, 215, 215, 1)' : 'rgba(255, 255, 255, 0.5)'} ;
    font-size: 30px;
    padding-right: 10px;
    margin-top: 15px;
`;

export const ButtonPrimary = styled.TouchableOpacity `
    width: 90%;
    height: 55px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto';
    margin-bottom: 4%;
    border-radius:10px;
    opacity:${props => (props.disabledStyle == true) ? '0.5': '1'}; 
    background-color: ${props => (props.state === false) ? 'grey' : primary_color};

`;

export const ButtonSecondary = styled.TouchableOpacity `
    width: 90%;
    height: 55px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto';
    bottom: 0px;
    border-radius:10px;
    opacity:${props => (props.disabledStyle === true) ? '0.5': '1'}; 
    background-color: ${props => (props.disabledStyle === true) ? secondary_color : secondary_color};
`;


export const ImageSelectorTouchable = styled.TouchableOpacity `
    height: 150px;
    width: 150px;
    border-radius: 140px;
    overflow:hidden;
    background-color: rgba(216, 205, 208, 0.2);
    bottom: 7%;
    border: 0.8px grey;
    justify-content: center;
    align-items: center;
`;


export const LogoImage = styled.Image `
    flex: 1;
    width: 100%;
    resize-mode: contain;
`;

export const TopTitle = styled.Text `
    font-style: normal;
    font-weight: 400;
    padding-top: 7px;
    font-size: 15px;
    color: #fff;
`

export const ButtonGoogle = styled.TouchableOpacity `
    width: 90%;
    height: 55px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto';
    margin-bottom: 4%;
    border-radius:10px;
    opacity:${props => (props.disabledStyle === true) ? '0.5': '1'}; 
    background-color: ${props => (props.disabledStyle === true) ? '#DB4437' : '#DB4437'};

`

export const ButtonFacebook = styled.TouchableOpacity `
    width: 90%;
    height: 55px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto';
    margin-bottom: 4%;
    border-radius:10px;
    opacity:${props => (props.disabledStyle === true) ? '0.5': '1'}; 
    background-color: ${props => (props.disabledStyle === true) ? '#1877f2' : '#1877f2'};

`


export const TopBar = styled.View `
    width: 100%;
    height: 35px;
    margin-top:50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius:10px;
    opacity:${props => (props.message == "") ? '0': '1'}; 
    background-color: ${props => (props.state === true) ? success_green : error_red};
`

export const TextBox = styled.View ` 
    align-content: center; 
    flex-wrap: wrap;
    background-color: white;
    color: white;

`
export const Friend = styled.Text ` 

    background-color: green;
    flex-direction: row;
    position: relative;
    margin-right: auto;
    color: white; 

`
export const Current = styled.Text ` 
    background-color: brown;
    flex-direction: row;
    padding: 20px;
    position: relative;
    color: white; 



`

export const TextBox4 = styled.View `
    rightArrow: {
      position: absolute;
      background-color: #0078fe;
      width: 20;
      height: 25;
      bottom: 0;
      right: -10;
    },
    
    rightArrowOverlap: {
      position: absolute;
      background-color: #eeeeee;
      width: 20;
      height: 35;
      bottom: -6;
      right: -20;
    },
    `