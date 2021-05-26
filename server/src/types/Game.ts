import { gql } from "apollo-server-core";
import { prisma } from "../prisma/index";


export const game = gql`
    type Game{
        id:ID!
        name:String!
        gameId:String!
        maxSize: Int!
        coverUrl: String!
        teams: [Team]!
        users: [Profile]!
    }

`

export const resolvers = {
    Game: {
        teams: async ({id}: any) => {
            let teams  = await prisma.team.findMany({
                where:{
                    gId: id
                }
            })
            return teams
        },
        users: async ({id}: any) => {
            let p = await prisma.userOnGames.findMany({
                select:{
                    profile: true
                },
                where : {
                    gId: id
                }
            })
            let g:any = []
            p.forEach(row => {
                g.push(row.profile)
            })
            console.log(g)
            // console.log("device get result: ", device)
            return g
        }
    },

}
