const mongoose = require("mongoose");
const generateToken = require("../helpers/generate")
const accountSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    token: {
        type: String,
        default: generateToken.generateRandomString(20)
    },
    role_id: String,
    avatar: String,
    status: String,
    deleted:{
        type: Boolean,
        default: false
    },
    deletedAt: Date
})
const Account = mongoose.model("Account", accountSchema, "accounts")
module.exports = Account 