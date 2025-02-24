const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: ["https://main.d1bje3iesvq25w.amplifyapp.com/"]
    }
});


const PORT = process.env.PORT || 80;

// クライアントから通信
io.on('connection', (socket) => {
    console.log('クライアントと接続しました');

    // クライアントからの受信
    socket.on("send_message", (date) => {
        console.log(date);

        // クライアントへ送信
        io.emit("received_message", date);
    })




    socket.on('disconnect', () => {
        console.log('クライアントと切断しました');
    });
})

server.listen(PORT, () => console.log(`server is running ...`))