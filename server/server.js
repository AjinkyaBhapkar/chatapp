const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
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