const mongoose = require("mongoose");
var slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    type: { type: String, enum: ["laptop", "smartphone", "tablet", "accessory", "pc"], default: "smartphone" },  // Loại sản phẩm: simple, variable
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    parent_id: String,  // Có thể là ID của danh mục cha
    slug: { type: String, slug: "title", unique: true },
    thumbnails: [],// Đường dẫn hình ảnh thumbnail
    images: [String],  // Danh sách đường dẫn hình ảnh
    status: { type: String, default: "active" },  // Trạng thái sản phẩm: active, inactive
    featured: { type: Boolean, default: false },  // Sản phẩm nổi bật
    position: { type: Number, default: 0 },  // Vị trí sắp xếp sản phẩm
    deleted: { type: Boolean, default: false },  // Đánh dấu sản phẩm đã xóa
    processor_laptop: String,
    ram_laptop: String,
    storage_laptop: String,
    battery_life_laptop: Number,
    graphic_card_laptop: String,
    display_laptop: Number,
    color_laptop: String,
    weight_laptop: String,
    processor_smartphone: String,
    display_smartphone: Number,
    camera_front_smartphone: String,
    camera_back_smartphone: String,
    battery_smartphone: Number,
    color_smartphone: String,
    weight_smartphone: String,
    processor_tablet: String,
    display_tablet: Number,
    camera_front_tablet: String,
    camera_back_tablet: String,
    battery_tablet: Number,
    color_tablet: String,
    weight_tablet: String,
    color_accessory: String,
    processor_pc: String,
    ram_pc: String,
    storage_pc: String,
    graphic_card_pc: String,
    mainboard_pc: String,
    power_supply_pc: String,
    mainboard: String,
    power_supply: String,
    reviews: [{
        user_id: String,
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        date: { type: Date, default: Date.now }
    }],
    ratings: {
        average: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Cập nhật updatedAt mỗi khi tài liệu được cập nhật
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
