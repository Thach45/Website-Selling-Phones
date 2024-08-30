const Product = require("../../model/product.model");
const Category = require("../../model/categogy.model");
module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;
    const keywordRegex = new RegExp(keyword, "i");
    const products = await Product.find({ 
        title: keywordRegex,
        status: "active",
        deleted: false
    });
    console.log(products);
    
    res.render("client/pages/search/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: products
    })
}