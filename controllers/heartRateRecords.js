const HeartRateRecord = require('../models/HeartRateRecord');

function getDate(limitDate) {
    return new Date(new Date().getTime() - (limitDate * 24 * 60 * 60 * 1000)).toLocaleString()
}

module.exports.index = async(req, res) => {
    const heartRateRecord = new HeartRateRecord({
        userId: req.user._id,
        currentState: req.body.currentState,
        heartRate: req.body.heartRate,
        createDate: new Date("2021-03-16T02:34:28.927Z")
    });
    try {
        await heartRateRecord.save();
        res.send({data: heartRateRecord});
    } catch(err) {
        res.status(400).send(err);
    }
}

module.exports.getHeartRate = async(req, res) => {
    const userId = req.user._id;
    const limitDay = req.query.limitDay;
    try {
        const heartRateArr = await HeartRateRecord.find({userId: userId, createDate: { $gt: getDate(limitDay), $lt: Date.now()}})
        res.send({data: heartRateArr});
    } catch(err) {
        res.status(400).send(err);
    }
}