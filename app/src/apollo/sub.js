import {gql } from "@apollo/client"

export const TEAM_CREATED = gql`
   subscription teamCreated($gId: ID!){
        teamCreated(gId: $gId){
            
        }
   }
`