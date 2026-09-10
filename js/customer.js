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
PAGE LOAD
=====================================
*/

window.addEventListener(
    "DOMContentLoaded",
    function () {

        findCustomerCoffees();

    }
);


/*
=====================================
GET ALL PRODUCTS
=====================================
*/

async function findCustomerCoffees() {

    try {

        const response =
            await fetch(
                `${BASE_URL}/findAllCoffee`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to fetch products"
            );

        }


        const data =
            await response.json();


        console.log(
            "Customer Product List :",
            data
        );


        if (
            data &&
            data.data &&
            Array.isArray(
                data.data.coffee
            )
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
            "Customer Error :",
            error
        );


        const container =
            document.getElementById(
                "customerCoffeeContainer"
            );


        if (container) {

            container.innerHTML = `

                <div class="empty-cart">

                    <i class="fa-solid fa-triangle-exclamation"></i>

                    <h2>
                        Unable to Load Menu
                    </h2>

                    <p>
                        Please make sure the
                        Spring Boot server is running.
                    </p>

                </div>

            `;

        }

    }

}


/*
=====================================
GET PRODUCT IMAGE
COFFEE + THICK SHAKE + MILKSHAKE
=====================================
*/

function getCoffeeImage(coffeeName) {

    const name =
        String(coffeeName)
            .toLowerCase()
            .trim();


    /*
    =================================
    COFFEE
    =================================
    */


    // Cappuccino

    if (
        name.includes("cappuccino")
    ) {

        return "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800";

    }


    // Black Coffee

    if (
        name.includes("black coffee") ||
        name === "black"
    ) {

        return "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=800";

    }


    // Americano

    if (
        name.includes("americano")
    ) {

        return "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=800";

    }


    // Latte

    if (
        name.includes("latte")
    ) {

        return "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800";

    }


    // Filter Coffee

    if (
        name.includes("filter coffee") ||
        name.includes("filter")
    ) {

        return "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800";

    }


    /*
    =================================
    THICK SHAKE
    =================================
    */


    // Belgium Chocolate

    if (
        name.includes("belgium chocolate") ||
        name.includes("belgian chocolate") ||
        name.includes("belgium") ||
        name.includes("belgian")
    ) {

        return "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800";

    }


    // Mango Milkshake

    if (
        name.includes("mango milkshake") ||
        name.includes("mango shake") ||
        name.includes("mango")
    ) {

        return "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800";

    }


    // Oreo Thick Shake

    if (
        name.includes("oreo thick shake") ||
        name.includes("oreo milkshake") ||
        name.includes("oreo shake") ||
        name.includes("oreo")
    ) {

        return "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800";

    }


    // Chocolate Milkshake

    if (
        name.includes("chocolate milkshake") ||
        name.includes("chocolate shake") ||
        name.includes("chocolate thick shake")
    ) {

        return "https://images.unsplash.com/photo-1577805947697-89e18249d767?w=800";

    }


    // Normal Milkshake

    if (
        name.includes("milkshake") ||
        name.includes("milk shake") ||
        name.includes("thick shake") ||
        name.includes("thickshake")
    ) {

        return "https://images.unsplash.com/photo-1553787499-6f7c1f0e8f1f?w=800";

    }


    /*
    =================================
    DEFAULT
    =================================
    */

    return "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800";

}


/*
=====================================
DISPLAY CUSTOMER PRODUCTS
=====================================
*/

function displayCustomerCoffees(
    coffeeList
) {

    const container =
        document.getElementById(
            "customerCoffeeContainer"
        );


    if (!container) {

        console.error(
            "customerCoffeeContainer not found"
        );

        return;

    }


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
            ==============================
            GET IMAGE
            ==============================
            */

            const coffeeImage =
                getCoffeeImage(
                    coffee.coffeeName
                );


            /*
            ==============================
            AVAILABLE
            ==============================
            */

            if (
                coffee.available === true
            ) {

                container.innerHTML += `

                    <div class="customer-coffee-card">

                        <img
                            src="${coffeeImage}"
                            alt="${coffee.coffeeName}"
                            onerror="this.src='https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800'"
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

                                    1

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
            ==============================
            UNAVAILABLE
            ==============================
            */

            else {

                container.innerHTML += `

                    <div class="customer-coffee-card">

                        <img
                            src="${coffeeImage}"
                            alt="${coffee.coffeeName}"
                            onerror="this.src='https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800'"
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
INCREASE PRODUCT QUANTITY
=====================================
*/

function increaseQuantity(
    coffeeId
) {

    const quantityElement =
        document.getElementById(
            `quantity-${coffeeId}`
        );


    if (!quantityElement) {

        return;

    }


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
DECREASE PRODUCT QUANTITY
=====================================
*/

function decreaseQuantity(
    coffeeId
) {

    const quantityElement =
        document.getElementById(
            `quantity-${coffeeId}`
        );


    if (!quantityElement) {

        return;

    }


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


    if (!quantityElement) {

        return;

    }


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


    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (cartCount) {

        cartCount.innerText =
            totalQuantity;

    }

}


/*
=====================================
OPEN CART
=====================================
*/

function openCart() {

    const cartSection =
        document.getElementById(
            "cartSection"
        );


    if (!cartSection) {

        return;

    }


    cartSection.classList.remove(
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

    const cartSection =
        document.getElementById(
            "cartSection"
        );


    if (!cartSection) {

        return;

    }


    cartSection.classList.add(
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


    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    if (!cartItems) {

        return;

    }


    cartItems.innerHTML = "";


    if (
        customerCart.length === 0
    ) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>
                    Your Cart Is Empty
                </h3>

                <p>
                    Add some coffee or shakes.
                </p>

            </div>

        `;


        if (cartTotal) {

            cartTotal.innerText =
                "₹0";

        }


        return;

    }


    let total = 0;


    customerCart.forEach(
        item => {


            const subtotal =
                item.price *
                item.quantity;


            total += subtotal;


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
                        ₹${subtotal}
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


    if (cartTotal) {

        cartTotal.innerText =
            `₹${total}`;

    }

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


    if (!item) {

        return;

    }


    item.quantity++;


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


            total += subtotal;


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