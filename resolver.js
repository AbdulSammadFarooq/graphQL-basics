import {quotes,users} from "./fakeData.js"
import {randomBytes} from "crypto"
import User from "./models/Users.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Quote from "./models/Quotes.js"
const resolvers = {
    Query:{
        users:async()=> await User.find({}),
        quotes:async()=>await Quote.find({}),
        user:async(parent,args)=> await User.findById({_id:args.id}),
        singleQuote:async(parent,args) =>await Quote.find({by:args.by}),
    },
    User:{
        quotes:(us)=> quotes.filter((quote)=> quote.by == us.id)
    },

    Mutation:{
        newUser: (_, {firstName, lastName, email, password})=>{
            const id = randomBytes(5).toString("hex")
            users.push({id, firstName,lastName,email,password})
            return users.find((user)=> user.id == id)
        },
        signup: async (_, {firstName, lastName,email,password})=>{
            const user = await User.findOne({email:email})
            if (user){
                throw new Error("User already exists")
            }else{
                const salt =await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    password:hashPassword
                })
                return await newUser.save()
            }
        },
        signin: async (_,{email,password})=>{
            const user = await User.findOne({email:email})
            if(!user){
                throw new Error("User does not exist into database. Please Signup first")
            }else{
                const isMatch = bcrypt.compare(password, user.password)
                if(!isMatch){
                    throw new Error("invalid email or password")
                }else{
                    const token =jwt.sign({_id:user._id},"qwertyuiop")
                    return {token}
                }
            }
        },
        createQuote: async (_,{name}, context)=>{
            if (!context._id) throw new Error("You must be logged in")
            const newQuote = new Quote({name, by:context._id})
            await newQuote.save()
            return "New Quote created successfully"
        }
        
    }
    
}

export default resolvers