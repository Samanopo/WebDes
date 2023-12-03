let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'BAJU DAN CELANA',
        image: 'baju.png',
        price: 10000,
        rating: 4,
        laundryName: 'Laundry A'
    },
    {
        id: 2,
        name: 'PAKET CUCI SETRIKA',
        image: 'order.jpg',
        price: 20000,
        rating: 3,
        laundryName: 'Laundry B'
    },
    {
        id: 3,
        name: 'CUCI KERING',
        image: 'kering.jpg',
        price: 17000,
        rating: 5,
        laundryName: 'Laundry C'
    },
    {
        id: 4,
        name: 'CUCI BASAH',
        image: 'basah.jpg',
        price: 12000,
        rating: 4,
        laundryName: 'Laundry D'
    },
    {
        id: 5,
        name: 'PAKET KILAT',
        image: 'kilat.jpg',
        price: 20000,
        rating: 2,
        laundryName: 'Laundry E'
    },
    {
        id: 6,
        name: 'PAKET KOMPLIT',
        image: 'paket.jpg',
        price: 32000,
        rating: 5,
        laundryName: 'Laundry F'
    }
];

let listCards = [];

function generateStarRating(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += '&#9733;'; // Solid star
        } else {
            starsHTML += '&#9734;'; // Empty star
        }
    }
    return `<div class="stars">${starsHTML}</div>`;
}

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()} /kg</div>
            <div class="rating">${generateStarRating(value.rating)}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    });
}

initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.laundryName}</div>
                <div>${value.price.toLocaleString()} /kg</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString() + " /kg";
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

// Add event listener for total to redirect to payment.html
total.addEventListener('click', () => {
    // Redirect to payment.html
    window.location.href = 'payment.html';
});
