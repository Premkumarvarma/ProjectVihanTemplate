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

        const data = await response.json();

        console.log("Coffee List :", data);

        displayCoffee(data.data.coffee);

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
            document.getElementById("coffeeName").value,

        price:
            Number(
                document.getElementById("price").value
            ),

        category:
            document.getElementById("category").value,

        available:
            document.getElementById("available").value === "true"

    };

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

        const data = await response.json();

        console.log(data);

        alert("Coffee Saved Successfully");

        clearForm();

        findAllCoffee();

    }

    catch (error) {

        console.error(error);

    }

}


/*
=====================================
GET COFFEE IMAGE
=====================================
*/

function getCoffeeImage(coffeeName) {

    const name =
        String(coffeeName).toLowerCase();


    /*
    ================================
    CAPPUCCINO
    ================================
    */

    if (name.includes("cappuccino")) {

        return "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600";

    }


    /*
    ================================
    BLACK COFFEE
    ================================
    */

    if (
        name.includes("black coffee") ||
        name.includes("black")
    ) {

        return "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=600";

    }


    /*
    ================================
    AMERICANO
    ================================
    */

    if (name.includes("americano")) {

        return "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600";

    }


    /*
    ================================
    LATTE
    ================================
    */

    if (name.includes("latte")) {

        return "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600";

    }


    /*
    ================================
    FILTER COFFEE
    ================================
    */

    if (
        name.includes("filter coffee") ||
        name.includes("filter")
    ) {

        return "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600";

    }


    /*
    ================================
    DEFAULT COFFEE
    ================================
    */

    return "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600";

}


/*
=====================================
DISPLAY COFFEE
=====================================
*/

function displayCoffee(coffeeList) {

    const container =
        document.getElementById("coffeeContainer");

    container.innerHTML = "";

    if (!coffeeList || coffeeList.length === 0) {

        container.innerHTML =
            "<h2>No Coffee Available</h2>";

        return;

    }


    coffeeList.forEach(coffee => {


        /*
        ================================
        GET IMAGE FOR THIS COFFEE
        ================================
        */

        const coffeeImage =
            getCoffeeImage(coffee.coffeeName);


        /*
        ================================
        CREATE COFFEE CARD
        ================================
        */

        container.innerHTML += `

        <div class="coffee-card">

            <img
                src="${coffeeImage}"
                alt="${coffee.coffeeName}"
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
                    ${coffee.available ? "Yes" : "No"}
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

    });

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

        const data = await response.json();

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

        console.error(error);

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

        const data = await response.json();

        const coffee =
            data.data.coffee;


        /*
        ================================
        STORE ID
        ================================
        */

        updateCoffeeId =
            coffee.coffeeId;


        /*
        ================================
        FILL FORM
        ================================
        */

        document.getElementById("coffeeName").value =
            coffee.coffeeName;

        document.getElementById("price").value =
            coffee.price;

        document.getElementById("category").value =
            coffee.category;

        document.getElementById("available").value =
            coffee.available;


        /*
        ================================
        CHANGE BUTTON TEXT
        ================================
        */

        document.getElementById("saveButton").innerHTML =
            "Update Coffee";

    }

    catch (error) {

        console.error(error);

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
            document.getElementById("coffeeName").value,

        price:
            Number(
                document.getElementById("price").value
            ),

        category:
            document.getElementById("category").value,

        available:
            document.getElementById("available").value === "true"

    };


    try {

        const response = await fetch(

            `${BASE_URL}/updateCoffee`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(coffee)

            }

        );

        await response.json();


        alert("Coffee Updated Successfully");


        /*
        ================================
        RESET UPDATE ID
        ================================
        */

        updateCoffeeId = null;


        /*
        ================================
        RESET BUTTON
        ================================
        */

        document.getElementById("saveButton").innerHTML =
            "Save Coffee";


        /*
        ================================
        CLEAR FORM
        ================================
        */

        clearForm();


        /*
        ================================
        REFRESH COFFEE LIST
        ================================
        */

        findAllCoffee();

    }

    catch (error) {

        console.error(error);

    }

}


/*
=====================================
SAVE OR UPDATE
=====================================
*/

function saveOrUpdateCoffee() {

    if (updateCoffeeId == null) {

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

    if (!confirm("Delete Coffee ?")) {

        return;

    }


    try {

        await fetch(

            `${BASE_URL}/deleteCoffeeById?id=${id}`,

            {

                method: "DELETE"

            }

        );


        alert("Coffee Deleted Successfully");


        /*
        ================================
        REFRESH COFFEE LIST
        ================================
        */

        findAllCoffee();

    }

    catch (error) {

        console.error(error);

    }

}