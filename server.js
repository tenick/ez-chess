const http = require('http');
const fs = require('fs');
const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(8888);
const io = socket(server);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
});

app.get('/chess', (req, res) => {
    res.sendFile('./chess.html', { root: __dirname });
});


io.on('connection', socket => {
    console.log('socket ' + socket.id + ' connected');
});