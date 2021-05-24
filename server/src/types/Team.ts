import { gql } from "apollo-server-core";
import { prisma } from "../prisma/index";

export const team = gql`
    type Team{
        id: ID!
        name:String!
        teamId:String!
        game: Game!
        coverUrl: String!
        users: [Profile]!
        chat: Chat
    }
`



export const resolvers = {
        
    Team: {
        game: async ({gId}: any) => {
            let game = await prisma.game.findFirst({
                where:{
                    id: gId
                }
            })
            return game
        },
        users: async ({id}: any) => {
            let p = await prisma.usersOnTeam.findMany({
                select:{
                    profile: true
                },
                where : {
                    tId: id
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
    }
}