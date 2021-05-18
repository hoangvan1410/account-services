const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var cors = require('cors')

// import router
const userRoute = require('./routes/users');
const heartRateRecordRoute = require('./routes/heartRateRecords');
const hearthInformationRoute = require('./routes/hearthInformations');

dotenv.config();

app.use(cors({credentials: true, origin: true}));

// connect db
mongoose.connect(
    process.env.MONGODB_URL, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    },
    () => console.log(`Connected to databases`) 
)

// middleware
app.use(express.json());
// router middleware
app.use('/api/users', userRoute);
app.use('/api/heartraterecords', heartRateRecordRoute);
app.use('/api/hearthinformations', hearthInformationRoute);

// app listen
app.set('port', process.env.PORT || 5500);
app.listen(app.get('port'), () => {
    console.log(`Server is running at port ${app.get('port')}`);
});