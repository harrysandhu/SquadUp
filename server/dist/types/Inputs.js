"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUsername = exports.teamInput = exports.gameInput = exports.userInputSignUp = exports.googleUserInput = void 0;
const apollo_server_core_1 = require("apollo-server-core");
exports.googleUserInput = apollo_server_core_1.gql `
    input GoogleUserInput{
        userId: ID!
        name: String!
        email: String!
        dob: DateTime!
        avatarUrl: String!
    }
`;
exports.userInputSignUp = apollo_server_core_1.gql `
    input UserInputSignUp{
        userId: ID!
        name: String!
        email: String!
        avatarUrl: String!
        authType: AuthType
        dID: ID!
    }
`;
exports.gameInput = apollo_server_core_1.gql `
   input GameInput{
        name: String!
        gameId:String!
        maxSize: Int!
        coverUrl: String!
    }
`;
exports.teamInput = apollo_server_core_1.gql `
   input TeamInput{
        name: String!
        teamId:String!
        coverUrl: String!
        gId: String!
    }
`;
exports.setUsername = apollo_server_core_1.gql `
      input SetUsername{
        username: String!,
        profile_id: ID!
    }
`;
//# sourceMappingURL=Inputs.js.map