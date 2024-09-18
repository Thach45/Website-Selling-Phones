const Account = require("../../model/account.model");
const Role = require("../../model/roles.model");
const md5 = require("md5");

module.exports.index = async (req, res) => {

    const accounts = await Account.find();

    res.render("admin/pages/account/index.pug", {
        pageTitle: "Trang quản lý tài khoản"
    })
}


module.exports.create = async (req, res) => {
    const roles = await Role.find({deleted: false});
    console.log(roles);
    res.render("admin/pages/account/create.pug", {
        pageTitle: "Trang tạo tài khoản",
        roles: roles
    })
}

module.exports.createP = async (req, res) => {
    req.body.password = md5(req.body.password);
    const account = new Account(req.body);
    account.save();
    res.redirect("/admin/account");
}