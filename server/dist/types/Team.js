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
exports.resolvers = exports.team = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const index_1 = require("../prisma/index");
exports.team = apollo_server_core_1.gql `
    type Team{
        id: ID!
        name:String!
        teamId:String!
        game: Game!
        coverUrl: String!
        users: [Profile]!
        chat: Chat
    }
`;
exports.resolvers = {
    Team: {
        game: ({ gId }) => __awaiter(void 0, void 0, void 0, function* () {
            let game = yield index_1.prisma.game.findFirst({
                where: {
                    id: gId
                }
            });
            return game;
        }),
        chat: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            let chat = yield index_1.prisma.chat.findFirst({
                where: {
                    teamId: id
                }
            });
            return chat;
        }),
        users: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            let p = yield index_1.prisma.usersOnTeam.findMany({
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
//# sourceMappingURL=Team.js.map