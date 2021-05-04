import { gql } from "apollo-server-core";
import {
    GraphQLDateTime,
    GraphQLDate
} from 'graphql-iso-date'

import { makeExecutableSchema } from "graphql-tools"
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

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
        userByEmail(email: String!): User
    }

  
    type Mutation{
        registerDevice(deviceId: ID!): Device
        signUpGoogle(userInput: GoogleUserInput!): User
        signUpUser(userInput: UserInputSignUp!): User
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
        username: String
        avatarUrl: String!
        bio: String
        user: User @isAuth
    }


    input GoogleUserInput{
        userId: ID!
        name: String!
        email: String!
        dob: DateTime!
        avatarUrl: String!
    }

    input UserInputSignUp{
        userId: ID!
        name: String!
        email: String!
        avatarUrl: String!
        authType: AuthType!
        dID: ID!
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


const resolvers:any = {
    DateTime: GraphQLDateTime,
    Date: GraphQLDate,
    Query: {
        device: async(
            root:any, 
            {deviceId} : any, 
            ctx:any) => {
            console.log(`root${root} , CTX: ${ctx}`)
            let d = await prisma.device.findUnique({
                where : {
                    deviceId: deviceId
                }
            })
            
            console.log("device get result: ", d)
            return d
        },
        user: async (
            root:any, {id}: 
            any, 
            ctx: any) => {

            console.log(`root${root} , CTX: ${ctx}`)
            let user = await prisma.user.findUnique({
                where : {
                    id: id
                }
            })
            return user
        },
        profile: async (
            root:any, 
            {username}: any, 
            ctx: any) => {
                console.log(`root${root} , CTX: ${ctx}`)
                let p = await prisma.profile.findUnique({
                    where : {
                        username: username
                    }
                })
                
                return p
        },
        userByEmail: async (
            root: any, 
            {email}: any,
            ctx: any) => {
                console.log(`root${root} , CTX: ${ctx}`)
                let user = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                })
                console.log(user)
                return user
            }
    },

    Mutation: {
        registerDevice: async (
            root: any, 
            {deviceId}: any, 
            ctx: any) => {
                
            console.log(`root${root} , CTX: ${ctx}`)
            let device = await prisma.device.create({
                data: {
                   deviceId: deviceId
                }
            }) 
            console.log("Device created", device)
            return device
        },
        signUpUser: async (
            root: any,
            {userInput}: any,
            ctx: any
        ) => {
            console.log(`root${root} , CTX: ${ctx}`)
            let user = await prisma.user.create({
                data:{
                    email: userInput.email,
                    userId: userInput.userId,
                    authType: userInput.authType,
                    dob: "1999-05-28T10:26:39.359Z",
                    dID: Number(userInput.dID),
                    profile: {
                        create: {
                            avatarUrl: userInput.avatarUrl,
                            name: userInput.name,
                        }
                    }, 
                }
            })
           console.log(user)
            return user
        }
    },
    User: {
        device: async ({dID}: any)  =>{
            console.log("device:::", dID)
            let d = await prisma.device.findUnique({
                where : {
                    id: dID
                }
            })
            
            // console.log("device get result: ", device)
            return d
        },
        profile: async ({id}:any) =>{
            let p = await prisma.profile.findFirst({
                where : {
                    uID: id
                }
            })
            
            // console.log("device get result: ", device)
            return p
        }
    }
}

// export resolved schema
export const squadup_schema_v1 = makeExecutableSchema({
    typeDefs: [schema],
    resolvers,
    directiveResolvers
})


// userInput = {
//     name: "Harry",
//     email: "yoo@ga.com",
//     avatarUrl: "https://gfgv.com/",
//     userId: "yoo",
//     authType: GOOGLE,
//     deviceId: "111.111.111"
// }