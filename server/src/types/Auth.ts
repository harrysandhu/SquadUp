import { gql } from "apollo-server-core";

export const authType = gql `
    enum AuthType{
        GOOGLE
        FACEBOOK
        EMAIL
    }

`

export const authStage = gql `
    enum AuthStage{
        SIGNUP
        USERNAME
        SUB
        FINAL
    }

`

export const authPayload = gql `
   type AuthPayload{
        user: User!
        auth_token: String!
    }

`
