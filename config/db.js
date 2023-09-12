const mongoose = require('mongoose');
const colors = require('colors')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`connected to mongodb database ${mongoose.connection.host}`.bgYellow.white.bold);
    } catch (error) {
        console.log(`MongoDb database error ${error}`.bgRed);

    }
}

module.exports = connectDB