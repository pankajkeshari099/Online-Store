const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db-connection');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', require('./routes/index.js'));

const PORT = process.env.SERVER_PORT || 5000;
connectDB().then(() => {
    try {
        app.listen(PORT, () => {
            console.log("Server running on port ", process.env.SERVER_PORT);
            console.log("connection successful");
        });
    } catch (error) {
        console.error(error);
    }
});