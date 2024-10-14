const mongoose = require("mongoose");
const moment = require("moment-timezone");
const blogSchema = new mongoose.Schema({
    link: String,
    description: String,
    thumbnail: String,
    deleted: Boolean,
    created: { type: Date,  default: () => moment().format('YYYY-MM-DD HH:mm:ss')  }
})
const Blog = mongoose.model("Blog", blogSchema, "blog")
module.exports = Blog 