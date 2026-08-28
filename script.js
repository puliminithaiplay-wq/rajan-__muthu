let cart =
JSON.parse(localStorage.getItem("campusCart")) || [];


function saveCart(){

    localStorage.setItem(
        "campusCart",
        JSON.stringify(cart)
    );

}


function addToCart(name, price){

    let item =
        cart.find(product => product.name === name);

    if(item){

        item.quantity++;

    }else{

        cart.push({
            name:name,
            price:price,
            quantity:1
        });

    }

    saveCart();
    updateCart();
    openCart();

}


function updateCart(){

    let count = 0;
    let total = 0;

    cart.forEach(item => {

        count += item.quantity;

        total +=
            item.price * item.quantity;

    });


    document.getElementById("cartCount")
        .innerText = count;

    document.getElementById("cartTotal")
        .innerText = total;


    let cartItems =
        document.getElementById("cartItems");


    if(cart.length === 0){

        cartItems.innerHTML =
        `<p class="empty">
            Your cart is empty.
        </p>`;

        return;

    }


    cartItems.innerHTML = "";


    cart.forEach((item,index) => {

        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <br>

                    <small>
                        ₹${item.price} × ${item.quantity}
                    </small>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeItem(${index})">

                    −

                </button>

            </div>

        `;

    });

}


function removeItem(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    saveCart();
    updateCart();

}


function openCart(){

    document
        .getElementById("cartPanel")
        .classList.add("open");

    document
        .getElementById("cartOverlay")
        .classList.add("show");

}


function closeCart(){

    document
        .getElementById("cartPanel")
        .classList.remove("open");

    document
        .getElementById("cartOverlay")
        .classList.remove("show");

}


function searchFood(){

    let search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    document
        .querySelectorAll(".food-card")
        .forEach(card => {

            let name =
                card
                .querySelector("h3")
                .innerText
                .toLowerCase();


            if(name.includes(search)){

                card.style.display = "block";

            }else{

                card.style.display = "none";

            }

        });

}


function filterFood(category, button){

    document
        .querySelectorAll(".category")
        .forEach(btn =>
            btn.classList.remove("active")
        );


    button.classList.add("active");


    document
        .querySelectorAll(".food-card")
        .forEach(card => {

            if(
                category === "all" ||
                card.dataset.category === category
            ){

                card.style.display = "block";

            }else{

                card.style.display = "none";

            }

        });

}


function scrollToMenu(){

    document
        .getElementById("menu")
        .scrollIntoView({
            behavior:"smooth"
        });

}


function showHowItWorks(){

    alert(
        "1. Choose your food\n\n" +
        "2. Add to cart\n\n" +
        "3. Confirm your order\n\n" +
        "4. Get your smart token\n\n" +
        "5. Pick up when ready!"
    );

}


function quickOrder(){

    addToCart(
        "Chicken Biryani",
        90
    );

}


function checkout(){

    if(cart.length === 0){

        alert("Your cart is empty!");

        return;

    }


    alert(
        "Order process will continue in Page 2 🚀"
    );

}


function toggleTheme(){

    document.body.classList.toggle(
