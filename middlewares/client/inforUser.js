const User = require("../../model/user.model");

module.exports.checkInfor = async (req, res, next) => {
    try {
        const token = req.cookies.tokenUser;
        if (token) {
            const user = await User.findOne({ tokenUser: token }).select("-password");
            if (user) {
                res.locals.user = user;
            }
        }
        next();
    } catch (error) {
        console.error("Error fetching user information:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.checkLogin = async (req, res, next) => {
    try {
        const token = req.cookies.tokenUser;
        if (!token) {
            res.redirect("/user/login");
            return;
        }
        next();
    }
    catch (error) {
        console.error("Error checking login:", error);
        res.status(500).send("Internal Server Error");
    }
}