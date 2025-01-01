const buttonBrand = document.querySelector('.button-brand');
const buttonPrice = document.querySelector('.button-price');
const buttonBattery = document.querySelector('.button-battery');
const buttonScreen = document.querySelector('.button-screen');
const buttonRam = document.querySelector('.button-ram');
const buttonRom = document.querySelector('.button-rom');
const now = new URL(window.location.href);

if (now.pathname === '/products/general') {
    const screen = document.querySelector('.screen');
    const battery = document.querySelector('.battery');
    screen.style.display = 'none';
    battery.style.display = 'none';
}
if (now.pathname === '/products/laptop') {
    const ram = document.querySelector('.ram');
    const battery = document.querySelector('.battery');
    const rom = document.querySelector('.rom');
    const screen = document.querySelector('.screen');
    ram.classList.toggle('hidden');
    battery.classList.toggle('hidden');
    rom.classList.toggle('hidden');
    screen.classList.toggle('hidden');
    
}
if (now.pathname === '/products/pc') {
   
    const screen = document.querySelector('.screen');
    const battery = document.querySelector('.battery');
    screen.classList.toggle('hidden');
    battery.classList.toggle('hidden');
}
if(now.pathname === '/products/accessory'){
    const screen = document.querySelector('.screen');
    const battery = document.querySelector('.battery');
    
    screen.classList.toggle('hidden');
    battery.classList.toggle('hidden');
   
}



if(buttonRom){
    buttonRom.addEventListener('click', () => {
        const rom = document.querySelector('.model-rom');
        rom.classList.toggle('show');
        buttonRom.classList.toggle('rotate');
    });
}

if(buttonRam){
    buttonRam.addEventListener('click', () => {
        const ram = document.querySelector('.model-ram');
        ram.classList.toggle('show');
        buttonRam.classList.toggle('rotate');
    });
}
if (buttonBrand) {
    buttonBrand.addEventListener('click', () => {
        const brand = document.querySelector('.model-brand');

        brand.classList.toggle('show');
        buttonBrand.classList.toggle('rotate');
    });
}
if (buttonPrice) {
    buttonPrice.addEventListener('click', () => {
        const price = document.querySelector('.model-price');
        price.classList.toggle('show');
        buttonPrice.classList.toggle('rotate');
    });


}

if (buttonBattery) {
    buttonBattery.addEventListener('click', () => {
        const battery = document.querySelector('.model-battery');
        battery.classList.toggle('show');
        buttonBattery.classList.toggle('rotate');
    });
}

if (buttonScreen) {
    buttonScreen.addEventListener('click', () => {
        const screen = document.querySelector('.model-screen');
        screen.classList.toggle('show');
        buttonScreen.classList.toggle('rotate');
    });
}

const checkboxesModel = document.querySelectorAll('.model-brand input[type="checkbox"]');
const checkboxesPrice = document.querySelectorAll('.model-price input[type="text"]');
const checkboxesBattery = document.querySelectorAll('.model-battery input[type="radio"]');
const checkboxesScreen = document.querySelectorAll('.model-screen input[type="radio"]');
const checkboxesRam = document.querySelectorAll('.model-ram input[type="radio"]');
const checkboxesRom = document.querySelectorAll('.model-rom input[type="radio"]');
let url = new URL(window.location.href);
const type = url.pathname.split('/')[2];
checkboxesModel.forEach(checkbox => {
    let brand = "";
    checkbox.addEventListener('change', () => {
        const selectedBrands = Array.from(checkboxesModel)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id);
        brand = selectedBrands.join(',');

        url.searchParams.set('brand', brand);
        history.pushState(null, '', url.toString());
        fetch(url.toString())
            .then(res => res.text())
            .then(data => {
                const parser = new DOMParser();
                const html = parser.parseFromString(data, 'text/html');
                console.log(html);
                const newProducts = html.querySelector('.all-products');
                console.log(newProducts);
                const currentProducts = document.querySelector('.all-products');
                currentProducts.innerHTML = newProducts.innerHTML;
            });


    });
});


