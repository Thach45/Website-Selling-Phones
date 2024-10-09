const Account = require("../../model/account.model");
const Role = require("../../model/roles.model");

module.exports.checkAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        res.redirect("/admin/auth/login");
        
    }
    else{
        const user = await Account.findOne({ token: token });
        if(!user){
            res.redirect("/admin/auth/login");
        }
        else{
            const role = await Role.findOne({ _id: user.role });
            next();
        }

    }
}