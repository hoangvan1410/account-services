const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    phoneNumber: String,
    createDate: Date,
    updateDate: Date
}); 

module.exports = mongoose.model('User', userSchema);