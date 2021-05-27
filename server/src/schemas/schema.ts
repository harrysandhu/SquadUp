import { gql } from "apollo-server-core";
import {
    GraphQLDateTime,
    GraphQLDate
} from 'graphql-iso-date'

import { makeExecutableSchema } from "graphql-tools"

import { merge } from 'lodash';

import {chat as Chat} from "../types/Chat"
import {device as Device} from "../types/Device"
import {
    game as Game,
    resolvers as GameResolvers
} from "../types/Game"
import {message as Message} from "../types/Message"
import {
    profile as Profile,
    resolvers as ProfileResolvers
} from "../types/Profile"

import {
    user as User,
    resolvers as UserResolvers
} from "../types/User"
import {setUsernamePayload as SetUsernamePayload} from "../types/User"
import {
    team as Team,
    resolvers as TeamResolvers
} from "../types/Team"

import {
    googleUserInput as GoogleUserInput,
    userInputSignUp as UserInputSignUp,
    gameInput as GameInput,
    teamInput as TeamInput,
    setUsername as SetUsername,
} from "../types/Inputs"

import {authType as AuthType} from "../types/Auth"
import {authStage as AuthStage} from "../types/Auth"
import {authPayload as AuthPayload} from "../types/Auth"
import { prisma } from "../prisma/index";
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub()
const TEAM_CREATED = 'team_created'
const TEAM_JOINED = 'team_joined'
const TEAM_LEFT = 'team_left'
// const TEAM_DELETED = 'team_createed'


const MESSAGE_ADDED = 'team_createed'
const MESSAGE_DELETED = 'team_createed'
const MESSAGE_UPDATED = 'team_createed'


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
        teamByTeamId(teamId: String!): Team
        get_available_teams(gId: ID!): [Team]
        # get_all_messages
    }

  
    type Mutation{
        registerDevice(deviceId: ID!): Device
        signUpGoogle(userInput: GoogleUserInput!): User
        signUpUser(userInput: UserInputSignUp!): User
        setUsername(data: SetUsername!): SetUsernamePayload 
        createGame(game: GameInput!): Game

        joinGame(profileId: ID!, gId: ID!): User
        createTeam(name: String!, teamId: String!, gId: ID!, profileId: ID!): Team
        joinTeam(tId: ID!, gId: ID!, profileId: ID!): Team
    }

    type Subscription{
        teamCreated(gId: ID!): Team
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
    
   


    # accessible using username
   
    

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
            },
        teamByTeamId: async (
                root: any, 
                {teamId}: any,
                ctx: any) => {
                    console.log(`root${root} , CTX: ${ctx}`)
                    let team = await prisma.team.findUnique({
                        where: {
                            teamId: teamId
                        }
                    })
                    console.log(team)
                    return team
        },
        get_available_teams: async (
            root: any, 
            {gId}: any,
            ctx: any
        ) => {
            console.log(`root${root} , CTX: ${ctx}`)
            let teams = await prisma.team.findMany({
                where:{
                    gId :gId
                },
                include :{
                    users: true,
                    chat: true,
                    game: true
                },
                
            })

            let t = teams.filter(team => team.users.length < team.game.maxSize)
            return t

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
                            teamId:  String(game.gameId).toLowerCase() +"default",
                            chat: {
                                create:{

                                }
                            }
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
            let g = await prisma.userOnGames.create({
                data:{
                    profileId: profileId,
                    gId: gId
                }
            })
            let defaultTeam = await prisma.team.findFirst({
                where:{
                    gId: g.gId,
                    name: "Default"
                }
            })
            console.log(defaultTeam)

            await prisma.usersOnTeam.create({
                data:{
                    profileId:profileId,
                    tId: String(defaultTeam?.id)        
                }
            })
            let p =  await prisma.profile.findUnique({
                where:{
                    id: profileId
                }
            })
            return p
        },
        createTeam: async (
            root: any,
            {name, teamId, gId, profileId}: any,
            ctx: any
        ) => {
            console.log(`root${root} , CTX: ${ctx}`)

            let team = await prisma.team.create({
                data: {
                    name: name,
                    teamId: teamId,
                    gId: gId,
                    users:{
                        create:{
                            profileId: profileId
                        }
                    },
                    chat: {
                        create: {
                           
                        }
                    }
                }

            })

            if (team.id){
                pubsub.publish(TEAM_CREATED, {teamCreated: team})
            }
            

        
            return team
        },
        joinTeam: async (
            root: any,
            {profileId, gId, tId}: any,
            ctx: any
        ) => {
            console.log(`root${root} , CTX: ${ctx}`)
            console.log(gId)
            let g = await prisma.usersOnTeam.create({
                data:{
                    profileId: profileId,
                    tId: tId
                }
            })
    
            let p =  await prisma.team.findUnique({
                where:{
                    id: tId
                }
            })
            return p
        },
    },
    
    Subscription: {
        teamCreated: {
            subscribe : withFilter(
                () => pubsub.asyncIterator(TEAM_CREATED),
                (payload, variables) => {
                    return (payload.teamCreated.game.id == variables.gId)
                }
            )
        }
    }

}

// export resolved schema
export const squadup_schema_v1 = makeExecutableSchema({
    typeDefs: [schema, 
        Chat, 
        Device, 
        Game, 
        Message, 
        Profile, 
        User, 
        Team, 
        GoogleUserInput, 
        UserInputSignUp, 
        GameInput, 
        TeamInput, 
        SetUsername,
        SetUsernamePayload,
        AuthType, 
        AuthStage, 
        AuthPayload
    ],
    resolvers: merge(
        resolvers,
        GameResolvers,
        ProfileResolvers,
        UserResolvers,
        TeamResolvers,

    ),
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

