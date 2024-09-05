const Product = require("../../model/product.model");
const Category = require("../../model/categogy.model");
const Cart = require("../../model/cart.model");
const Order = require("../../model/order.model");
module.exports.index = async (req, res) => {
    const idUser = req.cookies.cartID;
    const cart = await Cart.findOne({_id: idUser})
    let total = 0;
    for(const item of cart.products){
        const productID = item.productId;
        const product = await Product.findOne({_id: productID});
        item.productInfor = product;
        total += product.price * item.quantity;
    }
    cart.total = total;
    

    res.render("client/pages/checkout/index.pug",{
        pageTitle: "Trang thanh toán",
        cartDetail: cart
    })
}

module.exports.order = async (req, res) => {

    const cartID = req.cookies.cartID;
    const userInfor = req.body;
    const cart = await Cart.findOne({_id: cartID});
    let productCart = [];
    for (const item of cart.products) {
        const productID = item.productId;
        const product = await Product.findOne({_id: productID});
        productCart.push({
            productId: productID,
            price: product.price,
            discount: product.discountPercentage,
            quantity: item.quantity
        })
    }
    console.log(productCart);
    const newOrder = await new Order({
        cart_id: cartID,
        inforUser: userInfor,
        products: productCart
    });
    newOrder.save();
    res.redirect("/");
}