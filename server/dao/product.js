const productModel = require('../model/product.js')


module.exports.save = async (product) => {
    const result = new productModel(product);
    return result.save();
}
module.exports.findByType = async (ProductType, price, brand) => {
    const regex = new RegExp(ProductType, 'i');
    let query = { productType: regex }
    return await productModel.find(query);
}
module.exports.findByTypeAndFilter = async (ProductType, price, brand) => {
    const regex = new RegExp(ProductType, 'i');
    let query = { productType: regex }

    if (price) {
        const priceRanges = {
            '1000': { $lte: 1000 },
            '2000': { $lte: 2000 },
            '5000': { $lte: 5000 },
            '10000': { $lte: 10000 },
            'more than 15000': { $gte: 15000 }
        };
        query.price = priceRanges[price];
    }
    if (brand) {
        const brandRegex = new RegExp(brand, 'i');
        query.brand = brandRegex;
    }
    return await productModel.find(query);
}
module.exports.findById = async (id) => {
    return await productModel.findById(id);
}
module.exports.findAllCategory = async () => {
    return await productModel.distinct("productType")
}
module.exports.findOneByCategory = async (category) => {
    const regex = new RegExp(category, 'i');
    return await productModel.findOne({ productType: regex });
}
module.exports.getProductBrands = async (category) => {
    const regex = new RegExp(category, 'i');
    return await productModel.distinct("brand", { productType: regex });
};
module.exports.delete = async (productId) => {
    return await productModel.deleteOne({ _id: productId })
}
module.exports.update = async (id, product) => {
    return productModel.updateOne({ _id: id }, { $set: product })
}