import { gql } from "apollo-server-core";

export const game = gql`
    type Game{
        id:ID!
        name:String!
        gameId:String!
        maxSize: Int!
        coverUrl: String!
        teams: [Team]!
        users: [Profile]!
    }

`