import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    by:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const Quote = mongoose.model("Quote",quoteSchema)

export default Quote