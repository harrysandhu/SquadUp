"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chat = void 0;
const apollo_server_core_1 = require("apollo-server-core");
exports.chat = apollo_server_core_1.gql `
  type Chat{
        id: ID!
        team: Team!
        messages: [Message]!
    }
`;
//# sourceMappingURL=Chat.js.map