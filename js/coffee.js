const BASE_URL = "http://localhost:8090/coffee";

let updateCoffeeId = null;


/*
=====================================
GET ALL COFFEES
=====================================
*/

async function findAllCoffee() {

    try {

        const response = await fetch(
            `${BASE_URL}/findAllCoffee`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch coffee list");
        }

        const data = await response.json();

        console.log("Coffee List :", data);

        if (
            data &&
            data.data &&
            Array.isArray(data.data.coffee)
        ) {

            displayCoffee(data.data.coffee);

        } else {

            displayCoffee([]);

        }

    } catch (error) {

        console.error("Error :", error);

    }

}


/*
=====================================
SAVE COFFEE
=====================================
*/

async function saveCoffeeData() {

    const coffee = {

        coffeeName:
            document.getElementById("coffeeName").value.trim(),

        price:
            Number(
                document.getElementById("price").value
            ),

        category:
            document.getElementById("category").value.trim(),

        available:
            document.getElementById("available").value === "true"

    };


    if (!coffee.coffeeName) {

        alert("Please enter coffee name");

        return;

    }


    if (!coffee.price || coffee.price <= 0) {

        alert("Please enter a valid price");

        return;

    }


    if (!coffee.category) {

        alert("Please enter category");

        return;

    }


    try {

        const response = await fetch(

            `${BASE_URL}/saveCoffee`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(coffee)

            }

        );


        if (!response.ok) {

            throw new Error(
                "Failed to save coffee"
            );

        }


        const data =
            await response.json();


        console.log(
            "Save Response :",
            data
        );


        alert(
            "Coffee Saved Successfully"
        );


        clearForm();


        findAllCoffee();

    }

    catch (error) {

        console.error(
            "Save Error :",
            error
        );

        alert(
            "Unable to save coffee"
        );

    }

}


/*
=====================================
GET PRODUCT IMAGE
COFFEE + THICK SHAKE + MILKSHAKE
=====================================
*/

function getCoffeeImage(coffeeName) {

    const name = String(coffeeName)
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
    THICK SHAKES / MILKSHAKES
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
    DEFAULT IMAGE
    =================================
    */

    return "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800";

}


/*
=====================================
DISPLAY COFFEE
=====================================
*/

function displayCoffee(coffeeList) {

    const container =
        document.getElementById(
            "coffeeContainer"
        );


    if (!container) {

        console.error(
            "coffeeContainer not found"
        );

        return;

    }


    container.innerHTML = "";


    if (
        !coffeeList ||
        coffeeList.length === 0
    ) {

        container.innerHTML =
            "<h2>No Coffee Available</h2>";

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
            CREATE CARD
            ==============================
            */

            container.innerHTML += `

            <div class="coffee-card">

                <img
                    src="${coffeeImage}"
                    alt="${coffee.coffeeName}"
                    onerror="this.src='https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800'"
                >


                <div class="card-body">

                    <h3>
                        ${coffee.coffeeName}
                    </h3>


                    <p>

                        Category :
                        ${coffee.category}

                    </p>


                    <p>

                        Price :
                        ₹${coffee.price}

                    </p>


                    <p>

                        Available :
                        ${coffee.available
                            ? "Yes"
                            : "No"}

                    </p>


                    <div class="btn-group">


                        <button
                            class="view"
                            onclick="findCoffeeById(${coffee.coffeeId})">

                            View

                        </button>


                        <button
                            class="edit"
                            onclick="editCoffee(${coffee.coffeeId})">

                            Edit

                        </button>


                        <button
                            class="delete"
                            onclick="deleteCoffee(${coffee.coffeeId})">

                            Delete

                        </button>


                    </div>

                </div>

            </div>

            `;

        }
    );

}


/*
=====================================
FIND COFFEE BY ID
=====================================
*/

async function findCoffeeById(id) {

    try {

        const response = await fetch(

            `${BASE_URL}/findCoffeeById?id=${id}`

        );


        if (!response.ok) {

            throw new Error(
                "Coffee not found"
            );

        }


        const data =
            await response.json();


        const coffee =
            data.data.coffee;


        alert(

`Coffee Name : ${coffee.coffeeName}

Price : ₹${coffee.price}

Category : ${coffee.category}

Available : ${coffee.available}`

        );

    }

    catch (error) {

        console.error(
            "Find Error :",
            error
        );

    }

}


/*
=====================================
EDIT COFFEE
=====================================
*/

async function editCoffee(id) {

    try {

        const response = await fetch(

            `${BASE_URL}/findCoffeeById?id=${id}`

        );


        if (!response.ok) {

            throw new Error(
                "Coffee not found"
            );

        }


        const data =
            await response.json();


        const coffee =
            data.data.coffee;


        updateCoffeeId =
            coffee.coffeeId;


        document.getElementById(
            "coffeeName"
        ).value =
            coffee.coffeeName;


        document.getElementById(
            "price"
        ).value =
            coffee.price;


        document.getElementById(
            "category"
        ).value =
            coffee.category;


        document.getElementById(
            "available"
        ).value =
            String(coffee.available);


        document.getElementById(
            "saveButton"
        ).innerHTML =
            "Update Coffee";


    }

    catch (error) {

        console.error(
            "Edit Error :",
            error
        );

    }

}


/*
=====================================
UPDATE COFFEE
=====================================
*/

async function updateCoffee() {

    const coffee = {

        coffeeId:
            updateCoffeeId,

        coffeeName:
            document.getElementById(
                "coffeeName"
            ).value.trim(),

        price:
            Number(
                document.getElementById(
                    "price"
                ).value
            ),

        category:
            document.getElementById(
                "category"
            ).value.trim(),

        available:
            document.getElementById(
                "available"
            ).value === "true"

    };


    try {

        const response = await fetch(

            `${BASE_URL}/updateCoffee`,

            {

                method: "PUT",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(coffee)

            }

        );


        if (!response.ok) {

            throw new Error(
                "Failed to update coffee"
            );

        }


        await response.json();


        alert(
            "Coffee Updated Successfully"
        );


        updateCoffeeId = null;


        document.getElementById(
            "saveButton"
        ).innerHTML =
            "Save Coffee";


        clearForm();


        findAllCoffee();

    }

    catch (error) {

        console.error(
            "Update Error :",
            error
        );

        alert(
            "Unable to update coffee"
        );

    }

}


/*
=====================================
SAVE OR UPDATE
=====================================
*/

function saveOrUpdateCoffee() {

    if (
        updateCoffeeId === null
    ) {

        saveCoffeeData();

    }

    else {

        updateCoffee();

    }

}


/*
=====================================
DELETE
=====================================
*/

async function deleteCoffee(id) {

    if (
        !confirm(
            "Delete Coffee ?"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(

                `${BASE_URL}/deleteCoffeeById?id=${id}`,

                {

                    method: "DELETE"

                }

            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete coffee"
            );

        }


        alert(
            "Coffee Deleted Successfully"
        );


        findAllCoffee();

    }

    catch (error) {

        console.error(
            "Delete Error :",
            error
        );

        alert(
            "Unable to delete coffee"
        );

    }

}