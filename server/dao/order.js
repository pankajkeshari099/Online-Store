const mongoose = require('mongoose');
const orderModel = require('../model/order.js');

module.exports.save = async (orderData) => {
  const order = new orderModel(orderData);
  return await order.save();
}

module.exports.getOrder = async (userId, userType) => {
  try {
    const matchStage = userType == 1 ? {} : { userId: new mongoose.Types.ObjectId(userId) }
    const result = await orderModel.aggregate([
      {
        $match: matchStage
      },
      {
        $unwind: '$items'
      },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $unwind: '$productDetails'
      },
      {
        $project: {
          userId: 1,
          status: 1,
          createdAt: 1,
          'items.productId': 1,
          'items.quantity': 1,
          'items.price': 1,
          productDetails: {
            imageUrls: '$productDetails.imageUrls',
            productName: '$productDetails.productName',
            description: '$productDetails.description',
            discount: '$productDetails.discount',
            stock: '$productDetails.stock'
          }
        }
      },
      {
        $sort: { createdAt: -1 } // sorting by createdAt in descending order
      },
      {
        $group: {
          _id: '$userId',
          status: { $first: '$status' },
          items: {
            $push: {
              productId: '$items.productId',
              quantity: '$items.quantity',
              price: '$items.price',
              productDetails: '$productDetails'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          status: 1,
          items: 1
        }
      }
    ]);
    return result;
  } catch (err) {
    console.error('Error executing the query:', err);
    throw err;
  }
};