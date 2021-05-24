import { gql } from "apollo-server-core";

export const user = gql`
 type User{
        id: ID!
        userId: ID @isAuth
        idToken: String @isAuth
        email: String @isAuth
        password: String @isAuth
        authStage: AuthStage!
        authType: AuthType!
        createdAt: DateTime!
        dob: DateTime @isAuth
        device: Device!
        profile: Profile!
    }

`

export const setUsernamePayload = gql`

    type SetUsernamePayload{
        username: String!,
        profile_id: ID!

    }

`
