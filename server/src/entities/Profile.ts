import { gql } from "apollo-server-core";

export const typeDef = gql`
 type Profile{
        id: ID!
        name: String!
        username: String
        avatarUrl: String!
        bio: String
        user: User @isAuth
        games: [Game]!
        teams: [Team]!
    }

`