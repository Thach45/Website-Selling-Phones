//Cấu hình express
const express = require('express');
const app = express();
//Cấu hình POST
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

//Cấu hình req.body
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

//Cấu hình thông báo
var flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(cookieParser('THAHS'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//Cấu hình .env
require('dotenv').config()
const port = process.env.PORT ;

//Cấu hình pug
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//Cấu hình mongoose, kết nối DB
const database = require("./config/database");
database.connect();

//tinyMCE
var path = require('path');
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


//cấu hình roters của home
const routerHome = require(`${__dirname}/routers/client/index.router`);
routerHome (app);
//cấu hình routers của admin
const routerAdmin = require(`${__dirname}/routers/admin/index.router`);
routerAdmin(app);

//Nhúng file tĩnh(css, js)
app.use(express.static(`${__dirname}/public`))

//Tạo biến toàn cục
const local = require("./config/system");
app.locals.prefixAdmin = local.prefixAdmin; 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})