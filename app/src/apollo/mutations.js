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
