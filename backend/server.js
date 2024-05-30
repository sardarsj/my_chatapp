const express = require('express');
const chats = require('./dummydata/data');
require('dotenv').config();
const app = express();

app.get('/', (req, res) =>{
    res.send("API is running successfully");
});


app.get("/api/chats", (req, res) =>{
    res.send(chats);
})

app.get("/api/chats/:id", (req, res) =>{
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat)
})

const PORT = process.env.BACKEND_PORT || 5000 ;


app.listen(PORT, console.log(`Server is running on ${PORT}`));