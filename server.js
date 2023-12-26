import {ApolloServer} from "apollo-server"
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import "./connection.js"
import "./models/Quotes.js"
import "./models/Users.js"
import typeDefs from "./schema.js"
import resolvers from "./resolver.js"
import jwt from "jsonwebtoken"

const server = new ApolloServer({typeDefs,resolvers,
    context:({req})=>{
        const token = req.headers.token 
        if(token){
            const {_id} = jwt.verify(token,"qwertyuiop")
            return {_id}
        }
    },
     plugins:[ApolloServerPluginLandingPageGraphQLPlayground]})

server.listen().then(({url})=>{
    console.log(`server is running on port ${url}`)
})