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
exports.resolvers = exports.setUsernamePayload = exports.user = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const index_1 = require("../prisma/index");
exports.user = apollo_server_core_1.gql `
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

`;
exports.setUsernamePayload = apollo_server_core_1.gql `

    type SetUsernamePayload{
        username: String!,
        profile_id: ID!

    }

`;
exports.resolvers = {
    User: {
        device: ({ dID }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("device:::", dID);
            let d = yield index_1.prisma.device.findUnique({
                where: {
                    id: dID
                }
            });
            return d;
        }),
        profile: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            let p = yield index_1.prisma.profile.findFirst({
                where: {
                    uID: id
                }
            });
            return p;
        })
    }
};
//# sourceMappingURL=User.js.map