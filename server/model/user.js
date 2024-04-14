const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
});
function getCollection(database = process.env.DB_NAME) {
    const connection = mongoose.connection.useDb(database);
    return connection.model('Users', userSchema)
}
module.exports = {
    getCollection
};
