const orderDao = require('../dao/order.js');
const cartDao = require('../dao/cart.js');
const save = async (req, res) => {
    try {
        const userId = req.user._id;
        const getCartData = await cartDao.findProductByUserId(userId);
        let orderData = {
            userId: userId,
            items: getCartData.items,
            totalAmount: req.body.totalAmount,
            status: req.body.status
        }
        const result = await orderDao.save(orderData);
        if(result)
            {
                await cartDao.delete(userId);
                await cartDao.manageStock(orderData.items);
        }
        res.status(200).json({ status: true, message: 'Order has been placed successfully', order: result })
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
const getOrder = async (req, res) => {
    try {
        const { userType } = req.params;
        const userId = req.user._id;
        const result = await orderDao.getOrder(userId, userType);
        res.status(200).json({ status: true, message: 'Order get succrssfully', orderDetails: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}
module.exports = {
    save,
    getOrder
}