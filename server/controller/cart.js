const cartDao = require('../dao/cart.js');

const saveCart = async (req, res) => {
    try {
        let data = {
            userId: req.user._id,
            items: req.body.items,
        }
        const isExist = await cartDao.isExist(data.userId);
        if (isExist) {
            const itemExists = isExist.items.some(item => item.productId.toString() === data.items[0].productId.toString());
            if (itemExists) {
                return res.status(404).json({ status: false, message: 'Already Added In Cart' });
            }

            await cartDao.update(data);
            return res.status(200).json({ status: true, message: 'Product added in cart' });
        }
        await cartDao.save(data);
        return res.status(200).json({ status: true, message: 'Product added in cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
const getCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const result = await cartDao.getCart(userId);
        res.status(200).json({ status: true, message: 'Product get succrssfully', productDetails: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}

const removeCartProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user._id;
        const result = await cartDao.removeCartProduct(userId, productId);
        res.status(200).json({ status: true, message: "Product Removed", product: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

const updateCartListQty = async (req, res) => {
    try {
        const userId = req.user._id;
        let data = req.body;
        const result = await cartDao.updateCartListQty(userId, data)
        res.status(200).json({ status: true, product: result});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}
module.exports = {
    saveCart,
    getCart,
    removeCartProduct,
    updateCartListQty
}