const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    cart_id: String,
    inforUser: {
        name: String,
        phone: String,
        email: String,
        address: String
    },
    products: [{
        productId: String,
        price: Number,
        discount: Number,
        quantity: Number
    }]
    
})
const Order = mongoose.model("Order", orderSchema, "order")
module.exports = Order 