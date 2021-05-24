import { gql } from "apollo-server-core";

export const typeDef = gql`
  type Chat{
        id: ID!
        team: Team!
        messages: [Message]!
    }
`