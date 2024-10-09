const express = require('express');
const router = express.Router();

// Cấu hình controller
const auth = require("../../controllers/admin/auth.controller");

router.get('/login', auth.index);

router.post('/login', auth.login);

router.get('/logout', auth.logout);
module.exports = router;