"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = void 0;
const apollo_server_core_1 = require("apollo-server-core");
exports.message = apollo_server_core_1.gql `
    type Message{
        id:ID!
        text: String!
        sender: Profile!
        chat: Chat!
        sentAt: DateTime!
    }

`;
//# sourceMappingURL=Message.js.map