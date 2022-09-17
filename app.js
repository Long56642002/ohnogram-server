const express = require("express")
const mongoose = require('mongoose')
const morgan = require("morgan")
const app = express()

require('dotenv').config();

//connect to MongoDB
mongoose.connect(process.env.MONGOURI,{useNewUrlParser: true})
mongoose.connection.on('connected', ()=>{
    console.log("Connect to mongodb successfully");
})

//write log morgan
morgan.token('host', function(req, res) {
    return req.hostname;
})
app.use(morgan(':method :host :status :res[content-length] - :response-time ms'))

//middleware using
app.use(express.json())

//get models
require('./models/user')
require('./models/post')
app.use("/api/user", require('./routes/userRoutes'))

app.use("/test",(req,res)=>{
    res.send("Test api")
})

//server
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`);
})