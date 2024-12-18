const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productType: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    imageurl: { type: String, required: true }
},
    {
        timestamps: true
    })

const productModel = mongoose.model('product', productSchema);
module.exports = productModel;