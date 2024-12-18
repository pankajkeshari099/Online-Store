const productModel = require('../model/product.js');

module.exports.save = async (data) => {
    const product = new productModel(data);
    return await product.save();
}

module.exports.find = async() => {
    return await productModel.find();
}