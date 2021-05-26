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
exports.resolvers = exports.game = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const index_1 = require("../prisma/index");
exports.game = apollo_server_core_1.gql `
    type Game{
        id:ID!
        name:String!
        gameId:String!
        maxSize: Int!
        coverUrl: String!
        teams: [Team]!
        users: [Profile]!
    }

`;
exports.resolvers = {
    Game: {
        teams: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            let teams = yield index_1.prisma.team.findMany({
                where: {
                    gId: id
                }
            });
            return teams;
        }),
        users: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            let p = yield index_1.prisma.userOnGames.findMany({
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
};
//# sourceMappingURL=Game.js.map