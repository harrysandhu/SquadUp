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
exports.resolvers = exports.profile = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const index_1 = require("../prisma/index");
exports.profile = apollo_server_core_1.gql `
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

`;
exports.resolvers = {
    Profile: {
        games: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            let p = yield index_1.prisma.userOnGames.findMany({
                select: {
                    game: true
                },
                where: {
                    profileId: id
                }
            });
            let g = [];
            p.forEach((row) => {
                g.push(row.game);
            });
            console.log(g);
            return g;
        }),
        teams: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            let p = yield index_1.prisma.usersOnTeam.findMany({
                select: {
                    team: true
                },
                where: {
                    profileId: id
                }
            });
            let g = [];
            p.forEach((row) => {
                g.push(row.team);
            });
            console.log(g);
            return g;
        })
    },
};
//# sourceMappingURL=Profile.js.map