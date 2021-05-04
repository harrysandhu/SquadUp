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
        username: String!
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
        deviceId: ID!
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
const deviceData = {
    "abc123": {
        id: "abc123",
        deviceId: "111.111.111",
        createdAt: "2018-05-28T10:26:39.359Z"
    }
};
const userData = {
    "user123": {
        id: "user123",
        userId: "userid123123123",
        idToken: "bruhh",
        email: "hras@gmail.com",
        authStage: 'SUB',
        authType: 'GOOGLE',
        createdAt: "2018-05-28T10:26:39.359Z",
        dob: "1999-05-28T10:26:39.359Z",
        device: 'abc123',
        profile: "profile123"
    }
};
const profileData = {
    "profile123": {
        id: "profile123",
        name: "Harry",
        username: "harryxsandhu",
        avatarUrl: "http://wef3ec.com/ttt.png",
        bio: "hi whats up",
        user: "user123"
    }
};
const resolvers = {
    DateTime: graphql_iso_date_1.GraphQLDateTime,
    Date: graphql_iso_date_1.GraphQLDate,
    Query: {
        device: (root, { deviceId }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`root${root} , CTX: ${ctx}`);
            let device = yield prisma.device.findUnique({
                where: {
                    deviceId: deviceId
                }
            });
            console.log("device get result: ", device);
            return device;
        }),
        user: (root, { id }, ctx) => {
            console.log(`root${root} , CTX: ${ctx}`);
            return userData[id];
        },
        profile: (root, { username }, ctx) => {
            console.log(`root${root} , CTX: ${ctx}`);
            return profileData[username];
        }
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
        })
    },
    User: {
        device: ({ device }) => {
            console.log("this ran", device);
            return deviceData[device];
        },
        profile: ({ profile }) => {
            return profileData[profile];
        }
    }
};
exports.squadup_schema_v1 = graphql_tools_1.makeExecutableSchema({
    typeDefs: [exports.schema],
    resolvers,
    directiveResolvers
});
//# sourceMappingURL=schema.js.map