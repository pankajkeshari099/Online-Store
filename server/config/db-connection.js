// const mongoose = require("mongoose");
// const mongoURL = `${process.env.MONGO_URL}${process.env.DB_NAME}`;
// // const mongoURL = `${process.env.MONGO_URL}`;

// // mongoose.connect("mongodb+srv://pankajkeshari099:Pankaj@123@cluster0.yu8eh.mongodb.net/online-shopping-site?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
// //     console.log("Connection Successfull");
// // }).catch(error=>{
// //     console.error(error,"Connection Failed");
// // })
// const connectDB = async ()=>{
//     try {
//         console.log("connecting...");
//         // await mongoose.connect(process.env.MONGO_URL);
//         await mongoose.connect(mongoURL);
//         console.log("connection successfull");
//     } catch (error) {
//         console.error(error);
//     }
// }
// module.exports = connectDB


const mongoose = require("mongoose");
require('dotenv').config(); // Ensure dotenv is configured here

const mongoURL = `${process.env.MONGO_URL}${process.env.DB_NAME}`;

const connectDB = async () => {
    try {
        console.log("Connecting to database...",mongoURL);
        await mongoose.connect(mongoURL);
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection failed", error);
    }
};

module.exports = connectDB;
