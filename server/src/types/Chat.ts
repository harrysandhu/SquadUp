import { gql } from "apollo-server-core";
import { prisma } from "src/prisma";
export const chat = gql`
  type Chat{
        id: ID!
        team: Team!
        messages: [Message]!
    }
`