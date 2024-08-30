//Cấu hình routers cho product
const express = require('express');
const router = express.Router();

//Cấu hình controller
const searchController = require("../../controllers/client/search.controller")
router.get('/',searchController.index);


module.exports = router;