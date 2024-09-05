//Cấu hình routers cho product
const express = require('express');
const router = express.Router();

//Cấu hình controller
const cartController = require("../../controllers/client/cart.controller");

// Định tuyến POST để thêm sản phẩm vào giỏ hàng
router.post('/add/:id', cartController.index);

// Định tuyến GET để hiển thị giỏ hàng của người dùng
router.get('/', cartController.showCart);

// Định tuyến POST để cập nhật số lượng sản phẩm trong giỏ hàng
router.post('/update/:id', cartController.updateQuantity);

// Định tuyến POST để xóa sản phẩm khỏi giỏ hàng
router.get('/remove/:id', cartController.removeProduct);

module.exports = router;