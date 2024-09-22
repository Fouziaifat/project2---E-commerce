let cart = [];
let cartBadge = document.querySelector(".cart-badge");
let cartPopup = document.querySelector("#cart-popup");
let cartItem = document.querySelector("#cart-items");
let total = document.querySelector("#total-price");
let closeCart = document.querySelector(".close-cart")

function addTocard (item ,price, image){
    const foundItem = cart.find((cartItem) =>cartItem.name === item)
    if(foundItem){
        foundItem.quantity += 1
    } else {
        cart.push({name: item, price: price, quantity: 1, image: image})
    }
    updateCartItem()
   updateCartBbadge() 
}
function updateCartBbadge(){
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)
    cartBadge.textContent = totalQuantity
    console.log(cart);   
};


closeCart.addEventListener('click', function(){
    alert ("Cart is closing");
    window.location.href = '/';
})


function toggleCart(){
 cartPopup.classList.toggle("show-cart")
}

function updateCartItem() {
    cartItem.innerHTML = "" ;
    cart.forEach((item, index) => {
        const itemCart = document.createElement("div");
        itemCart.classList.add("cart-item-card");
        itemCart.innerHTML = `
        <img src="${item.image}" alt=${item.name} class="cart-item-image">
        <div class="cart-item-details">
              <h3>${item.name}</h3>
              <div class="cart-quantity-control">
                <button class="qty-btn" onClick="updateQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onClick="updateQuantity(${index}, 1)">+</button>
              </div>
              <p>Price: $${item.price.toFixed(2)}</p>
              <p>Total: $${(item.quantity * item.price).toFixed(2)}</p>
              <button class="remove-btn" onClick="removeItem(${index})">Remove</button>
    </div>
        `
        cartItem.appendChild(itemCart);
    })
    updateTotalPrice()

}
function removeItem(index){
    cart.splice(index, 1)
    updateCartItem();
    updateCartBbadge()

}
function updateQuantity(index, change){
    cart[index].quantity += change
    if(cart[index].quantity <= 0){
        removeItem(index)
    }
    else{
        updateCartItem()
    }
}
function updateTotalPrice(){
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    total.textContent = totalPrice.toFixed(2);
}