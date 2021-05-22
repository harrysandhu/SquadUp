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
        # subscription: Subscription
    }

    
    type Query{
        device(deviceId: ID!): Device
        user(id: ID!): User
        game(id: ID!): Game
        team(id: ID!): Team
        games: [Game]
        profile(username: String!): Profile
        signInGoogle(userId: ID!): AuthPayload
        userByEmail(email: String!): User
        
    }

  
    type Mutation{
        registerDevice(deviceId: ID!): Device
        signUpGoogle(userInput: GoogleUserInput!): User
        signUpUser(userInput: UserInputSignUp!): User
        setUsername(data: SetUsername!): SetUsernamePayload
        createGame(game: GameInput!): Game
        joinGame(profileId: ID!, gId: ID!): User
        # game
        # createGame(game: GameInput): Game
        # createTeam(team: T)
    }


    # type Subscription{
    #     # teamCreated(team: Team)
    #     # teamDeleted()
    #     # teamMemberAdded()
    #     # teamMemberRemoved()

    #     # messageAdded()
    #     # messageDeleted()
    #     # messageUpdated()

    # }
    
    type Game{
        id:ID!
        name:String!
        gameId:String!
        maxSize: Int!
        coverUrl: String!
        teams: [Team]!
        users: [Profile]!
    }

    type Team{
        id: ID!
        name:String!
        teamId:String!
        game: Game!
        coverUrl: String!
        users: [Profile]!
        chat: Chat
    }

    type Chat{
        id: ID!
        team: Team!
        messages: [Message]!
    }

    
    type Message{
        id:ID!
        text: String!
        sender: Profile!
        chat: Chat!
        sentAt: DateTime!
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
        games: [Game]!
        teams: [Team]!
    }

    type SetUsernamePayload{
        username: String!,
        profile_id: ID!

    }

    input SetUsername{
        username: String!,
        profile_id: ID!

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
        authType: AuthType
        dID: ID!
    }

    input GameInput{
        name: String!
        gameId:String!
        maxSize: Int!
        coverUrl: String!
    }

    input TeamInput{
        name: String!
        teamId:String!
        coverUrl: String!
        gId: String!
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
            let d = await prisma.device.findFirst({
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
                        username: String(username).toLowerCase()
                    }
                })
                
                return p
        },
        game: async (
            root:any, 
            {id} : any,
            ctx:any
            ) => {
                console.log(`root${root} , CTX: ${ctx}`)
                let game = await prisma.game.findUnique({
                    where: {
                        id: id
                    }
                })
                return game
        },
        team: async (
            root:any, 
            {id} : any,
            ctx:any
            ) => {
                console.log(`root${root} , CTX: ${ctx}`)
                let game = await prisma.team.findUnique({
                    where: {
                        id: id
                    }
                })
                return game
        },
        games: async () => {
            let res = await prisma.game.findMany({})
            return res
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
            console.log("USERINPUT: ", userInput)
            try{
            let user = await prisma.user.create({
                data:{
                    email: userInput.email,
                    userId: userInput.userId,
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
           console.log("user result: ", user)
            return user
        }catch(e){
            console.log("WE GOT AN ERROR", e)
            return e
        }
        },
        setUsername: async (
            root: any, 
            {data}: any, 
            ctx: any) => {
                
            console.log(`root${root} , CTX: ${ctx}`)
            console.log(data.username)

            let updateUsername = await prisma.profile.update({
                where: {
                    id: data.profile_id
                },
                data: {
                    username : String(data.username).toLowerCase()
                }
            })
            console.log(updateUsername)
            return data
        },
        createGame: async (
            root: any,
            {game}: any,
            ctx: any)=> {
            console.log(`root${root} , CTX: ${ctx}`)

            let gameCreated = await prisma.game.create({
                data: {
                    name: game.name,
                    gameId: String(game.gameId).toLowerCase(),
                    maxSize: game.maxSize,
                    coverUrl: game.coverUrl,
                    teams: {
                        create: {
                            name: "Default",
                            teamId:  String(game.gameId).toLowerCase() +"default"
                        }
                    }
                }
            })
            return gameCreated
        },
    
        joinGame: async (
            root: any,
            {profileId, gId}: any,
            ctx: any
        ) => {
            console.log(`root${root} , CTX: ${ctx}`)
            await prisma.userOnGames.create({
                data:{
                    profileId: profileId,
                    gId: gId
                }
            })
            let p =  await prisma.profile.findUnique({
                where:{
                    id: profileId
                }
            })
            return p
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
    },
    Profile: {
        games: async ({id}:any) =>{
            let p = await prisma.userOnGames.findMany({
                select:{
                    game: true
                },
                where : {
                    profileId: id
                }
            })
            let g:any = []
            p.forEach(row => {
                g.push(row.game)
            })
            console.log(g)
            // console.log("device get result: ", device)
            return g
        },
        teams: async ({id}:any) =>{
            let p = await prisma.usersOnTeam.findMany({
                select:{
                    team: true
                },
                where : {
                    profileId: id
                }
            })
            let g:any = []
            p.forEach(row => {
                g.push(row.team)
            })
            console.log(g)
            // console.log("device get result: ", device)
            return g
        }
    },
    Game: {
        teams: async ({id}: any) => {
            let teams  = await prisma.team.findMany({
                where:{
                    gId: id
                }
            })
            return teams
        },
        users: async ({id}: any) => {
            let p = await prisma.userOnGames.findMany({
                select:{
                    profile: true
                },
                where : {
                    gId: id
                }
            })
            let g:any = []
            p.forEach(row => {
                g.push(row.profile)
            })
            console.log(g)
            // console.log("device get result: ", device)
            return g
        }
    },
    Team: {
        game: async ({gId}: any) => {
            let game = await prisma.game.findFirst({
                where:{
                    id: gId
                }
            })
            return game
        },
        users: async ({id}: any) => {
            let p = await prisma.usersOnTeam.findMany({
                select:{
                    profile: true
                },
                where : {
                    tId: id
                }
            })
            let g:any = []
            p.forEach(row => {
                g.push(row.profile)
            })
            console.log(g)
            // console.log("device get result: ", device)
            return g
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


// id:ID!
// name:String!
// gameId:String!
// maxSize: Int!
// coverUrl: String!
// teams: [Team]!

