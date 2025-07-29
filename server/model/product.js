const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    discount: { type: String, required: true },
    stock: { type: Number, required: true },
    imageUrls: [{ type: String }],
    productType: { type: String },
    brand:{type: String}
},
{
    timestamps:true
})

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;