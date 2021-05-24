
import { gql } from "apollo-server-core";

export const googleUserInput = gql`
    input GoogleUserInput{
        userId: ID!
        name: String!
        email: String!
        dob: DateTime!
        avatarUrl: String!
    }
`

export const userInputSignUp = gql`
    input UserInputSignUp{
        userId: ID!
        name: String!
        email: String!
        avatarUrl: String!
        authType: AuthType
        dID: ID!
    }
`
export const gameInput = gql`
   input GameInput{
        name: String!
        gameId:String!
        maxSize: Int!
        coverUrl: String!
    }
`
export const teamInput = gql`
   input TeamInput{
        name: String!
        teamId:String!
        coverUrl: String!
        gId: String!
    }
`