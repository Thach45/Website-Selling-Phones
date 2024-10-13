const User = require("../../model/user.model");
const md5 = require("md5");
module.exports.register = async (req, res) => {
    
    res.render("client/pages/user/register.pug", {
        pageTitle: "Đăng ký tài khoản"
    })
}

module.exports.registerPost = async (req, res) => {
    req.body.password = md5(req.body.password);
    const exitEmail = await User.findOne({email: req.body.email});
    if(exitEmail){
        res.render("client/pages/user/register.pug", {
            pageTitle: "Đăng ký tài khoản",
            error: "Email đã tồn tại"
        })
        return;
    }
    console.log(req.body)
    const user = new User(req.body);
    await user.save();
    res.cookie("tokenUser",user.tokenUser)
    res.redirect("/");
}   

