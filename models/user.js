const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types
const UserSchema = new mongoose.Schema({
    displayname: {
        type:String,
        require:true,
        trim:true
    },
    avatar: {
        type:String,
        default:"https://res.cloudinary.com/longlongne/image/upload/v1661063654/noimage_st7it7.png"
    },
    background: {
        type:String,
        default:"https://res.cloudinary.com/longlongne/image/upload/v1662989486/noimagebackground_ajjg1a.jpg"
    },
    email: {
        type:String,
        unique:true,
        require:true,
        trim:true
    },
    password: {
        type:String,
        require:true,
        trim:true
    },
    followers:[{
        type:ObjectId,
        ref:"User"
    }],
    following:[{
        type:ObjectId,
        ref:"User"
    }]
})

exports.User = mongoose.model("User",UserSchema)
