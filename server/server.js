const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db-connection');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes/routes'));

connectDB();

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
