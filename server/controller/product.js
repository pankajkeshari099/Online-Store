const productDao = require('../dao/product.js');

const addProduct = async (req, res) => {
    try {
        const { productName, description, price, discount, stock, imageUrls, productType, brand } = req.body;
        // Create product object
        let product = {
            productName,
            description,
            price,
            discount,
            stock,
            imageUrls: imageUrls || [], // Ensure imageUrls is an array
            productType,
            brand
        };
        const result = await productDao.save(product);
        res.status(200).json({ status: true, message: 'Product Added', product: result });
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}

const getProduct = async (req, res) => {
    try {
        const { ProductType } = req.query;
        const result = await productDao.findByType(ProductType);
        res.status(200).json({ status: true, message: 'Product Found', products: result });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server Error' });
        console.error(error);
    }
}
const getFilterProduct = async (req, res) => {
    try {
        const { ProductType, price, brand } = req.query;
        const result = await productDao.findByTypeAndFilter(ProductType, price, brand);
        res.status(200).json({ status: true, message: 'Product Found', products: result });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server Error' });
        console.error(error);
    }
}
const productById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await productDao.findById(id);
        res.status(200).json({ status: true, message: 'Product Found', product: result });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server Error' });
        console.error(error);
    }
}

const getProductCategory = async (req, res) => {
    try {
        const productCategory = await productDao.findAllCategory();
        const productByCategory = [];
        for (const category of productCategory) {
            const product = await productDao.findOneByCategory(category);
            if (product) {
                productByCategory.push(product);
            }
        }
        res.status(200).json({ status: true, productCategory: productByCategory, message: 'product category' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Interal Server Error" })
    }
}

const getProductBrands = async (req, res) => {
    try {
        const productType = req.params.productType;
        const result = await productDao.getProductBrands(productType);
        res.status(200).json({ status: true, message: 'Brands Found', brand: result });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server Error' });
        console.error(error);
    }
}
const deleteProduct = async(req, res) => {
    try {
        const { productId } = req.params;
        const result = await productDao.delete(productId);
        res.status(200).json({ status: true, message: 'Product deleted', product: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
const updateProduct = async(req, res) => {
    try {
        const { id, productName, description, price, discount, stock, imageUrls, productType, brand } = req?.body;
        if (!id || !productName || !description || !price || !stock) {
            return res.status(400).json({ status: false, message: 'Missing required fields' });
        }
        let product = {
            productName,
            description,
            price,
            discount,
            stock,
            imageUrls: imageUrls || [],
            productType,
            brand
        };
        const result = await productDao.update(id,product);
        res.status(200).json({ status: true, message: 'Product Updated Successfully', product: result });
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
module.exports = {
    addProduct,
    getProduct,
    productById,
    getProductCategory,
    getProductBrands,
    getFilterProduct,
    deleteProduct,
    updateProduct
}