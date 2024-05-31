const express = require('express');
const cors = require('cors');
const chats = require('./dummydata/data');
require('dotenv').config();
const app = express();
app.use(cors());


app.get('/', (req, res) =>{
    res.send("API is running successfully");
});


app.get("/api/chat", (req, res) =>{
    res.send(chats);
    console.log(chats);
})

// app.get("/api/chat/:id", (req, res) =>{
//     const singleChat = chats.find((c) => c._id === req.params.id);
//     res.send(singleChat)
// })

const PORT = process.env.BACKEND_PORT || 5000 ;
app.listen(PORT, console.log(`Server is running on ${PORT}`));