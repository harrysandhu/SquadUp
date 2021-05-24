import { gql } from "apollo-server-core";
import { prisma } from "src/prisma";
export const user = gql`
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

`

export const setUsernamePayload = gql`

    type SetUsernamePayload{
        username: String!,
        profile_id: ID!

    }

`



export const resolvers = {
    User: {
        device: async ({dID}: any)  =>{
            console.log("device:::", dID)
            let d = await prisma.device.findUnique({
                where : {
                    id: dID
                }
            })
            
            // console.log("device get result: ", device)
            return d
        },
        profile: async ({id}:any) =>{
            let p = await prisma.profile.findFirst({
                where : {
                    uID: id
                }
            })
            
            // console.log("device get result: ", device)
            return p
        }
    }
}