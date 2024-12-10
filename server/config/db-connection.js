const mongoose = require("mongoose");
// const mongoURL = `${process.env.MONGO_URL}${process.env.DB_NAME}`;
// const mongoURL = `${process.env.MONGO_URL}`;

// mongoose.connect("mongodb+srv://pankajkeshari099:Pankaj@123@cluster0.yu8eh.mongodb.net/online-shopping-site?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
//     console.log("Connection Successfull");
// }).catch(error=>{
//     console.error(error,"Connection Failed");
// })
const connectDB = async ()=>{
    try {
        console.log("connecting...");
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connection successfull");
    } catch (error) {
        console.error(error);
    }
}
module.exports = connectDB
