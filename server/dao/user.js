const UserModel = require('../model/user.js')

module.exports.save = async(userData)=>{
    const user = new UserModel(userData);
    return await user.save()
}
module.exports.findOne = async(email)=>{
    return await UserModel.findOne({email: email})
}
module.exports.findById = async (id) =>{
    return UserModel.findById({_id: id});
}
module.exports.find = async() => {
    return UserModel.find({role: {$ne: 1}}, 'username email phone address');
}