const Product = require("../../model/product.model");
const Category = require("../../model/categogy.model");
const Cart = require("../../model/cart.model");
const Order = require("../../model/order.model");
module.exports.index = async (req, res) => {
    const idUser = req.cookies.cartID;
    const cart = await Cart.findOne({ _id: idUser })
    let total = 0;
    for (const item of cart.products) {
        const productID = item.productId;
        const product = await Product.findOne({ _id: productID });
        item.productInfor = product;
        total += product.price * ((100 - product.discountPercentage) / 100) * item.quantity;
    }
    cart.total = total;


    res.render("client/pages/checkout/index.pug", {
        pageTitle: "Trang thanh toán",
        cartDetail: cart
    })
}

module.exports.order = async (req, res) => {
    try {

        const cartID = req.cookies.cartID;
        const userInfor = req.body;
        const cart = await Cart.findOne({ _id: cartID });
        let productCart = [];
        for (const item of cart.products) {
            const productID = item.productId;
            const product = await Product.findOne({ _id: productID });
            productCart.push({
                productId: productID,
                price: product.price,
                discount: product.discountPercentage,
                quantity: item.quantity
            })
        }
       
        const newOrder = await new Order({
            cart_id: cartID,
            inforUser: userInfor,
            products: productCart
        });
        newOrder.save();

        res.redirect(`success/${newOrder._id}`);
    }
    catch (error) {
        res.send("Lỗi liên quan đến cookies")

    }
}

module.exports.success = async (req, res) => {
    const orderID = req.params.orderID;
    const order = await Order.findOne({ _id: orderID });
    console.log(order.inforUser);
    // tổng tiền
    let total = 0;
    for(const item of order.products){
        total += (item.price * ((100 - item.discount) / 100)) * item.quantity;
    }
    order.total = total;
    res.render("client/pages/checkout/success.pug", {
        pageTitle: "Đặt hàng thành công",
        order: order
    })
}