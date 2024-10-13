//Cấu hình router của products
const productRouters = require("./product.routers");

//Cấu hình router của home
const homeRouters = require("./home.routers");
// Cấu hình router của search
const searchRouters = require("./search.routers");
// Cấu hình router của cart
const cartRouters = require("./cart.routers");
// Import middleware để xử lý danh mục con
const subMenu = require("../../middlewares/client/category");
// Import middleware để xử lý giỏ hàng
const cart = require("../../middlewares/client/cart");

const checkoutRouters = require("./checkout.routers");

const user = require("./user.routers");
module.exports = (app) => {
    // Sử dụng middleware để kiểm tra và tạo cartID nếu chưa có
    app.use(cart.cartID);
    // Định tuyến cho trang chủ với middleware xử lý danh mục con
    app.use('/',subMenu.category,homeRouters );
    // Định tuyến cho trang sản phẩm với middleware xử lý danh mục con
    app.use('/products', subMenu.category, productRouters);
    // Định tuyến cho trang tìm kiếm với middleware xử lý danh mục con
    app.use('/search', subMenu.category, searchRouters);
    // Định tuyến cho trang giỏ hàng với middleware xử lý danh mục con
    app.use('/cart', subMenu.category, cartRouters);

    app.use("/checkout", subMenu.category,checkoutRouters);
    app.use("/user", subMenu.category,user);


}