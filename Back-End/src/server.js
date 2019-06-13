import "./env"; 
import { GraphQLServer } from "graphql-yoga"; 
import logger from "morgan";
import schema from "./Schema";

const server = new GraphQLServer({
    schema
});

server.express.use(logger("dev")); 

server.start(() => console.log(`✅  Server is running on localhost:${process.env.PORT}`));
