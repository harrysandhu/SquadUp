import { gql } from "apollo-server-core";

export const team = gql`
    type Team{
        id: ID!
        name:String!
        teamId:String!
        game: Game!
        coverUrl: String!
        users: [Profile]!
        chat: Chat
    }
`