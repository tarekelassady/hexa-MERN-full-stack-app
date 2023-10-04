import mongoose from "mongoose";

const commentSchema=mongoose.Schema({
    userId:{
        type: String,
        required:true,
        ref:"User" //name of exported model in model/user.js
    },
    projectId:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
},{timestamps:true})

export default mongoose.model("Comment",commentSchema)