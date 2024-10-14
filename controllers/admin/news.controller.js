const Blog = require("../../model/blog.model");
const Discount = require("../../model/discount.model");
const moment = require("moment-timezone");
module.exports.discount = async (req, res) => {
    try {
        const discounts = await Discount.find({ deleted: false });
        // Định dạng ngày tháng theo múi giờ Việt Nam
        const formattedDiscounts = discounts.map(discount => ({
            ...discount.toObject(),
            created: moment(discount.created).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')
        }));
        res.render("admin/pages/news/discount.pug", {
            pageTitle: "Discount",
            discounts: formattedDiscounts
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


module.exports.discountCreate= async (req, res) => {

    res.render("admin/pages/news/create.pug", {
        pageTitle: "Tạo poster"

    })
}

module.exports.discountP = async (req, res) => {
    try{
        const {thumbnail} = req.body;
        req.body.deleted = false;
        if (!thumbnail) {
            res.render("client/error/index.pug/")
            return;
        }
        const discount = new Discount(req.body);
        await discount.save();
        res.redirect("/admin/news/discount");
    }
    catch(err){
        res.render("client/error/index.pug/")
    }
}

module.exports.discountDelete = async (req, res) => {
    const itemDelete = req.params.id
    try {
        await Discount.deleteOne({ _id: itemDelete });
        res.redirect("/admin/news/discount");
    } catch (err) {
        res.render("client/error/index.pug/")
    }
}