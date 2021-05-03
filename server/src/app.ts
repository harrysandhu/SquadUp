import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { ApolloServer, ForbiddenError } from 'apollo-server-express'
import { createServer } from "http"
import cors from "cors"
// import schema from "./data/schema"
// import { btw_api_schema } from './data/schemax'
import { squadup_schema_v1 } from './schemas/schema';
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const validClient = "squadup69"

const app:express.Application = express()
const PORT:number = 3030


app.use(morgan("tiny"))
app.use(cors())
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }))
app.set('json spaces', 2);



const server = new ApolloServer({
    schema: squadup_schema_v1,
    subscriptions: { path: "/websockets" },
    context: async ({ req }) => {
        let apitoken = req.headers["x-api-key"]
        if(validClient != apitoken){
            throw new ForbiddenError("This client is unauthorized.")
        }
        return {req}
    }
})


app.get("/custom", (req:any, res:any) =>{
    console.log("inital: ", req)
    res.json({message: "hello"})
})


server.applyMiddleware({app})
const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)


httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
})
