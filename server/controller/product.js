const productDao = require('../dao/product.js');

const addProduct = async (req, res) => {
    console.log("product data");
    try {
        let value = req.body;
        let data = {
            productName: value.productName,
            productType: value.productType,
            price: value.price,
            description: value.description,
            stock: value.stock,
            imageurl: value.imageurl
        }
        const result = await productDao.save(data);
        return res.status(200).json({ status: true, message: "Product Added", product: result });
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
}
const getProducts = async (req, res) => {
    try {
        const result = await productDao.find();
        return res.status(200).json({ status: true, products: result });
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
}
const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await productDao.findById(id);
        if(!result)
        {
            return res.status(404).json({ status: false, message: "Product not found!" });
        }
        return res.status(200).json({ status: true, product: result });
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
}
const deleteProduct = async (req, res) => {
    console.log("del");
}
const updateProduct = async (req, res) => {
    console.log("updateProduct");
}
module.exports = {
    addProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}