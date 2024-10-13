const User = require("../../model/user.model");
module.exports.checkInfor = async (req, res, next) => {
    const token = req.cookies.tokenUser;
    if(token){
        const user = await User.findOne({ tokenUser: token }).select("-password");
        if(user){
            res.locals.user = user;
        }
        
    }
    next();
}