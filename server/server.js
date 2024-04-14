const express = require('express');
const app = express();
const bodyparser = require('body-parser')
require('dotenv').config();
require('./config/db-connection');
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use('/api',require('./routes/routes'))

const PORT = process.env.SERVER_PORT;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})