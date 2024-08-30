//Cấu hình routers cho home
const express = require('express');
const router = express.Router();

//Cấu hình controller
const dashBoard = require("../../controllers/admin/dashboard.controller")

router.get('/', dashBoard.index);



module.exports = router;