import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from "http"
import cors from "cors"
// import schema from "./data/schema"
// import { btw_api_schema } from './data/schemax'
import { squadup_schema_v1 } from './schemas/schema';



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
    context: ({ req }) => ({ req })
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
