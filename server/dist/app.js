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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const schema_1 = require("./schemas/schema");
const validClient = "squadup69";
const app = express_1.default();
const PORT = 3030;
app.use(morgan_1.default("tiny"));
app.use(cors_1.default());
app.use(body_parser_1.default.json({ limit: '5mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '5mb', extended: false }));
app.set('json spaces', 2);
const server = new apollo_server_express_1.ApolloServer({
    schema: schema_1.squadup_schema_v1,
    subscriptions: { path: "/websockets" },
    context: ({ req, connection }) => __awaiter(void 0, void 0, void 0, function* () {
        if (connection) {
            return connection.context;
        }
        let apitoken = req.headers["x-api-key"];
        if (validClient != apitoken) {
            throw new apollo_server_express_1.ForbiddenError("This client is unauthorized.");
        }
        return { req };
    })
});
app.get("/custom", (req, res) => {
    console.log("inital: ", req);
    res.json({ message: "hello" });
});
server.applyMiddleware({ app });
const httpServer = http_1.createServer(app);
server.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
//# sourceMappingURL=app.js.map