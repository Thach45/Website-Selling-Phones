const Product = require("../../model/product.model");
const Category = require("../../model/categogy.model");
const Cart = require("../../model/cart.model");

module.exports.index = async (req, res) => {
    // Lấy id sản phẩm từ tham số của yêu cầu
    const idProduct = req.params.id;

    // Lấy id người dùng từ cookie
    const idUser = req.cookies.cartID;

    // Chuyển đổi số lượng từ chuỗi sang số nguyên
    const quantity = parseInt(req.body.quantity);
    
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng của người dùng hay chưa
    const existProduct = await Cart.findOne({ _id: idUser, "products.productId": idProduct });
    if (existProduct) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng sản phẩm trong giỏ hàng
        const cart = await Cart.updateOne({ _id: idUser, "products.productId": idProduct }, {
            $inc: {
                "products.$.quantity": quantity
            }
        });
        // Chuyển hướng người dùng trở lại trang trước đó
        res.redirect("back");
        return;
    } else {
        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
        const a = await Cart.updateOne({ _id: idUser }, {
            $push: {
                products: {
                    productId: idProduct,
                    quantity: quantity
                }
            }
        });

        console.log(a);
    }
    // Chuyển hướng người dùng trở lại trang trước đó
    res.redirect("back");
}

module.exports.showCart = async (req, res) => {

    const idUser = req.cookies.cartID;
    const cart = await Cart.findOne({ _id: idUser })
    for (const item of cart.products) {
        const productID = item.productId;
        const product = await Product.findOne({ _id: productID });
        console.log(product);
        item.productInfor = product;
    }
    res.render("client/pages/cart/index.pug", {
        pageTitle: "Trang giỏ hàng",
        cartDetail: cart
    })
}


module.exports.removeProduct = async (req, res) => {
    const idProduct = req.params.id;
    const idUser = req.cookies.cartID;

    // Xóa sản phẩm khỏi giỏ hàng của người dùng
    await Cart.updateOne(
        { _id: idUser },
        { $pull: { products: { productId: idProduct } } }
    );
    res.redirect("back");
}

module.exports.updateQuantity = async (req, res) => {

    const idProduct = req.params.id;
    const idUser = req.cookies.cartID;
    const quantity = parseInt(req.body.quantity);

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    await Cart.updateOne(
        { _id: idUser, "products.productId": idProduct },
        { $set: { "products.$.quantity": quantity } }
    );
    res.redirect("back");
}