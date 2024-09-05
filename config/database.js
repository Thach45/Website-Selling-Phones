const mongoose = require("mongoose")
module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.mongoURL);
        console.log("Connect ok");
    } catch (error) {
        console.log("Connect fail");
    }
}