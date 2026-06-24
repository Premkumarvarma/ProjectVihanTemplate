fetch("http://localhost:8090/coffee/findAllCoffee")
.then(response => response.json())
.then(data => {

    console.log(data);

    let coffees = data.data.coffee;

    let container =
    document.getElementById("coffeeContainer");

    coffees.forEach(coffee => {

        container.innerHTML += `
        
        <div class="card">

            <h2>${coffee.coffeeName}</h2>

            <p>Category : ${coffee.category}</p>

            <p>Price : ₹${coffee.price}</p>

            <button>Add To Cart</button>

        </div>

        `;

    });

})
.catch(error => {
    console.error(error);
});