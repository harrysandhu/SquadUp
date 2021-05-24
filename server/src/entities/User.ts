import { gql } from "apollo-server-core";

export const typeDef = gql`
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


    type SetUsernamePayload{
        username: String!,
        profile_id: ID!

    }

`