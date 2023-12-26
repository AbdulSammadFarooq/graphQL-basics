import {gql} from "apollo-server"
const typeDefs = gql`
    type Query{
        users:[User]
        quotes: [Quote]
        user(id:ID!): User
        singleQuote(by:ID!): [Quote]
    }

    type User{
        _id:ID
        firstName:String
        lastName: String
        email: String
        password: String
        quotes:[Quote]
    }

    type Token {
        token: String!
    }

    type Quote{
        name:String
        by:ID
    }

    type Mutation{
        newUser(firstName:String!, lastName:String!, email:String!, password:String!):User
        signup(firstName:String!, lastName:String!, email:String!, password:String!):User
        signin(email:String!, password:String!):Token
        createQuote(name:String!):String
    }
`

export default typeDefs