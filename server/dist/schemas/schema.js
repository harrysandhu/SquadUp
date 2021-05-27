"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.squadup_schema_v1 = exports.schema = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const graphql_iso_date_1 = require("graphql-iso-date");
const graphql_tools_1 = require("graphql-tools");
const lodash_1 = require("lodash");
const Chat_1 = require("../types/Chat");
const Device_1 = require("../types/Device");
const Game_1 = require("../types/Game");
const Message_1 = require("../types/Message");
const Profile_1 = require("../types/Profile");
const User_1 = require("../types/User");
const User_2 = require("../types/User");
const Team_1 = require("../types/Team");
const Inputs_1 = require("../types/Inputs");
const Auth_1 = require("../types/Auth");
const Auth_2 = require("../types/Auth");
const Auth_3 = require("../types/Auth");
const index_1 = require("../prisma/index");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubsub = new graphql_subscriptions_1.PubSub();
const TEAM_CREATED = 'team_createed';
const TEAM_JOINED = 'team_joined';
const TEAM_LEFT = 'team_left';
exports.schema = apollo_server_core_1.gql `

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
   
    

`;
const directiveResolvers = {
    isAuth: (next, src, args, ctx) => {
        console.dir(`SRC${src} \n\n\n ARGS: ${args} \n\n\n CTX: ${ctx}`);
        return next().then((str) => {
            return str;
        });
    }
};
const resolvers = {
    DateTime: graphql_iso_date_1.GraphQLDateTime,
    Date: graphql_iso_date_1.GraphQLDate,
    Query: {
        device: (root, { deviceId }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let d = yield index_1.prisma.device.findFirst({
                where: {
                    deviceId: deviceId
                }
            });
            console.log("device get result: ", d);
            return d;
        }),
        user: (root, { id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let user = yield index_1.prisma.user.findUnique({
                where: {
                    id: id
                }
            });
            return user;
        }),
        profile: (root, { username }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let p = yield index_1.prisma.profile.findUnique({
                where: {
                    username: String(username).toLowerCase()
                }
            });
            return p;
        }),
        game: (root, { id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let game = yield index_1.prisma.game.findUnique({
                where: {
                    id: id
                }
            });
            return game;
        }),
        team: (root, { id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let game = yield index_1.prisma.team.findUnique({
                where: {
                    id: id
                }
            });
            return game;
        }),
        games: () => __awaiter(void 0, void 0, void 0, function* () {
            let res = yield index_1.prisma.game.findMany({});
            return res;
        }),
        userByEmail: (root, { email }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let user = yield index_1.prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            console.log(user);
            return user;
        }),
        teamByTeamId: (root, { teamId }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let team = yield index_1.prisma.team.findUnique({
                where: {
                    teamId: teamId
                }
            });
            console.log(team);
            return team;
        }),
        get_available_teams: (root, { gId }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let teams = yield index_1.prisma.team.findMany({
                where: {
                    gId: gId
                },
                include: {
                    users: true,
                    chat: true,
                    game: true
                },
            });
            let t = teams.filter(team => team.users.length < team.game.maxSize);
            return t;
        })
    },
    Mutation: {
        registerDevice: (root, { deviceId }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let device = yield index_1.prisma.device.create({
                data: {
                    deviceId: deviceId
                }
            });
            console.log("Device created", device);
            return device;
        }),
        signUpUser: (root, { userInput }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            console.log("USERINPUT: ", userInput);
            try {
                let user = yield index_1.prisma.user.create({
                    data: {
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
                });
                console.log("user result: ", user);
                return user;
            }
            catch (e) {
                console.log("WE GOT AN ERROR", e);
                return e;
            }
        }),
        setUsername: (root, { data }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            console.log(data.username);
            let updateUsername = yield index_1.prisma.profile.update({
                where: {
                    id: data.profile_id
                },
                data: {
                    username: String(data.username).toLowerCase()
                }
            });
            console.log(updateUsername);
            return data;
        }),
        createGame: (root, { game }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let gameCreated = yield index_1.prisma.game.create({
                data: {
                    name: game.name,
                    gameId: String(game.gameId).toLowerCase(),
                    maxSize: game.maxSize,
                    coverUrl: game.coverUrl,
                    teams: {
                        create: {
                            name: "Default",
                            teamId: String(game.gameId).toLowerCase() + "default"
                        }
                    }
                }
            });
            return gameCreated;
        }),
        joinGame: (root, { profileId, gId }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let g = yield index_1.prisma.userOnGames.create({
                data: {
                    profileId: profileId,
                    gId: gId
                }
            });
            let defaultTeam = yield index_1.prisma.team.findFirst({
                where: {
                    gId: g.gId,
                    name: "Default"
                }
            });
            console.log(defaultTeam);
            yield index_1.prisma.usersOnTeam.create({
                data: {
                    profileId: profileId,
                    tId: String(defaultTeam === null || defaultTeam === void 0 ? void 0 : defaultTeam.id)
                }
            });
            let p = yield index_1.prisma.profile.findUnique({
                where: {
                    id: profileId
                }
            });
            return p;
        }),
        createTeam: (root, { name, teamId, gId, profileId }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let team = yield index_1.prisma.team.create({
                data: {
                    name: name,
                    teamId: teamId,
                    gId: gId,
                    users: {
                        create: {
                            profileId: profileId
                        }
                    }
                }
            });
            if (team.id) {
                pubsub.publish(TEAM_CREATED, { teamCreated: team });
            }
            return team;
        }),
        joinTeam: (root, { profileId, gId, tId }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            console.log(gId);
            let g = yield index_1.prisma.usersOnTeam.create({
                data: {
                    profileId: profileId,
                    tId: tId
                }
            });
            let p = yield index_1.prisma.team.findUnique({
                where: {
                    id: tId
                }
            });
            return p;
        }),
    },
    Subscription: {
        teamCreated: {
            subscribe: graphql_subscriptions_1.withFilter(() => pubsub.asyncIterator(TEAM_CREATED), (payload, variables) => {
                return (payload.teamCreated.game.id == variables.gId);
            })
        }
    }
};
exports.squadup_schema_v1 = graphql_tools_1.makeExecutableSchema({
    typeDefs: [exports.schema,
        Chat_1.chat,
        Device_1.device,
        Game_1.game,
        Message_1.message,
        Profile_1.profile,
        User_1.user,
        Team_1.team,
        Inputs_1.googleUserInput,
        Inputs_1.userInputSignUp,
        Inputs_1.gameInput,
        Inputs_1.teamInput,
        Inputs_1.setUsername,
        User_2.setUsernamePayload,
        Auth_1.authType,
        Auth_2.authStage,
        Auth_3.authPayload
    ],
    resolvers: lodash_1.merge(resolvers, Game_1.resolvers, Profile_1.resolvers, User_1.resolvers, Team_1.resolvers),
    directiveResolvers
});
//# sourceMappingURL=schema.js.map