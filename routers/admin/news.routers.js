const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer()
const newsController = require("../../controllers/admin/news.controller")
const uploadOnline = require("../../middlewares/admin/uploadOnline");



router.get('/discount', newsController.discount);
router.get('/discount/create', newsController.discountCreate);
router.post('/discount/create', upload.single('thumbnail'),uploadOnline.upload, newsController.discountP);
router.post("/discount/delete/:id", newsController.discountDelete);


router.get('/blog',newsController.blog);
router.get('/blog/create', newsController.blogCreate);
router.post('/blog/create', upload.single('thumbnail'),uploadOnline.upload, newsController.blogP);
router.post("/blog/delete/:id", newsController.blogDelete);



module.exports = router;