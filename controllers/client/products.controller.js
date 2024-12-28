const Product = require("../../model/product.model");
const Category = require("../../model/categogy.model");
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" })


    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: products
    })
}

module.exports.detail = async (req, res) => {
    const slug = req.params.slugProduct
    
    const product = await Product.findOne({
        slug: slug,
        deleted: false
    }).sort({ position: "desc" })
    const type = product.type
    const productRelated = await Product.find({
        type: type,
        deleted: false
    }).limit(4)
    console.log(product)
    res.render("client/pages/products/detail.pug", {
        pageTitle: "Chi tiết sản phẩm",
        product: product,
        productRelated: productRelated
    })
}

module.exports.category = async (req, res) => {
    const slugCategory = req.params.slugCategory
    const idCategory = await Category.findOne({
        slug: slugCategory,
        status: "active",
        deleted: false
    })


    const subCategory = async (id) => {
        let arr = [id];
        const subs = await Category.find({
            parent_id: id,
            status: "active",
            deleted: false
        });

        for (const idSub of subs) {
            arr.push(idSub.id);
            const child = await subCategory(idSub.id);
            arr = arr.concat(child);
        }

        return arr;
    };
    const arr = await subCategory(idCategory.id);
    console.log(arr)
    const products = await Product.find({
        parent_id: { $in: arr},
        status: "active",
        deleted: false
    })

    res.render("client/pages/products/index.pug", {
        pageTitle: idCategory.title,
        products: products
    })
}