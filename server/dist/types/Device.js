"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.device = void 0;
const apollo_server_core_1 = require("apollo-server-core");
exports.device = apollo_server_core_1.gql `

    type Device{
        id: ID!
        deviceId: ID!
        createdAt: DateTime!
    }


`;
//# sourceMappingURL=Device.js.map