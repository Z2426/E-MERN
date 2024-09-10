const mongose = require('mongoose')
const PostSChema = new mongose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: mongose.Schema.ObjectId,
        ref: 'User',
        require: true
    },// tham chieu den userSchema
    role: {
        type: String,
        enum: ['admin', 'editor', 'user'],
        default: 'user'
    } // only one , everyone

})

module.exports = mongose.model("Post", PostSChema)