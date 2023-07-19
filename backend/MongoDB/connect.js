const { default: mongoose } = require("mongoose")
const MongoDB_HREF = process.env.MONGODB_HREF

const connectDB = async () => {
    const connect = await mongoose.connect(MongoDB_HREF)
    console.log(` mongoDB connect to => ${connect.connection.host}`);
}

module.exports = { connectDB }