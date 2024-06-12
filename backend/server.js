const express = require('express');
const cors = require('cors');
const {chats} = require('./dummydata/data');
const connectDB = require('./config/db');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

connectDB();
const app = express();
app.use(cors());

app.use(express.json()); //to accept json data 


app.get('/', (req, res) =>{
    res.send("API is running successfully");
});

app.use('/api/user', userRoutes);

//if uprr vaala koi URL ni khulega then thle error handling vl chale jaayega

app.use(notFound);
app.use(errorHandler);

 


const PORT = process.env.BACKEND_PORT || 5000 ;
app.listen(PORT, console.log(`Server is running on ${PORT}`));