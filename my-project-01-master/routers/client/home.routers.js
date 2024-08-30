//Cấu hình routers cho home
const express = require('express');
const router = express.Router();

//Cấu hình controller
const homeController = require("../../controllers/client/home.controller")

router.get('/', homeController.index);

module.exports = router;