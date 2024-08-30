const Categogy = require("../../model/categogy.model");
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    

    const records = await Categogy.find(find)
    res.render("admin/pages/categogy/index.pug", {
        pageTitle: "Danh mục sản phẩm",
        records: records
    })
}
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }
    function createTree(arr, parentId = "") {
        let tree = [];
        arr.forEach(element => {
            if (element.parent_id === parentId) {
                const newElement = element;
                const children = createTree(arr, element.id);
                if(children.length > 0)
                {

                    newElement.child = children;
                }
                tree.push(newElement);
            }
        });
        return tree;
    }

    const records = await Categogy.find(find);
    const arr = createTree(records);
    console.log(arr);
    res.render("admin/pages/categogy/create.pug", {
        pageTitle: "Tạo mới danh mục sản phẩm",
        records: arr
    })
}

module.exports.createP = async (req, res) => {
    if (!req.body.title) {
        req.flash('error', 'Vui lòng nhập tiêu đề!');
        res.redirect("back")
        return;
    }

    req.body.stock = parseInt(req.body.stock)
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    if (req.body.position == "") {
        const countP = await Categogy.countDocuments();
        req.body.position = countP + 1;
    }
    else {
        req.body.position = parseInt(req.body.position)
    }
    req.body.deleted = false;
    const product = new Categogy(req.body);
    await product.save()
    res.redirect("back")

}
