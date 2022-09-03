const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.json())

const mongoose =require("mongoose");
require ('dotenv').config();


const messageRoute = require("./routes/messages");
const userRoute = require("./routes/users");
const conversationRoute = require("./routes/conversations");

const port = 5000|| process.env.PORT

const uri =process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true});

const connection=mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB database connected!!!");
})

 

app.use("/messages", messageRoute);
app.use("/conversations", conversationRoute);
app.use("/users", userRoute);

const io =require('socket.io')(5500,{
    cors: {
        origin:'http://localhost:3000',
    },
})

io.on('connection',(socket)=>{
    console.log('user connected'+socket.id)
})

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});