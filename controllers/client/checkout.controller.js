const Product = require("../../model/product.model");
const Category = require("../../model/categogy.model");
const Cart = require("../../model/cart.model");
module.exports.index = async (req, res) => {
    const idUser = req.cookies.cartID;
    const cart = await Cart.findOne({_id: idUser})
    let total = 0;
    for(const item of cart.products){
        const productID = item.productId;
        const product = await Product.findOne({_id: productID});
        console.log(product);
        item.productInfor = product;
        total += product.price * item.quantity;
    }
    cart.total = total;
    

    res.render("client/pages/checkout/index.pug",{
        pageTitle: "Trang thanh toán",
        cartDetail: cart
    })
}