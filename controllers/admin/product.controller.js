const Product = require("../../model/product.model");
const filtersHelper = require("../../helpers/filters")
const Categogy = require("../../model/categogy.model")

//Hiện nút active, fillters, tìm kiếm, phân trang
module.exports.index = async (req, res) => {

    //Hiện nút tô đậm và filters
    const filters = filtersHelper(req.query)
    //------------------------------------------------------------------------

    let find = {
        deleted: false
    }


    //Chức năng lọc
    if (req.query.status) {
        find.status = req.query.status;
    }
    //------------------------------------------------------------------------


    //chức năng tìm kiếm
    const keyWord = req.query.keyword;
    if (req.query.keyword) {
        const re = new RegExp(keyWord, "i") //tìm kiếm không phân biệt hoa hay thường
        find.title = re;

    }
    //------------------------------------------------------------------------

    //Chức năng phân trang
    let pagination = {
        current: 1,
        limitPage: 2
    }
    if (req.query.page) {
        pagination.current = parseInt(req.query.page);
    }
    pagination.skip = (pagination.current - 1) * pagination.limitPage;

    //------------------------------------------------------------------------

    //Đếm tổng số trang
    let count = await Product.countDocuments(find);
    const total = Math.ceil(count / pagination.limitPage);
    pagination.page = total;
    //------------------------------------------------------------------------
    let sortName = req.query.sortName
    let desc_or_asc = req.query.desc_or_asc
    let sortDirection = "desc"
    if(!sortName)
    {
        sortName = "position"
    }
    else{

        
        if(desc_or_asc == "asc")
        {
            sortDirection = "asc"
        }
       
    }
    const products = await Product.find(find).sort({ [sortName]: sortDirection }).limit(pagination.limitPage).skip(pagination.skip)
    res.render("admin/pages/product/index.pug", {
        pageTitle: "Trang tổng quan",
        products: products,
        keyWord: keyWord,
        filters: filters,
        pagination: pagination
    })
}

//Thay đổi trạng thái hoạt động
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { status: status })
    req.flash('success', 'Cập nhật thành công!');
    res.redirect("back")
}

//Thay đổi trang thái hoạt động tất cả, xoá tất cả, thay đổi vị trí
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
            req.flash('success', 'Cập nhật thành công!');
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            req.flash('success', 'Cập nhật thành công!');
            break;
        case "delete":
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true })
            req.flash('success', 'Cập nhật thành công!');
            break;
        case "position":
            for (const item of ids) {
                let [id, pos] = item.split("-");
                pos = parseInt(pos);
                await Product.updateOne({ _id: { $in: id } }, { position: pos })
                req.flash('success', 'Cập nhật thành công!');
            }
            break;
        default:
            break;
    }
    res.redirect("back")
}

//Xoá cứng, xoá mềm
module.exports.delete = async (req, res) => {
    const id = req.params.id;

    // Xoa cung
    // await Product.deleteOne({ _id: id})

    //Xoa mem
    await Product.updateOne({ _id: id }, { deleted: true })
    req.flash('success', 'Cập nhật thành công!');
    res.redirect("back")
}

module.exports.create = async (req, res) => {
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
    const record = await Categogy.find({ deleted: false })
    const arr = createTree(record);
   
    res.render("admin/pages/product/create.pug", {
        pageTitle: "Thêm mới sản phẩm",
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
        const countP = await Product.countDocuments();
        req.body.position = countP + 1;
    }
    else {
        req.body.position = parseInt(req.body.position)
    }
    req.body.deleted = false;
    const product = new Product(req.body);
    await product.save()
    res.redirect("/admin/products")

}

module.exports.edit = async (req, res) => {
    try {
        let find = {
            _id: req.params.id,
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
        const record = await Categogy.find({ deleted: false })
        const arr = createTree(record);
        const product = await Product.findOne(find)
  
        res.render("admin/pages/product/edit.pug", {
            pageTitle: "Trang chỉnh sửa sản phẩm",
            product: product,
            records: arr
        })

    } catch (error) {
        res.redirect("back")
    }
}

module.exports.editP = async (req, res) => {
    if (!req.body.title) {
        req.flash('error', 'Vui lòng nhập tiêu đề!');
        res.redirect("back")
        return;
    }
    console.log(req.body)
    req.body.stock = parseInt(req.body.stock)
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.position = parseInt(req.body.position)
    const id = req.params.id;
    try {
        await Product.updateOne({_id: id}, req.body)
        res.redirect("/admin/products")

    } catch (error) {
      res.redirect("back")  
    }
}
