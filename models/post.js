const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types
const PostSchema = new mongoose.Schema({
    caption: {
        type:String,
    },
    assets:[{
        type:String
    }],
    likes:[{
        type:ObjectId,
        ref:"User"
    }],
    comments:[{
        text:String,
        postedBy:{
            type:ObjectId,
            ref:"User"
        }
    }],
    postedBy: {
        type:ObjectId,
        ref:"User"
    },
    privacy: {
        type:Boolean,
        default:true
    }
},
{timestamps:true})

const Post = mongoose.model("Post", PostSchema)
module.exports = Post