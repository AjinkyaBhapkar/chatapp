const express = require('express');
const app = express();
const cors = require('cors')

const mongoose =require("mongoose");
require ('dotenv').config();
const messageRoute = require("./routes/messages");
const userRoute = require("./routes/users");
const conversationRoute = require("./routes/conversations");



const uri =process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true});

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connected!!!");
})

app.use(cors())


app.use("/messages", messageRoute);
app.use("/conversations", conversationRoute);
app.use("/users", userRoute);



const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

const PORT= 5000||process.env.PORT


io.on('connection', (socket) => {
    
});

server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});