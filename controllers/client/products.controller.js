const Product = require("../../model/product.model");
const Category = require("../../model/categogy.model");
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" })


    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: products
    })
}

module.exports.detail = async (req, res) => {
    const slug = req.params.slugProduct
    const product = await Product.findOne({
        slug: slug,
        deleted: false
    }).sort({ position: "desc" })

    const productDetail = {
        id: "iphone-15-pro-max-256gb",
        title: "iPhone 15 Pro Max 256GB",
        brand: "Apple",
        price: 1299,
        discountPercentage: 10,
        reviews: 256,
        reviewScore: 4.5,
        thumbnail: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSqTpVh_Wl0h4Sx7CPZfOtpBZmVXpJhvQsfobFKGPO_WDiMzoIXPs8y4jofBKl90h_lLI4T2zzBfAoYmxs99KE2bj4w54MfJaC_xycNQu8D64m2biF1VXb2pLSmMNCa4Hzs5mmzliMdPQ&usqp=CAc",
        images: [
            "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSqTpVh_Wl0h4Sx7CPZfOtpBZmVXpJhvQsfobFKGPO_WDiMzoIXPs8y4jofBKl90h_lLI4T2zzBfAoYmxs99KE2bj4w54MfJaC_xycNQu8D64m2biF1VXb2pLSmMNCa4Hzs5mmzliMdPQ&usqp=CAc",
            "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSqTpVh_Wl0h4Sx7CPZfOtpBZmVXpJhvQsfobFKGPO_WDiMzoIXPs8y4jofBKl90h_lLI4T2zzBfAoYmxs99KE2bj4w54MfJaC_xycNQu8D64m2biF1VXb2pLSmMNCa4Hzs5mmzliMdPQ&usqp=CAc", 
            "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSqTpVh_Wl0h4Sx7CPZfOtpBZmVXpJhvQsfobFKGPO_WDiMzoIXPs8y4jofBKl90h_lLI4T2zzBfAoYmxs99KE2bj4w54MfJaC_xycNQu8D64m2biF1VXb2pLSmMNCa4Hzs5mmzliMdPQ&usqp=CAc",
            "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSqTpVh_Wl0h4Sx7CPZfOtpBZmVXpJhvQsfobFKGPO_WDiMzoIXPs8y4jofBKl90h_lLI4T2zzBfAoYmxs99KE2bj4w54MfJaC_xycNQu8D64m2biF1VXb2pLSmMNCa4Hzs5mmzliMdPQ&usqp=CAc"
        ],
        variants: [
            {
                id: "blue-256gb",
                name: "Xanh Titan 256GB",
                price: 1299
            },
            {
                id: "blue-512gb", 
                name: "Xanh Titan 512GB",
                price: 1499
            },
            {
                id: "blue-1tb",
                name: "Xanh Titan 1TB",
                price: 1799
            }
        ],
        specs: {
            screen: {
                size: 6.7,
                type: "OLED Super Retina XDR",
                resolution: "2796 x 1290 pixel"
            },
            chip: {
                name: "A17 Pro",
                cores: 6,
                performance: "Nhanh và mạnh nhất"
            },
            camera: {
                main: "48MP",
                ultrawide: "12MP",
                telephoto: "12MP",
                frontal: "12MP"
            },
            battery: {
                capacity: 4422,
                type: "Li-Ion",
                charging: "20W có dây, MagSafe không dây"
            },
            ram: 8,
            storage: 256,
            os: "iOS 17",
            weight: 221
        },
        description: `iPhone 15 Pro Max là chiếc smartphone cao cấp nhất của Apple, 
        sở hữu thiết kế titanium sang trọng, hiệu năng mạnh mẽ với chip A17 Pro, 
        hệ thống camera chuyên nghiệp với nhiều tính năng đột phá.`,
        descriptionImages: [
            "/images/iphone-15-pro-max-camera.jpg",
            "/images/iphone-15-pro-max-design.jpg"
        ],
        highlights: [
            "Chip A17 Pro mạnh mẽ",
            "Thiết kế titanium cao cấp", 
            "Camera 48MP chuyên nghiệp",
            "Pin 4422mAh"
        ]
    }
    res.render("client/pages/products/detail.pug", {
        pageTitle: "Chi tiết sản phẩm",
        product: productDetail
    })
}

module.exports.category = async (req, res) => {
    const slugCategory = req.params.slugCategory
    const idCategory = await Category.findOne({
        slug: slugCategory,
        status: "active",
        deleted: false
    })


    const subCategory = async (id) => {
        let arr = [id];
        const subs = await Category.find({
            parent_id: id,
            status: "active",
            deleted: false
        });

        for (const idSub of subs) {
            arr.push(idSub.id);
            const child = await subCategory(idSub.id);
            arr = arr.concat(child);
        }

        return arr;
    };
    const arr = await subCategory(idCategory.id);
    console.log(arr)
    const products = await Product.find({
        parent_id: { $in: arr},
        status: "active",
        deleted: false
    })

    res.render("client/pages/products/index.pug", {
        pageTitle: idCategory.title,
        products: products
    })
}