const productModel = require('../model/product.js')


module.exports.save = async (product) => {
    const result = new productModel(product);
    return result.save();
}
module.exports.findByType = async(selectType) => {
    const regex = new RegExp(selectType, 'i');
    return await productModel.find({productType: regex});
}
module.exports.findById = async(id) => {
    return await productModel.findById(id);
}
module.exports.findAllCategory = async()=> {
    return await productModel.distinct("productType")
}
module.exports.findOneByCategory = async(category) => {
    const regex = new RegExp(category, 'i');
    return await productModel.findOne({productType: regex});
}