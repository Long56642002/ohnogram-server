const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = mongoose.model("User")

exports.getAllUsers = (req,res) => {
    User.find().then((user)=>{
        res.status(200).json({
            data:{
                message:"successfully",
                data:user
            }
        })
    }).catch(err=>{
        return res.status(422).json({
            data:{
                message:err
            }
        })
    })
}

exports.signUp = async (req,res) => {
    const {displayname, email, password} = req.body
    if (!displayname || !email || !password) {
        return res.status(422).json({
            data:{
                message:"please add all field"
            }
        })
    }
    if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        return res.status(400).json({
            data:{
                message:"invalid email"
            }
        })
    }
    User.findOne({email:email}).then((existUser)=>{
        if (existUser) {
            return res.status(409).json({
                data:{
                    message:"This email is already used"
                }
            })
        }
        bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                displayname,
                email,
                password:hashedPassword
            })
            user.save()
            .then(user=>{
                res.status(200).json({
                    data:{
                        message:"Create account successfully!"
                    }
                })
            }).catch(err=>{
                console.log(err.message);
                res.status(500).json({
                    data:{
                        message:err.message
                    }
                })
            })
        }).catch(err=>{
            console.log(err.message);
            res.status(500).json({
                data:{
                    message:err.message
                }
            })
        })
    }).catch(err=>{
        console.log(err.message);
        res.status(500).json({
            data:{
                message:err.message
            }
        })
    })
}