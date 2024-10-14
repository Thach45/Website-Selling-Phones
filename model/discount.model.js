const mongoose = require("mongoose");
const moment = require("moment");
const discountSchema = new mongoose.Schema({
    thumbnail: String,
    deleted: Boolean,
    created: { type: Date,  default: () => moment().format('YYYY-MM-DD')  },
})
const Discount = mongoose.model("Discount", discountSchema, "discount")
module.exports = Discount 