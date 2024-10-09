const Account = require("../../model/account.model");
const Role = require("../../model/roles.model");
const md5 = require("md5");

module.exports.index = async (req, res) => {

    const accounts = await Account.find().select("-password -token")
   for(const account of accounts){
         const role = await Role.findOne({
              _id: account.role_id,
              deleted: false
         });
         account.role = role;
   }
    res.render("admin/pages/account/index.pug", {
        pageTitle: "Trang quản lý tài khoản",
        accounts: accounts
    })
}


module.exports.create = async (req, res) => {
    const roles = await Role.find({deleted: false});
    res.render("admin/pages/account/create.pug", {
        pageTitle: "Trang tạo tài khoản",
        roles: roles
    })
}

module.exports.createP = async (req, res) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    });
    if(emailExist){
        res.flash("error", "Email đã tồn tại");
        res.redirect("back");
    }
    else{

        req.body.password = md5(req.body.password);
        const account = new Account(req.body);
        account.save();
        res.redirect("/admin/account");
    }
}