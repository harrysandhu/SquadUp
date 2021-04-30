import { gql } from "apollo-server-core";
import {
    GraphQLDateTime,
    GraphQLDate
} from 'graphql-iso-date'

import { makeExecutableSchema } from "graphql-tools"

/**
 * we would import other entities here and combine entities
 * test
 */


export const schema = gql `

    scalar DateTime
    scalar Date
    directive @isAuth on FIELD_DEFINITION

    schema{
        query: Query
        mutation: Mutation
    }

    
    type Query{
        device(deviceId: ID!): Device
        user(id: ID!): User
        profile(username: String!): Profile
        signInGoogle(userId: ID!): AuthPayload
    }


    type Mutation{
        registerDevice(deviceId: ID!): Device
        signUpGoogle(userInput: GoogleUserInput!): User
    }


    type AuthPayload{
        user: User!
        auth_token: String!
    }

    type Device{
        id: ID!
        deviceId: ID!
        createdAt: DateTime!
    }
    
    # accessible using id
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


    # accessible using username
    type Profile{
        id: ID!
        name: String!
        username: String!
        avatar_url: String!
        bio: String
        user: User @isAuth
    }


    input GoogleUserInput{
        userId: ID!
        name: String!
        email: String!
        dob: DateTime!
        avatar_url: String!
    }


`


const directiveResolvers:any = {
    isAuth: (next:any, src:any, args:any, ctx:any) => {
        console.dir(`SRC${src} \n\n\n ARGS: ${args} \n\n\n CTX: ${ctx}`)
        return next().then((str:any) => {
            return str
        })
    
    }
}

const deviceData:any = {
    "abc123": {
        id: "abc123",
        deviceId: "111.111.111",
        createdAt: "2018-05-28T10:26:39.359Z"
    }
}


const userData:any = {
    "user123": {
        id: "user123",
        userId: "userid123123123",
        idToken: "bruhh",
        email: "hras@gmail.com",
        authStage: 'SUB',
        authType: 'GOOGLE',
        createdAt: "2018-05-28T10:26:39.359Z",
        dob:  "1999-05-28T10:26:39.359Z",
        device: 'abc123',
        profile: "profile123"
    }
}

const profileData:any = {
    "profile123": {
        id: "profile123",
        name: "Harry",
        username: "harryxsandhu",
        avatar_url: "http://wef3ec.com/ttt.png",
        bio: "hi whats up",
        user: "user123"
    }
}

const resolvers:any = {
    DateTime: GraphQLDateTime,
    Date: GraphQLDate,
    Query: {
        device: (root:any, {deviceId} : any, ctx:any): any => {
            console.log(`root${root} , CTX: ${ctx}`)
            return deviceData[deviceId]
        },
        user: (root:any, {id}: any, ctx: any): any => {
            console.log(`root${root} , CTX: ${ctx}`)
            return userData[id]
        },
        profile: (root:any, {username}: any, ctx: any): any => {
            console.log(`root${root} , CTX: ${ctx}`)
            return profileData[username]
        }
    },
    User: {
        device: ({device}: any) : any =>{
            console.log("this ran", device)
            return deviceData[device]
        },
        profile: ({profile}:any) :any =>{
            return profileData[profile]
        }
    }
}

// export resolved schema
export const squadup_schema_v1 = makeExecutableSchema({
    typeDefs: [schema],
    resolvers,
    directiveResolvers
})