checkboxesPrice.forEach(checkbox => {
    let price = "";
    checkbox.addEventListener('change', () => {
        const selectedPrices = Array.from(checkboxesPrice)
            .filter(checkbox => checkbox.value)
            .map(checkbox => checkbox.value);
        price = selectedPrices.join(',');
        
        url.searchParams.set('price', price);
        history.pushState(null, '', url.toString());
        fetch(url.toString())
            .then(res => res.text())
            .then(data => {
                const parser = new DOMParser();
                const html = parser.parseFromString(data, 'text/html');
                console.log(html);
                const newProducts = html.querySelector('.all-products');
                console.log(newProducts);
                const currentProducts = document.querySelector('.all-products');
                currentProducts.innerHTML = newProducts.innerHTML;
            });

       
});
});

checkboxesBattery.forEach(checkbox => {
    let battery = "";
    checkbox.addEventListener('change', () => {
        battery = type + ',' + checkbox.id;
        
        console.log(battery);

        url.searchParams.set('battery', battery);
        history.pushState(null, '', url.toString());
        fetch(url.toString())
            .then(res => res.text())
            .then(data => {
                const parser = new DOMParser();
                const html = parser.parseFromString(data, 'text/html');
                console.log(html);
                const newProducts = html.querySelector('.all-products');
                console.log(newProducts);
                const currentProducts = document.querySelector('.all-products');
                currentProducts.innerHTML = newProducts.innerHTML;
            });

    });
});


checkboxesScreen.forEach(checkbox => {
    let screen = "";
    checkbox.addEventListener('change', () => {
        screen = type + ',' + checkbox.value;
        
        url.searchParams.set('screen', screen);
        history.pushState(null, '', url.toString());
        fetch(url.toString())
            .then(res => res.text())
            .then(data => {
                const parser = new DOMParser();
                const html = parser.parseFromString(data, 'text/html');
                console.log(html);
                const newProducts = html.querySelector('.all-products');
                console.log(newProducts);
                const currentProducts = document.querySelector('.all-products');
                currentProducts.innerHTML = newProducts.innerHTML;
            });

    });
});


checkboxesRam.forEach(checkbox => {
    let ram = "";
    checkbox.addEventListener('change', () => {
        ram = checkbox.value;
        
        url.searchParams.set('ram', ram);
        history.pushState(null, '', url.toString());
        fetch(url.toString())
            .then(res => res.text())
            .then(data => {
                const parser = new DOMParser();
                const html = parser.parseFromString(data, 'text/html');
                console.log(html);
                const newProducts = html.querySelector('.all-products');
                console.log(newProducts);
                const currentProducts = document.querySelector('.all-products');
                currentProducts.innerHTML = newProducts.innerHTML;
            });

    });
});


checkboxesRom.forEach(checkbox => {
    let rom = "";
    checkbox.addEventListener('change', () => {
        rom =  checkbox.value;
        
        url.searchParams.set('rom', rom);
        history.pushState(null, '', url.toString());
        fetch(url.toString())
            .then(res => res.text())
            .then(data => {
                const parser = new DOMParser();
                const html = parser.parseFromString(data, 'text/html');
                console.log(html);
                const newProducts = html.querySelector('.all-products');
                console.log(newProducts);
                const currentProducts = document.querySelector('.all-products');
                currentProducts.innerHTML = newProducts.innerHTML;
            });

    });
});

const sort = document.querySelector('.sort-select');
if (sort) {
    sort.addEventListener('change', () => {
        const selectedSort = sort.value;
        if (selectedSort == 'default') {
            url.searchParams.delete('sort');
            history.pushState(null, '', url.toString());
            fetch(url.toString())
                .then(res => res.text())
                .then(data => {
                    const parser = new DOMParser();
                    const html = parser.parseFromString(data, 'text/html');
                    const newProducts = html.querySelector('.all-products');
                    const currentProducts = document.querySelector('.all-products');
                    currentProducts.innerHTML = newProducts.innerHTML;
                });
            return;

        }
        url.searchParams.set('sort', selectedSort);
        history.pushState(null, '', url.toString());
        fetch(url.toString())
            .then(res => res.text())
            .then(data => {
                const parser = new DOMParser();
                const html = parser.parseFromString(data, 'text/html');
                const newProducts = html.querySelector('.all-products');
                const currentProducts = document.querySelector('.all-products');
                currentProducts.innerHTML = newProducts.innerHTML;
            });
    }
    );
}