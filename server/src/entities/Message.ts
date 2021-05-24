import { gql } from "apollo-server-core";

export const typeDef = gql`
    type Message{
        id:ID!
        text: String!
        sender: Profile!
        chat: Chat!
        sentAt: DateTime!
    }

`