module.exports.index = (req, res) => {
    res.render("admin/pages/dashboard/index.pug", {
        pageTitle: "Trang tổng quan"
    })
}