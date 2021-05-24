import { gql } from "apollo-server-core";

export const chat = gql`
  type Chat{
        id: ID!
        team: Team!
        messages: [Message]!
    }
`