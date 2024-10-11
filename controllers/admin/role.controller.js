const Role = require("../../model/roles.model");

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await Role.find(find);



    res.render("admin/pages/role/index.pug", {
        pageTitle: "Trang phân quyền",
        records: records,
    })
}

module.exports.create = (req, res) => {
    res.render("admin/pages/role/create.pug", {
        pageTitle: "Tạo phân quyền"
    })
}


module.exports.createP = async (req, res) => {
    if (!req.body.title) {
        req.flash('error', 'Vui lòng nhập tiêu đề!');
        res.redirect("back")
        return;
    }

    req.body.deleted = false;
    const role = new Role(req.body);
    await role.save()
    res.redirect("back")

}

module.exports.edit = async (req, res) => {
    try {
        let find = {
            _id: req.params.id,
            deleted: false
        }
        const role = await Role.findOne(find)
        res.render("admin/pages/role/edit.pug", {
            pageTitle: "Chỉnh sửa phân quyền",
            records: role
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
    const id = req.params.id;
    try {
        await Role.updateOne({ _id: id }, req.body)
        res.redirect("/admin/role")

    } catch (error) {
        res.redirect("back")
    }
}

module.exports.permissions = async (req, res) => {
    try {
        let find = {
            deleted: false
        }
        const records = await Role.find(find)
        for (const record of records) {
            for (const permission of record.permissions) {
                record[permission] = true;
            }
        }
        res.render("admin/pages/role/permissions.pug", {
            pageTitle: "Chỉnh sửa phân quyền",
            records: records
        })

    } catch (error) {
        res.redirect("back")
    }
}

module.exports.permissionsPatch = async (req, res) => {
    if (!req.body) {
        req.flash('error', 'Vui lòng chọn quyền!');
        res.redirect("back")
        return;
    }
    const permissions = JSON.parse(req.body.permissions);
    try {

        if(permissions){

            for (const item of permissions) {
                const namePermissions = item.name.split(',');
                await Role.updateOne({ _id: item.permission }, { $set: { permissions: [] } })
            }
            for (const item of permissions) {
                const namePermissions = item.name.split(',');

                await Role.updateOne({ _id: item.permission }, { $push: { permissions: namePermissions } })
            }

            res.redirect("/admin/role/permissions")
        }

    } catch (error) {
        res.redirect("back")
    }

}