const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.json())

const mongoose = require("mongoose");
require('dotenv').config();


const messageRoute = require("./routes/messages");
const userRoute = require("./routes/users");
const conversationRoute = require("./routes/conversations");

const port = 5000 || process.env.PORT

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connected!!!");
})



app.use("/messages", messageRoute);
app.use("/conversations", conversationRoute);
app.use("/users", userRoute);

const io = require('socket.io')(5500, {
    cors: {
        origin: 'http://localhost:3000',
    },
})

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
    console.log('user connected' + socket.id)

    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
    })

    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
})
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});