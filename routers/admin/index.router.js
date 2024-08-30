//file chứa khai báo biến
const systemConfig = require("../../config/system");
//Cấu hình router của dashboard
const dashBoard = require("./dashboard.routers");
//Cấu hình router của product
const product = require("./product.routers");
//Cấu hình router của categogy
const categogy = require("./categogy.routers");

const role = require("./role.routers");

module.exports = (app) => {
    const pathAdmin = systemConfig.prefixAdmin;
    app.use(pathAdmin + '/dashboard', dashBoard);
    app.use(pathAdmin + '/products', product);
    app.use(pathAdmin + '/products-categogy', categogy);
    app.use(pathAdmin + '/role', role);


}