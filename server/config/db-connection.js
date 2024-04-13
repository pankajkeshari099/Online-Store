const mongoose = require("mongoose");
const mongoURL = `${process.env.MONGO_URL}${process.env.DB_NAME}`;
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connection Successfull");
}).catch(error=>{
    console.error(error,"Connection Failed");
})
