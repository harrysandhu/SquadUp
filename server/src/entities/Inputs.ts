
import { gql } from "apollo-server-core";

export const typeDef = gql`
    input GoogleUserInput{
        userId: ID!
        name: String!
        email: String!
        dob: DateTime!
        avatarUrl: String!
    }

    input UserInputSignUp{
        userId: ID!
        name: String!
        email: String!
        avatarUrl: String!
        authType: AuthType
        dID: ID!
    }

    input GameInput{
        name: String!
        gameId:String!
        maxSize: Int!
        coverUrl: String!
    }

    input TeamInput{
        name: String!
        teamId:String!
        coverUrl: String!
        gId: String!
    }
`