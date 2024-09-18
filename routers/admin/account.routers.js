const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer()
const account = require("../../controllers/admin/account.controller")
const uploadOnline = require("../../middlewares/admin/uploadOnline");
router.get('/', account.index);
router.get('/create',account.create);
router.post('/create', upload.single('avatar'),uploadOnline.upload, account.createP);



module.exports = router;