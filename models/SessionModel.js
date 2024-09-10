const mongoose = require('mongoose')
const SessionModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true,
    },
    token: { type: String, require: true },
    createdAt: {
        type: Date, default: Date.now, expires: '1h'
    }
})
module.exports = mongoose.model("Session", SessionModel)
// const sessionSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     token: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now, expires: '1h' }  // Token hết hạn sau 1 giờ
// });