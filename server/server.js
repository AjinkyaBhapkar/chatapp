const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.json())
const path = require('path')
const mongoose = require("mongoose");
require('dotenv').config();


const server = require('http').createServer(app);

const messageRoute = require("./routes/messages");
const userRoute = require("./routes/users");
const conversationRoute = require("./routes/conversations");
const {Server} = require('socket.io');

const port =  process.env.PORT || 5000

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connected!!!");
})



app.use("/messages", messageRoute);
app.use("/conversations", conversationRoute);
app.use("/users", userRoute);




const io = new Server(server, {
    cors: {
        origin: 'https://tinggg.herokuapp.com',
    },
})

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
        console.log(users)
        
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (Id) => {
    console.log(Id[0])
    let fu= users.find((user) => user.userId === Id[0]);
    console.log('fu')
    console.log(fu)
    return fu;
};

io.on('connection', (socket) => {
    console.log('user connected' + socket.id)

    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", async({ senderId, receiverId, text }) => {
        const user = await getUser(receiverId);
        
        if(user !== null && user !== undefined){io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });}
    })


    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
    

})

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

server.listen(port, () => {
    console.log(`Server started on ${port}`);

});