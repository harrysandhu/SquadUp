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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
            let d = yield prisma.device.findFirst({
                where: {
                    deviceId: deviceId
                }
            });
            console.log("device get result: ", d);
            return d;
        }),
        user: (root, { id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let user = yield prisma.user.findUnique({
                where: {
                    id: id
                }
            });
            return user;
        }),
        profile: (root, { username }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let p = yield prisma.profile.findUnique({
                where: {
                    username: String(username).toLowerCase()
                }
            });
            return p;
        }),
        game: (root, { id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let game = yield prisma.game.findUnique({
                where: {
                    id: id
                }
            });
            return game;
        }),
        team: (root, { id }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let game = yield prisma.team.findUnique({
                where: {
                    id: id
                }
            });
            return game;
        }),
        games: () => __awaiter(void 0, void 0, void 0, function* () {
            let res = yield prisma.game.findMany({});
            return res;
        }),
        userByEmail: (root, { email }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let user = yield prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            console.log(user);
            return user;
        })
    },
    Mutation: {
        registerDevice: (root, { deviceId }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let device = yield prisma.device.create({
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
                let user = yield prisma.user.create({
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
            let updateUsername = yield prisma.profile.update({
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
            let gameCreated = yield prisma.game.create({
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
            yield prisma.userOnGames.create({
                data: {
                    profileId: profileId,
                    gId: gId
                }
            });
            let p = yield prisma.profile.findUnique({
                where: {
                    id: profileId
                }
            });
            return p;
        })
    },
    User: {
        device: ({ dID }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("device:::", dID);
            let d = yield prisma.device.findUnique({
                where: {
                    id: dID
                }
            });
            return d;
        }),
        profile: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            let p = yield prisma.profile.findFirst({
                where: {
                    uID: id
                }
            });
            return p;
        })
    },
    Profile: {
        games: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            let p = yield prisma.userOnGames.findMany({
                select: {
                    game: true
                },
                where: {
                    profileId: id
                }
            });
            let g = [];
            p.forEach(row => {
                g.push(row.game);
            });
            console.log(g);
            return g;
        }),
        teams: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            let p = yield prisma.usersOnTeam.findMany({
                select: {
                    team: true
                },
                where: {
                    profileId: id
                }
            });
            let g = [];
            p.forEach(row => {
                g.push(row.team);
            });
            console.log(g);
            return g;
        })
    },
    Game: {
        teams: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            let teams = yield prisma.team.findMany({
                where: {
                    gId: id
                }
            });
            return teams;
        }),
        users: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            let p = yield prisma.userOnGames.findMany({
                select: {
                    profile: true
                },
                where: {
                    gId: id
                }
            });
            let g = [];
            p.forEach(row => {
                g.push(row.profile);
            });
            console.log(g);
            return g;
        })
    },
    Team: {
        game: ({ gId }) => __awaiter(void 0, void 0, void 0, function* () {
            let game = yield prisma.game.findFirst({
                where: {
                    id: gId
                }
            });
            return game;
        }),
        users: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            let p = yield prisma.usersOnTeam.findMany({
                select: {
                    profile: true
                },
                where: {
                    tId: id
                }
            });
            let g = [];
            p.forEach(row => {
                g.push(row.profile);
            });
            console.log(g);
            return g;
        })
    }
};
exports.squadup_schema_v1 = graphql_tools_1.makeExecutableSchema({
    typeDefs: [exports.schema],
    resolvers,
    directiveResolvers
});
//# sourceMappingURL=schema.js.map