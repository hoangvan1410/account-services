const mongoose = require('mongoose');

const hearthInformationSchema = new mongoose.Schema({
    age: Number,
    gender: String,
    height: Number,
    weight: Number,
    updateDate: Date
}); 

module.exports = mongoose.model('HearthInformation', HeartInformationSchema);