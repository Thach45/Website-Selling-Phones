const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer()
const categogy = require("../../controllers/admin/categogy.controller")
const uploadOnline = require("../../middlewares/admin/uploadOnline");
router.get('/', categogy.index);
router.get('/create',categogy.create);
router.post('/create', upload.single('thumbnail'),uploadOnline.upload, categogy.createP);





module.exports = router;