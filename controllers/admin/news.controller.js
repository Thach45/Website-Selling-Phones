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
            res.render("error/index.pug")
            return;
        }
        const discount = new Discount(req.body);
        await discount.save();
        res.redirect("/admin/news/discount");
    }
    catch(err){
        res.render("error/index.pug")
    }
}

module.exports.discountDelete = async (req, res) => {
    const itemDelete = req.params.id
    try {
        await Discount.deleteOne({ _id: itemDelete });
        res.redirect("/admin/news/discount");
    } catch (err) {
        res.render("error/index.pug")
    }
}

module.exports.blog = async (req, res) => {
    try {
        const blogs = await Blog.find({ deleted: false });
        // Định dạng ngày tháng theo múi giờ Việt Nam
        const formattedBlogs = blogs.map(blog => ({
            ...blog.toObject(),
            created: moment(blog.created).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')
        }));
        res.render("admin/pages/blog/index.pug", {
            pageTitle: "Blog",
            blogs: formattedBlogs
        });
    } catch (err) {
        res.render("error/index.pug")
    }
}

module.exports.blogCreate = async (req, res) => {

    res.render("admin/pages/blog/create.pug", {
        pageTitle: "Tạo blog"

    })
}

module.exports.blogP = async (req, res) => {
    try{
        const {thumbnail} = req.body;
        req.body.deleted = false;
        if (!thumbnail) {
            res.render("error/index.pug")
            return;
        }
        const blog = new Blog(req.body);
        await blog.save();
        res.redirect("/admin/news/blog");
    }
    catch(err){
        res.render("error/index.pug")
    }
}

module.exports.blogDelete = async (req, res) => {
    const itemDelete = req.params.id
    try {
        await Blog.deleteOne({ _id: itemDelete });
        res.redirect("/admin/news/blog");
    } catch (err) {
        res.render("error/index.pug")
    }
}