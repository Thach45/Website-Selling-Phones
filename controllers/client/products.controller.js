const Product = require("../../model/product.model");
const Category = require("../../model/categogy.model");
// module.exports.index = async (req, res) => {
//     const products = await Product.find({
//         status: "active",
//         deleted: false
//     }).sort({ position: "desc" })


//     res.render("client/pages/products/index.pug", {
//         pageTitle: "Danh sách sản phẩm",
//         products: products
//     })
// }

module.exports.store = async (req, res) => {
    
    if(req.query){
        const brands = req.query.brand ? req.query.brand.split(",") : [];
        const range = req.query.price ? req.query.price.split(",") : [];
        let query = {
            type: req.params.type,
            status: "active",
            deleted: false
        };
        if(req.query.battery){
            console.log(req.query.battery)
            const battery = req.query.battery.split(",") ;
            const typeBattery = battery[0];
            const batteryValue = battery[1];
            console.log(typeBattery)
            if(typeBattery == "smartphone"){
                query.battery_smartphone ={$gte: parseInt(batteryValue)} 
                
            }
            else if(typeBattery === "laptop"){
                query.battery_life_laptop = {$gte: parseInt(batteryValue)};
            }
            else if(typeBattery === "tablet"){
                query.battery_tablet = parseInt(batteryValue);
            }
        }
        if(req.query.screen){
            const screen = req.query.screen.split(",") ;
            const typeScreen = screen[0];
            const screenValue = screen[1];
           
            if(typeScreen == "smartphone"){
                if(screenValue.split("-").length > 1){
                    const screenValueArr = screenValue.split("-");
                    query.display_smartphone = { $gte: parseInt(screenValueArr[0]), $lte: parseInt(screenValueArr[1])};
                }
                else{
                    if(screenValue[0] === "<"){
                        query.display_smartphone = {  $lte: parseInt(screenValue[1])};
                    }
                    else{
                        query.display_smartphone = {  $gte: parseInt(screenValue[1])};
                    }
                }
            }
            else if(typeScreen === "laptop"){
                if(screenValue.split("-").length > 1){
                    const screenValueArr = screenValue.split("-");
                    query.display_laptop = { $gte: parseInt(screenValueArr[0]), $lte: parseInt(screenValueArr[1])};
                }
                else{
                    if(screenValue[0] === "<"){
                        query.display_laptop = {  $lte: parseInt(screenValue[1])};
                    }
                    else{
                        query.display_laptop = {  $gte: parseInt(screenValue[1])};
                    }
                }
                
            }
            else if(typeScreen === "tablet"){
                if(screenValue.split("-").length > 1){
                    const screenValueArr = screenValue.split("-");
                    query.display_tablet = { $gte: parseInt(screenValueArr[0]), $lte: parseInt(screenValueArr[1])};
                }
                else{
                    if(screenValue[0] === "<"){
                        query.display_tablet = {  $lte: parseInt(screenValue[1])};
                    }
                    else{
                        query.display_tablet = {  $gte: parseInt(screenValue[1])};
                    }
                }
            }
        }
        let sort = "asc";
        if(req.query.sort){
            sort = req.query.sort;
        }

        // Lọc theo thương hiệu nếu có
        if (brands.length > 0) {
            query.brand = { $in: brands };
        }

        // Lọc theo giá nếu có
        if (range.length === 2) {
            const min = parseInt(range[0]);
            const max = parseInt(range[1]);
            if (!isNaN(min) && !isNaN(max)) {
                query.price = { $gte: min, $lte: max };
            }
        }
        if (req.query.ram) {
            query.ram_laptop = req.query.ram+"GB";
        }
        if (req.query.rom) {
            query.storage_laptop = req.query.rom+"GB";
        }
        if (req.query.ram === "different") {
            delete query.ram_laptop;
        }
        if (req.query.rom === "different") {
            delete query.storage_laptop;
        }
        
        if (req.params.type === "general") {
            delete query.type;
        }
        console.log(query)
        if(req.query.sort){
            const products = await Product.find(query).sort({ price: sort }) 
            res.render("client/pages/products/index.pug", {
                pageTitle: "Danh sách sản phẩm",
                products: products
            })  
        }
        else{
            const products = await Product.find(query).sort({ position: "desc" })
            res.render("client/pages/products/index.pug", {
                pageTitle: "Danh sách sản phẩm",
                products: products
            })
        }
        // console.log(products)
       
        
    }
    else{
        if (req.params.type === "general") {
            delete query.type;
        }
        const products = await Product.find({
            type: req.params.type,
            status: "active",
            deleted: false
        }).sort({ position: "desc" })
        
        res.render("client/pages/products/index.pug", {
            pageTitle: "Danh sách sản phẩm",
            products: products
        })
    }
}

module.exports.detail = async (req, res) => {
    const slug = req.params.slugProduct
    
    const product = await Product.findOne({
        slug: slug,
        deleted: false
    }).sort({ position: "desc" })
    const type = product.type
    const productRelated = await Product.find({
        type: type,
        deleted: false
    }).limit(4)
    console.log(product)
    res.render("client/pages/products/detail.pug", {
        pageTitle: "Chi tiết sản phẩm",
        product: product,
        productRelated: productRelated
    })
}

// module.exports.category = async (req, res) => {
//     const slugCategory = req.params.slugCategory
//     const idCategory = await Category.findOne({
//         slug: slugCategory,
//         status: "active",
//         deleted: false
//     })


//     const subCategory = async (id) => {
//         let arr = [id];
//         const subs = await Category.find({
//             parent_id: id,
//             status: "active",
//             deleted: false
//         });

//         for (const idSub of subs) {
//             arr.push(idSub.id);
//             const child = await subCategory(idSub.id);
//             arr = arr.concat(child);
//         }

//         return arr;
//     };
//     const arr = await subCategory(idCategory.id);
//     console.log(arr)
//     const products = await Product.find({
//         parent_id: { $in: arr},
//         status: "active",
//         deleted: false
//     })

//     res.render("client/pages/products/index.pug", {
//         pageTitle: idCategory.title,
//         products: products
//     })
// }