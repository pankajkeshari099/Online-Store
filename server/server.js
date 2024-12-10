const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db-connection');
const bodyparser = require('body-parser')

const app = express();
app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use('/api',require('./routes/routes'))

connectDB();
const PORT = process.env.SERVER_PORT;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})