const productDao = require('../dao/product.js');

const addProduct = async (req, res) => {
    try {
        const { productName, description, price, discount, stock, imageUrls, productType } = req.body;
        // Create product object
        let product = {
            productName,
            description,
            price,
            discount,
            stock,
            imageUrls: imageUrls || [], // Ensure imageUrls is an array
            productType
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
        const selectType = req.params.type;
        const result = await productDao.findByType(selectType);
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

const getProductCategory = async(req, res) =>{
    try {
        const productCategory = await productDao.findAllCategory();
        const productByCategory = [];
        for(const category of productCategory)
        {
            const product = await productDao.findOneByCategory(category);
            if(product)
            {
                productByCategory.push(product);
            }
        }
        res.status(200).json({status:true, productCategory: productByCategory, message: 'product category'});
    } catch (error) {
        console.error(error);
        res.status(500).json({status: false, message:"Interal Server Error"})
    }
}
module.exports = {
    addProduct,
    getProduct,
    productById,
    getProductCategory
}