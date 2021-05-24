import { gql } from "apollo-server-core";
import { prisma } from "src/prisma";
export const profile = gql`
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

`

export const resolvers = {
    Profile: {
        games: async ({id}:any) =>{
            let p = await prisma.userOnGames.findMany({
                select:{
                    game: true
                },
                where : {
                    profileId: id
                }
            })
            let g:any = []
            p.forEach(row => {
                g.push(row.game)
            })
            console.log(g)
            // console.log("device get result: ", device)
            return g
        },
        teams: async ({id}:any) =>{
            let p = await prisma.usersOnTeam.findMany({
                select:{
                    team: true
                },
                where : {
                    profileId: id
                }
            })
            let g:any = []
            p.forEach(row => {
                g.push(row.team)
            })
            console.log(g)
            // console.log("device get result: ", device)
            return g
        }
    },
}