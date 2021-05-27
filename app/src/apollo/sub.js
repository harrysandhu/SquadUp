import {gql } from "@apollo/client"

export const TEAM_CREATED = gql`
   subscription teamCreated($gId: ID!){
        teamCreated(gId: $gId){
            
        }
   }
`


export const MESSAGE_CREATEAD = gql`
   subscription messageCreated($chatId: String!){
      messageCreated(chatId: $chatId){
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