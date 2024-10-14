const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    slug: { type: String, slug: "title", unique: true },
    thumbnail: String,
    status: String,
    deleted: Boolean
})
const Blog = mongoose.model("Blog", blogSchema, "blog")
module.exports = Blog 