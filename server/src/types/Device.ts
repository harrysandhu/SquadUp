import { gql } from "apollo-server-core";

export const device = gql `

    type Device{
        id: ID!
        deviceId: ID!
        createdAt: DateTime!
    }


`