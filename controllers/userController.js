const User = require('../models/userModel');
const bcrypt = require('bcrypt');
//Cap nhat 
exports.updateUser = async (req, res) => {
    const userId = req.params.id
    const contentUpdate = req.body
    console.log(contentUpdate)
    try {
        const result = await User.findByIdAndUpdate(userId, contentUpdate, { new: true })
        console.log(result)
        if (result) {
            return res.status(201).json("Success")
        }
        res.status(400).json("CAN NOT UPDATE")

    } catch (e) {
        res.status(404).json("CAN NOT UPDATE")
    }
}
// xoa user
exports.deleteUsers = async (req, res) => {
    const userId = req.params.id
    try {
        const result = User.findByIdAndDelete(userId)
        if (result) {
            return res.status(201).json("Success")
        }
        res.status(404).json("NOT FIND USER")


    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}
// Lấy tất cả người dùng
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Tạo người dùng mới
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password)
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        const newUser = new User({ name, email, password: hashedPassword });
        console.log(newUser)
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
