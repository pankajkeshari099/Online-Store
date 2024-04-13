const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
});

const CollectionName = "users";

module.exports = {
    collectionSchema,
    CollectionName
};
