/*
=====================================
CUSTOMER COFFEE SHOP
=====================================
*/


const BASE_URL =
    "http://localhost:8090/coffee";


/*
=====================================
CUSTOMER CART
=====================================
*/

let customerCart = [];


/*
=====================================
LOAD CUSTOMER PAGE
=====================================
*/

window.onload = function () {

    findCustomerCoffees();

};


/*
=====================================
GET ALL COFFEES
=====================================
*/

async function findCustomerCoffees() {

    try {

        const response = await fetch(
            `${BASE_URL}/findAllCoffee`
        );


        if (!response.ok) {

            throw new Error(
                "Unable to fetch coffee data"
            );

        }


        const data =
            await response.json();


        console.log(
            "Customer Coffee List :",
            data
        );


        if (
            data.data &&
            data.data.coffee
        ) {

            displayCustomerCoffees(
                data.data.coffee
            );

        }

        else {

            displayCustomerCoffees([]);

        }


    }

    catch (error) {

        console.error(
            "Error fetching coffees :",
            error
        );


        document.getElementById(
            "customerCoffeeContainer"
        ).innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-triangle-exclamation"></i>

                <h2>
                    Unable to load coffees
                </h2>

                <p>
                    Please make sure the Spring Boot
                    server is running.
                </p>

            </div>

        `;

    }

}


/*
=====================================
GET COFFEE IMAGE
=====================================
*/

function getCoffeeImage(coffeeName) {

    const name =
        String(coffeeName)
        .toLowerCase();


    /*
    ================================
    CAPPUCCINO
    ================================
    */

    if (
        name.includes("cappuccino")
    ) {

        return "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600";

    }


    /*
    ================================
    BLACK COFFEE
    ================================
    */

    if (
        name.includes("black")
    ) {

        return "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=600";

    }


    /*
    ================================
    AMERICANO
    ================================
    */

    if (
        name.includes("americano")
    ) {

        return "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600";

    }


    /*
    ================================
    LATTE
    ================================
    */

    if (
        name.includes("latte")
    ) {

        return "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600";

    }


    /*
    ================================
    FILTER COFFEE
    ================================
    */

    if (
        name.includes("filter")
    ) {

        return "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600";

    }


    /*
    ================================
    DEFAULT
    ================================
    */

    return "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600";

}


/*
=====================================
DISPLAY CUSTOMER COFFEES
=====================================
*/

function displayCustomerCoffees(
    coffeeList
) {

    const container =
        document.getElementById(
            "customerCoffeeContainer"
        );


    container.innerHTML = "";


    if (
        !coffeeList ||
        coffeeList.length === 0
    ) {

        container.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-mug-hot"></i>

                <h2>
                    No Coffee Available
                </h2>

                <p>
                    Please check again later.
                </p>

            </div>

        `;

        return;

    }


    coffeeList.forEach(
        coffee => {


            /*
            ==========================
            GET IMAGE
            ==========================
            */

            const coffeeImage =
                getCoffeeImage(
                    coffee.coffeeName
                );


            /*
            ==========================
            CHECK CART
            ==========================
            */

            const existingItem =
                customerCart.find(
                    item =>
                        item.coffeeId ===
                        coffee.coffeeId
                );


            const quantity =
                existingItem
                    ? existingItem.quantity
                    : 1;


            /*
            ==========================
            AVAILABLE COFFEE
            ==========================
            */

            if (coffee.available) {

                container.innerHTML += `

                <div class="customer-coffee-card">

                    <img
                        src="${coffeeImage}"
                        alt="${coffee.coffeeName}"
                    >


                    <div class="customer-card-body">

                        <h3>
                            ${coffee.coffeeName}
                        </h3>


                        <p>
                            <strong>
                                Category:
                            </strong>

                            ${coffee.category}
                        </p>


                        <p class="coffee-price">

                            ₹${coffee.price}

                        </p>


                        <p class="available">

                            <i class="fa-solid fa-circle-check"></i>

                            Available

                        </p>


                        <div class="quantity-area">

                            <button
                                onclick="decreaseQuantity(${coffee.coffeeId})">

                                <i class="fa-solid fa-minus"></i>

                            </button>


                            <span
                                id="quantity-${coffee.coffeeId}">

                                ${quantity}

                            </span>


                            <button
                                onclick="increaseQuantity(${coffee.coffeeId})">

                                <i class="fa-solid fa-plus"></i>

                            </button>

                        </div>


                        <button
                            class="add-cart-button"
                            onclick="addToCart(
                                ${coffee.coffeeId},
                                '${escapeQuotes(coffee.coffeeName)}',
                                ${coffee.price}
                            )">

                            <i class="fa-solid fa-cart-plus"></i>

                            Add to Cart

                        </button>

                    </div>

                </div>

                `;

            }


            /*
            ==========================
            UNAVAILABLE COFFEE
            ==========================
            */

            else {

                container.innerHTML += `

                <div class="customer-coffee-card">

                    <img
                        src="${coffeeImage}"
                        alt="${coffee.coffeeName}"
                    >


                    <div class="customer-card-body">

                        <h3>
                            ${coffee.coffeeName}
                        </h3>


                        <p>
                            <strong>
                                Category:
                            </strong>

                            ${coffee.category}
                        </p>


                        <p class="coffee-price">

                            ₹${coffee.price}

                        </p>


                        <p class="unavailable">

                            <i class="fa-solid fa-circle-xmark"></i>

                            Currently Unavailable

                        </p>


                        <button
                            class="unavailable-button"
                            disabled>

                            <i class="fa-solid fa-ban"></i>

                            Not Available

                        </button>

                    </div>

                </div>

                `;

            }

        }
    );

}


