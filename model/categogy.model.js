const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const categogySchema = new mongoose.Schema({
    title: String,
    parent_id: {
        type: String,
        default:""
    },
    description: String,
    slug: { type: String, slug: "title", unique: true },
    thumbnail: String,
    status: String,
    position: Number,
    deleted: Boolean
})
const Categogy = mongoose.model("Categogy", categogySchema, "categogy")
module.exports = Categogy 