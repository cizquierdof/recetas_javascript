const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: String,
        lastName: String,
        phone: String,
        address: String
    }
)

module.exports = mongoose.model('User', userSchema);
