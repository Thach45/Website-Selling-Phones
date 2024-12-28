const Cart = require("../../model/cart.model");
const User = require("../../model/user.model");

module.exports.cartID = async (req, res, next) => {
    try {
        if (req.cookies.tokenUser) {
            const user = await User.findOne({ tokenUser: req.cookies.tokenUser });
            if (!user.cartID) {
                var cartID = new Cart({ userID: user._id });
                await cartID.save();
                const time = 1000 * 60 * 60 * 24 * 365;
                res.cookie("cartID", cartID.id, {
                    expires: new Date(Date.now() + time),
                });
                user.cartID = cartID.id;
                await user.save(); // Lưu user sau khi cập nhật cartID
                
            } else {
                const cartID = user.cartID;
                const cart = await Cart.findOne({ _id: cartID });
                if (cart) {
                    cart.total = cart.products.reduce((total, item) => total + item.quantity, 0);
                    res.locals.cart = cart;
                }
            }
        }
        next();
    } catch (error) {
        console.error("Error processing cartID:", error);
        res.status(500).send("Internal Server Error");
    }
};