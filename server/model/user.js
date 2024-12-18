const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true, },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, default: 2 }
},
{
    timestamps: true
});

const userModel = mongoose.model("user", userSchema)
module.exports = userModel
