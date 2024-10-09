const Account = require("../../model/account.model");
const md5 = require("md5");
module.exports.index =  (req, res) => {
    if(req.cookies.token){
        res.redirect("/admin/dashboard");
        return;
    }
    else{
        res.render("admin/pages/auth/index.pug", {
            pageTitle: "Đăng nhập",
        })

    }
}
module.exports.login = async (req, res) => {
   const email = req.body.username;
    const password = req.body.password;
    console.log(email);
    const user = await Account.findOne({ email: email , password: md5(password) });
    console.log(user);
    if(!user){
        req.flash("error", "Tài khoản hoặc mật khẩu không đúng");
        res.redirect("back");
        return;
    }
    res.cookie("token", user.token)
    res.redirect("/admin/dashboard");
}    

module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/admin/auth/login");
}