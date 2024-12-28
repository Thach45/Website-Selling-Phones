const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer()
const storage = require("../../helpers/storageMulti");
const uploadOnline = require("../../middlewares/admin/uploadOnline");


//Cấu hình controller
const product = require("../../controllers/admin/product.controller")

router.get('/', product.index);
router.patch('/change-status/:status/:id', product.changeStatus);
router.patch('/change-multi', product.changeMulti);
router.delete('/delete/:id', product.delete);
router.get('/create', product.create);
router.post('/create', upload.array('thumbnails',5),uploadOnline.upload, product.createP);
router.get('/edit/:id', product.edit);
router.patch('/edit/:id', upload.array('thumbnails',5),uploadOnline.upload, product.editP);



module.exports = router;