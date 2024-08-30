
const Product = require("../../model/product.model");

module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false,
        featured: "1"
    }).sort({position:"desc"})

    res.render("client/pages/home/index.pug",{
        pageTitle: "Trang chủ",
        products: products
    })
}