import { gql } from "apollo-server-core";

export const typeDef = gql `

    type Device{
        id: ID!
        deviceId: ID!
        createdAt: DateTime!
    }


`