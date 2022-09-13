const User = require('./schema/userSchema')

const findUser = (item) => User.findOne(item).lean();

const createUser = (data) =>User.create(data);

const findAndUpdateUser = (id, IDtoken) => User.findByIdAndUpdate(id, IDtoken);

const findAndUpdate = (id, setID) => User.findOneAndUpdate(id, setID)

const findUserID = (data) => User.findById(data);


module.exports = {
    findUser,
    createUser,
    findAndUpdateUser,
    findUserID,
    findAndUpdate,
};