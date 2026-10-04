
const { Schema, default: mongoose } = require('mongoose');

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Token = mongoose.model('tokens', tokenSchema);

module.exports = Token