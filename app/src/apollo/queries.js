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
                    game{
                        id
                        name
                    }
                    chat{
                        id
                    }
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


export const GET_ALL_GAMES = gql`
    query games{
        games{
            id
            name
            gameId
            coverUrl
        }
    }
`


export const GET_TEAM_BY_TEAMID = gql`
    query teamByTeamId($teamId: String!){
        teamByTeamId(teamId:$teamId){
            id
        }
    }
`

export const GET_AVAILABLE_TEAMS = gql`
    query  get_available_teams($gId: ID!){
        get_available_teams(gId: $gId){
            id
            teamId
            name
            game{
                id
                name
                gameId
                coverUrl
            }
            users{
                id
                avatarUrl
                username
                name
            }
        }
    }
`


export const GET_ALL_MESSAGES = gql`
    query messages($chatId:String!){
        messages(chatId: $chatId){
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