/*
=====================================
ESCAPE QUOTES
=====================================
*/

function escapeQuotes(value) {

    return String(value)
        .replace(/'/g, "\\'");

}


/*
=====================================
INCREASE QUANTITY
=====================================
*/

function increaseQuantity(
    coffeeId
) {

    const quantityElement =
        document.getElementById(
            `quantity-${coffeeId}`
        );


    let quantity =
        Number(
            quantityElement.innerText
        );


    quantity++;


    quantityElement.innerText =
        quantity;

}


/*
=====================================
DECREASE QUANTITY
=====================================
*/

function decreaseQuantity(
    coffeeId
) {

    const quantityElement =
        document.getElementById(
            `quantity-${coffeeId}`
        );


    let quantity =
        Number(
            quantityElement.innerText
        );


    if (quantity > 1) {

        quantity--;

    }


    quantityElement.innerText =
        quantity;

}


/*
=====================================
ADD TO CART
=====================================
*/

function addToCart(
    coffeeId,
    coffeeName,
    price
) {

    const quantityElement =
        document.getElementById(
            `quantity-${coffeeId}`
        );


    const quantity =
        Number(
            quantityElement.innerText
        );


    const existingItem =
        customerCart.find(
            item =>
                item.coffeeId ===
                coffeeId
        );


    if (existingItem) {

        existingItem.quantity +=
            quantity;

    }

    else {

        customerCart.push({

            coffeeId:
                coffeeId,

            coffeeName:
                coffeeName,

            price:
                price,

            quantity:
                quantity

        });

    }


    updateCartCount();


    alert(
        `${coffeeName} added to cart`
    );


    console.log(
        "Current Cart :",
        customerCart
    );

}


/*
=====================================
UPDATE CART COUNT
=====================================
*/

function updateCartCount() {

    let totalQuantity = 0;


    customerCart.forEach(
        item => {

            totalQuantity +=
                item.quantity;

        }
    );


    document.getElementById(
        "cartCount"
    ).innerText =
        totalQuantity;

}


/*
=====================================
OPEN CART
=====================================
*/

function openCart() {

    document.getElementById(
        "cartSection"
    ).classList.remove(
        "hidden"
    );


    displayCart();

}


/*
=====================================
CLOSE CART
=====================================
*/

function closeCart() {

    document.getElementById(
        "cartSection"
    ).classList.add(
        "hidden"
    );

}


/*
=====================================
DISPLAY CART
=====================================
*/

function displayCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    cartItems.innerHTML = "";


    if (
        customerCart.length === 0
    ) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some coffee to continue.
                </p>

            </div>

        `;


        document.getElementById(
            "cartTotal"
        ).innerText =
            "₹0";


        return;

    }


    let total = 0;


    customerCart.forEach(
        item => {


            const itemTotal =
                item.price *
                item.quantity;


            total +=
                itemTotal;


            cartItems.innerHTML += `

                <div class="cart-item">

                    <h3>
                        ${item.coffeeName}
                    </h3>


                    <p>
                        Price:
                        ₹${item.price}
                    </p>


                    <p>
                        Subtotal:
                        ₹${itemTotal}
                    </p>


                    <div class="cart-item-controls">


                        <div class="cart-quantity">

                            <button
                                onclick="decreaseCartQuantity(${item.coffeeId})">

                                <i class="fa-solid fa-minus"></i>

                            </button>


                            <strong>
                                ${item.quantity}
                            </strong>


                            <button
                                onclick="increaseCartQuantity(${item.coffeeId})">

                                <i class="fa-solid fa-plus"></i>

                            </button>

                        </div>


                        <button
                            class="remove-cart"
                            onclick="removeFromCart(${item.coffeeId})">

                            <i class="fa-solid fa-trash"></i>

                            Remove

                        </button>


                    </div>

                </div>

            `;

        }
    );


    document.getElementById(
        "cartTotal"
    ).innerText =
        `₹${total}`;

}


/*
=====================================
INCREASE CART QUANTITY
=====================================
*/

function increaseCartQuantity(
    coffeeId
) {

    const item =
        customerCart.find(
            item =>
                item.coffeeId ===
                coffeeId
        );


    if (item) {

        item.quantity++;

    }


    updateCartCount();

    displayCart();

}


/*
=====================================
DECREASE CART QUANTITY
=====================================
*/

function decreaseCartQuantity(
    coffeeId
) {

    const item =
        customerCart.find(
            item =>
                item.coffeeId ===
                coffeeId
        );


    if (!item) {

        return;

    }


    if (item.quantity > 1) {

        item.quantity--;

    }

    else {

        removeFromCart(
            coffeeId
        );

        return;

    }


    updateCartCount();

    displayCart();

}


/*
=====================================
REMOVE FROM CART
=====================================
*/

function removeFromCart(
    coffeeId
) {

    customerCart =
        customerCart.filter(
            item =>
                item.coffeeId !==
                coffeeId
        );


    updateCartCount();

    displayCart();

}


/*
=====================================
PLACE ORDER
=====================================
*/

function placeOrder() {

    if (
        customerCart.length === 0
    ) {

        alert(
            "Your cart is empty"
        );

        return;

    }


    let orderSummary =
        "ORDER SUMMARY\n\n";


    let total = 0;


    customerCart.forEach(
        item => {

            const subtotal =
                item.price *
                item.quantity;


            total +=
                subtotal;


            orderSummary +=
                `${item.coffeeName} x ${item.quantity} = ₹${subtotal}\n`;

        }
    );


    orderSummary +=
        `\nTotal Amount = ₹${total}`;


    alert(
        orderSummary
    );


    console.log(
        "Order Data :",
        customerCart
    );


    
}