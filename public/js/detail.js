function changeImage(src) {
    document.getElementById('mainImage').src = src;
}

function changeQuantity(change) {
    let quantityInput = document.getElementById('quantity');
    let newQuantity = parseInt(quantityInput.value) + change;
    if (newQuantity >= 1) {
        quantityInput.value = newQuantity;
    }
}

function openTab(evt, tabName) {
    let tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }

    let tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}