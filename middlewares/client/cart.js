const Cart = require("../../model/cart.model");
module.exports.cartID = async (req, res, next) => {
    if (!req.cookies.cartID) {
        var cartID = new Cart();
        await cartID.save();
        const time = 1000 * 60 * 60 * 24 * 365;
        res.cookie("cartID", cartID.id, {
            expires: new Date(Date.now() + time),
        });
    }
    else {
        const cartID = req.cookies.cartID;
        const cart = await Cart.findOne({ _id: cartID });
        if(cart)
        {
            cart.total = cart.products.reduce((total, item) => total + item.quantity, 0);
            res.locals.cart = cart;
        }
        
    }
    next();
}

