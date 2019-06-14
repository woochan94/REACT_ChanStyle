import "./env"; 
import { GraphQLServer } from "graphql-yoga"; 
import logger from "morgan";
import schema from "./Schema";
import "./passport"; 
import { authenticateJwt } from "./passport";


const server = new GraphQLServer({
    schema,
    context: ({request}) => ({ request })
});

server.express.use(logger("dev")); 
server.express.use(authenticateJwt);

server.start(() => console.log(`✅  Server is running on localhost:${process.env.PORT}`));
 