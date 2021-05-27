import {gql } from "@apollo/client"


export const GET_USER_BY_EMAIL = gql`
    query userByEmail($email: String!){
        userByEmail(email: $email){
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
                games{
                    id
                    name
                    coverUrl
                }
                teams{
                    id
                    name
                    teamId
                    coverUrl
                }
            }
            device{
            id
            deviceId
            createdAt
            }
        }
    }
`
export const GET_DEVICE = gql `
    query getDevice($deviceId: ID!){
        device(deviceId: $deviceId){
            id
            deviceId
            createdAt
        }
    }
`


// export const 