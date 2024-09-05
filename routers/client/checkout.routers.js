//Cấu hình routers cho home
const express = require('express');
const router = express.Router();

//Cấu hình controller
const checkoutController = require("../../controllers/client/checkout.controller")

router.get('/', checkoutController.index);
router.post('/order', checkoutController.order);
module.exports = router;