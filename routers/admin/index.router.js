//file chứa khai báo biến
const systemConfig = require("../../config/system");
//Cấu hình router của dashboard
const dashBoard = require("./dashboard.routers");
//Cấu hình router của product
const product = require("./product.routers");
//Cấu hình router của categogy
const categogy = require("./categogy.routers");
const auth = require("./auth.routers");
const role = require("./role.routers");
const checkUser = require("../../middlewares/admin/auth.middleware");
const account = require("./account.routers");
module.exports = (app) => {
    const pathAdmin = systemConfig.prefixAdmin;
    app.use(pathAdmin + '/dashboard', checkUser.checkAuth ,dashBoard);
    app.use(pathAdmin + '/products', checkUser.checkAuth ,product);
    app.use(pathAdmin + '/products-categogy',checkUser.checkAuth , categogy);
    app.use(pathAdmin + '/role', checkUser.checkAuth ,role);
    app.use(pathAdmin + '/account',checkUser.checkAuth , account);
    app.use(pathAdmin + '/auth', auth);




}