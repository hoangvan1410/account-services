const mongoose = require('mongoose');

const heartRateRecordSchema = new mongoose.Schema({
    userId: String,
    currentState: String,
    heartRate: Number,
    createDate: Date
}); 

module.exports = mongoose.model('HeartRateRecord', heartRateRecordSchema);