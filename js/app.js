const BASE_URL = "http://localhost:8090/coffee";

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

        console.log("API Response:", data);

        // adjust according to your backend response
        const coffeeList = data.data.coffee;

        displayCoffee(coffeeList);

    } catch (error) {

        console.error(
            "Error fetching coffees:",
            error
        );
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

    if (
        coffee.coffeeName === "" ||
        coffee.category === "" ||
        coffee.price <= 0
    ) {

        alert("Please enter valid coffee details");
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

        const data = await response.json();

        console.log(data);

        alert("Coffee Saved Successfully");

        clearForm();

        // refresh list automatically
        viewCart();

    } catch (error) {

        console.error(error);

        alert("Unable to save coffee");
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
            "<h3 style='color:white'>No Coffee Found</h3>";

        return;
    }

    coffeeList.forEach(coffee => {

        container.innerHTML += `

        <div class="coffee-card">

            <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500"
            alt="Coffee">

            <div class="coffee-info">

                <h3>☕ ${coffee.coffeeName}</h3>

                <p>📂 Category : ${coffee.category}</p>

                <p>💰 Price : ₹${coffee.price}</p>

                <p>
                    ✅ Available :
                    ${coffee.available ? "Yes" : "No"}
                </p>

                <button
                    class="delete-btn"
                    onclick="deleteCoffee(${coffee.coffeeId})">

                    🗑 Delete

                </button>

            </div>

        </div>

        `;
    });
}

/*
=====================================
DELETE COFFEE
=====================================
*/
async function deleteCoffee(id) {

    if (!confirm("Delete this coffee ?")) {
        return;
    }

    try {

        const response = await fetch(
            `${BASE_URL}/deleteCoffeeById?id=${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        console.log(data);

        alert("Coffee Deleted Successfully");

        viewCart();

    } catch (error) {

        console.error(error);

        alert("Unable to delete coffee");
    }
}

/*
=====================================
VIEW CART
=====================================
*/
function viewCart() {

    // SHOW SECTION
    document.getElementById("coffeeSection")
        .style.display = "block";

    document.getElementById("coffeeContainer")
        .style.display = "flex";

    getAllCoffee();
}

/*
=====================================
CLEAR FORM
=====================================
*/
function clearForm() {

    document.getElementById("coffeeName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("category").value = "";
    document.getElementById("available").value = "true";
}