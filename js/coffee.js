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

        coffeeName: document.getElementById("coffeeName").value,

        price: Number(
            document.getElementById("price").value
        ),

        category: document.getElementById("category").value,

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

        container.innerHTML += `

        <div class="coffee-card">

            <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600">

            <div class="card-body">

                <h3>${coffee.coffeeName}</h3>

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

        const coffee = data.data.coffee;

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

        const coffee = data.data.coffee;

        updateCoffeeId = coffee.coffeeId;

        document.getElementById("coffeeName").value =
            coffee.coffeeName;

        document.getElementById("price").value =
            coffee.price;

        document.getElementById("category").value =
            coffee.category;

        document.getElementById("available").value =
            coffee.available;

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

        coffeeId: updateCoffeeId,

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

        updateCoffeeId = null;

        document.getElementById("saveButton").innerHTML =
            "Save Coffee";

        clearForm();

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

        findAllCoffee();

    }

    catch (error) {

        console.error(error);

    }

}