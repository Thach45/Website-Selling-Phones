// Cấu hình routers cho home
const express = require('express');
const router = express.Router();

// Cấu hình controller
const role = require("../../controllers/admin/role.controller");

// Định nghĩa các route và gán chúng với các phương thức trong controller

// Route GET cho trang danh sách  
router.get('/', role.index);

// Route GET cho trang tạo mới 
router.get('/create', role.create);

// Route POST để xử lý việc tạo mới 
router.post('/create', role.createP);

// Route GET cho trang chỉnh sửa với tham số id
router.get('/edit/:id', role.edit);

// Route POST để xử lý việc chỉnh sửa với tham số id
router.post('/edit/:id', role.editP);

router.get('/permissions', role.permissions);

router.patch('/permissions', role.permissionsPatch);



// Xuất router để sử dụng trong ứng dụng
module.exports = router;