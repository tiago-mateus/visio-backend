const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = socketIo(server, {
  cors: {
    origin: '*', // ou substitua '*' pela URL específica do frontend, por exemplo: 'https://seu-frontend.vercel.app'
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

// Use o middleware CORS
app.use(cors({
  origin: '*', // ou substitua '*' pela URL específica do frontend, por exemplo: 'https://seu-frontend.vercel.app'
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Servidor rodando...');
});

io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  socket.on('message', (msg) => {
    console.log('Mensagem recebida:', msg);
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(PORT, () => {
  console.log('Servidor rodando na porta '+PORT);
});
