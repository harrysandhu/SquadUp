import { gql } from "apollo-server-core";

export const typeDef = gql `
    enum AuthType{
        GOOGLE
        FACEBOOK
        EMAIL
    }

    enum AuthStage{
        SIGNUP
        USERNAME
        SUB
        FINAL
    }
    


    type AuthPayload{
        user: User!
        auth_token: String!
    }

`