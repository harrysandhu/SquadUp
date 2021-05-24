"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPayload = exports.authStage = exports.authType = void 0;
const apollo_server_core_1 = require("apollo-server-core");
exports.authType = apollo_server_core_1.gql `
    enum AuthType{
        GOOGLE
        FACEBOOK
        EMAIL
    }

`;
exports.authStage = apollo_server_core_1.gql `
    enum AuthStage{
        SIGNUP
        USERNAME
        SUB
        FINAL
    }

`;
exports.authPayload = apollo_server_core_1.gql `
   type AuthPayload{
        user: User!
        auth_token: String!
    }

`;
//# sourceMappingURL=Auth.js.map