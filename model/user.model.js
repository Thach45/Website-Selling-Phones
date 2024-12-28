const mongoose = require("mongoose");
const generateToken = require("../helpers/generate")
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    tokenUser: {
        type: String,
        default: generateToken.generateRandomString(20)
    },
    status: {
        type: String,
        default: "active"
    },
    cartID: String,
    
    deleted:{
        type: Boolean,
        default: false
    },
    deletedAt: Date
})
const User = mongoose.model("User", userSchema, "users")
module.exports = User 