const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Rota SSE para enviar eventos SSE para o cliente
app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.flushHeaders();

    let counter = 0;

    // Envia um evento SSE a cada 2 segundos
    setInterval(() => {
        const eventData = `data: {"message": "Event ${counter} received from /sse"}\n\n`;
        res.write(eventData);
        counter++;
    }, 2000);
});

app.listen(3000, () => {
    console.log('Servidor escutando na porta 3000');
});