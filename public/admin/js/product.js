document.getElementById("type").addEventListener("change", function() {
    // Ẩn tất cả các nhóm thông số kỹ thuật
    document.getElementById("laptop-specs").style.display = "none";
    document.getElementById("smartphone-specs").style.display = "none";
   
    document.getElementById("accessory-specs").style.display = "none";
    document.getElementById("pc-specs").style.display = "none";

    // Hiện nhóm thông số kỹ thuật tương ứng
    var selectedType = this.value;
    if (selectedType === "laptop") {
        document.getElementById("laptop-specs").style.display = "block";
    } else if (selectedType === "smartphone") {
        document.getElementById("smartphone-specs").style.display = "block";
    } else if (selectedType === "tablet") {
        document.getElementById("smartphone-specs").style.display = "block";
    } else if (selectedType === "accessory") {
        document.getElementById("accessory-specs").style.display = "block";
    } else if (selectedType === "pc") {
        document.getElementById("pc-specs").style.display = "block";
    }
});