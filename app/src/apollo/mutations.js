import {gql } from "@apollo/client"


export const SIGNUP_USER = gql`
mutation signUpUser($userInput: UserInputSignUp!){
    signUpUser(userInput: $userInput){
        id
        userId
        idToken
        email
        password
        authType
        authStage
        createdAt
        dob
        profile{
            id
            name
            username
            avatarUrl
            bio
        }
        device{
            id
            deviceId
            createdAt
        }
    }
}
`


export const REGISTER_DEVICE = gql`
    mutation registerDevice($deviceId: ID!){
        registerDevice(deviceId: $deviceId){
            id
            deviceId
            createdAt
        }
    }
`



export const SET_USERNAME = gql`
    mutation setUsername($data: SetUsername!){
        setUsername(data: $data){
            username
        }
    }
`

export const JOIN_GAME = gql`
    mutation joinGame($profileId: ID!, $gId: ID!){
        joinGame(profileId: $profileId, gId: $gId){
            id
        }
    }
`

export const JOIN_TEAM = gql`
    mutation joinTeam($profileId: ID!, $gId: ID!, $tId: ID!){
        joinTeam(profileId: $profileId, gId: $gId, tId: $tId){
            id
        }
    }
`


export const CREATE_TEAM = gql`
    mutation createTeam($name: String!, $teamId: String!, $gId: ID!, $profileId: ID!){
        createTeam(name: $name, teamId: $teamId, gId: $gId, profileId: $profileId ){
            id
        }
    }
`


export const CREATE_MESSAGE = gql`
    mutation createMessage($message: MessageInput!){
        createMessage(message: $message){
            id
            text
            sender{
                id
                name
                username
                avatarUrl
            }
            sentAt
            chat{
                id
            }
        }
    }
`