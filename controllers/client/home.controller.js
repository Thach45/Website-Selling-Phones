
const Product = require("../../model/product.model");
const Discount = require("../../model/discount.model");
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false,
        featured: "1"
    }).sort({position:"desc"})
    const discount = await Discount.find({deleted: false});
    
    res.render("client/pages/home/index.pug",{
        pageTitle: "Trang chủ",
        products: products,
        discounts: discount
    })
}