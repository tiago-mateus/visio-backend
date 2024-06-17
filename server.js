const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// Allow requests from specific origins
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send(`<h1>Socket IO Start on Port : ${PORT}</h1>`);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (msg) => {
        io.emit('message', msg);
    });
});

server.listen(PORT, () => {
    console.log(`Listening on *:${PORT}`);
});
