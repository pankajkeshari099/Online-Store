const mongoose = require('mongoose');
const cartModel = require('../model/cart.js');
const productModel = require('../model/product.js');

module.exports.save = async (data) => {
  const order = new cartModel(data);
  return await order.save();
}

module.exports.isExist = async (userId) => {
  return await cartModel.findOne({ userId: userId });
}

module.exports.update = async (data) => {
  return await cartModel.updateOne(
    { userId: data.userId },
    { $push: { items: { $each: data.items } } }
  );
}

module.exports.getCart = async (userId) => {
  try {
    const result = await cartModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId)
        }
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
        $group: {
          _id: '$userId',
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


module.exports.removeCartProduct = async (userId, productId) => {
  return await cartModel.updateOne(
    { userId: userId },
    { $pull: { items: { "productId": productId } } }
  )
}
module.exports.updateCartListQty = async (userId, data) => {
  const { productId, actionType } = data;
  let value = actionType === 'plus' ? 1 : -1;
  return await cartModel.updateOne(
    { userId: userId, "items.productId": productId },

    {
      $inc: { "items.$.quantity": value }
    }
  )
}
module.exports.findProductByUserId = async (userId) => {
  return await cartModel.findOne({ userId: new mongoose.Types.ObjectId(userId) }).select('items');
}
module.exports.delete = async(userId) => {
  return await cartModel.deleteOne({userId: userId})
}
module.exports.manageStock = async(data) => {
  for (const item of data) {
    await productModel.updateMany(
      { _id: item.productId },
      { $inc: { stock: -item.quantity } }
    );
  }
  return true;
};
