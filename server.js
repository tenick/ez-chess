const http = require('http');
const fs = require('fs');
const express = require('express');

const app = express();
app.listen(8888);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
});

app.get('/chess', (req, res) => {
    res.sendFile('./chess.html', { root: __dirname });
});