const productList = document.getElementById("product-list");
const cartDiv = document.getElementById("cart-div");
const orderDiv = document.querySelector(".order-review");
const cartCount = document.querySelector("#cart-count");

let productArray = [];
let cartArray = JSON.parse(localStorage.getItem("cart")) || [];

async function getList() {
  try {
    const data = await fetch("data.json");
    let productData = await data.json();

    productArray = productData;

    localStorage.setItem("items", JSON.stringify(productData));

    displayItems();

    console.log(productData);
  } catch (err) {
    ("unable to fetch data");
  }
}
getList();

const displayItems = () => {
  productList.innerHTML = "";

  productArray.forEach((item) => {
    let cartItem = cartArray.find((cart) => cart.name === item.name);

    productList.innerHTML += `<div class="productList">
        
        <div class="product-img-btn">
        <img class="product-image" src="${item.image.desktop}" alt="${item.name}"/>
        

        ${
          cartItem
            ? `
                <div class="qty-btn">
                <button onclick="decreaseQty('${item.name}')">-</button>
                <span>${cartItem.quantity}</span>
                <button onclick="increaseQty('${item.name}')">+</button>
                </div>
                `
            : `
                <button id="addItem-btn" onclick="addItem('${item.name}')">
                <img src="assets/images/icon-add-to-cart.svg" alt="cart icon">
                <span>Add to Cart</span></button>
                  `
        }

        </div>

        <div class="text-area">
        <p>${item.category}</p>
        <h3>${item.name}</h3>
        <p style= color:red>$${item.price}</p>
        </div>
        
        </div>`;
  });
  console.log(productArray);

  displayCart();
  totalCartCount();
};

function addItem(name) {
  // let newItem = productArray[index];

  let product = productArray.find((product) => product.name === name);

  let cartItem = cartArray.find((cart) => cart.name === name);

  if (!cartItem) {
    cartArray.push({
      ...product,
      quantity: 1,
    });
  } else {
    cartItem.quantity++;
  }

  localStorage.setItem("cart", JSON.stringify(cartArray));
  totalCartCount();
  displayItems();

  displayCart();
  console.log(cartArray);
}

function increaseQty(name) {
  let item = cartArray.find((cart) => cart.name === name);

  if (item) {
    item.quantity++;
  }

  localStorage.setItem("cart", JSON.stringify(cartArray));
  totalCartCount();
  displayItems();
  displayCart();
}

function decreaseQty(name) {
  let index = cartArray.findIndex((cart) => cart.name === name);

  if (index !== -1) {
    cartArray[index].quantity--;

    if (cartArray[index].quantity <= 0) {
      cartArray.splice(index, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cartArray));
  totalCartCount();
  displayItems();
  displayCart();
}

function removeItem(name) {
  cartArray = cartArray.filter((item) => item.name !== name);

  localStorage.setItem("cart", JSON.stringify(cartArray));
  totalCartCount();
  displayItems();
  displayCart();

  console.log(cartArray);
}

function totalCartCount() {
  const totalQty = cartArray.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  cartCount.innerHTML = `(${totalQty})`;

  console.log(totalQty);
}

const displayCart = () => {
  cartDiv.innerHTML = "";

  let orderTotal = 0;

  for (let index = 0; index < cartArray.length; index++) {
    const item = cartArray[index];

    const itemTotal = item.price * item.quantity;

    orderTotal += itemTotal;

    cartDiv.innerHTML += `
        <div class="cart-item">
            <div class="cart-item-head">
        
                <p>${item.name}</p>

                <button class="remove-btn" onclick="removeItem('${item.name}')"> 

                    <img src="assets/images/icon-remove-item.svg" alt="">
                </button>

            </div>
        
            <div class="cart-details"> 
        
                <span class="qty">${item.quantity}x</span>

                <span>@$${item.price}</span>
                <span>${itemTotal}</span>
            </div>

            <hr>
        
        </div>`;
  }

  if (cartArray.length > 0) {
    cartDiv.innerHTML += `
        <div class="order-summary">

            <div class="order-total">
                <span>Order Total</span>
                <strong>$${orderTotal.toFixed(2)}</strong>
            </div>

            <div class="delivery">
                <img class="delivery-img" width="20px" height="20px" src="assets/images/icon-carbon-neutral.svg" alt="">
                <p>This is a <span>carbon-neutral</span> delivery</p>
            </div>


            <button onclick="reviewOrder()" class="confirm-order-btn" command="show-modal" commandfor="dialog" class="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20">
                Confirm Order
            </button>

        </div>
        `;
  } else {
    cartDiv.innerHTML = `<div class="empty-cart"> 
            <img src="assets/images/illustration-empty-cart.svg" alt="">
            <p>Your added items will appear here</p>
        </div>`;
  }
};

const reviewOrder = () => {
  const order = JSON.parse(localStorage.getItem("cart"));

  orderDiv.innerHTML = "";

  let total = 0;

  order.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    orderDiv.innerHTML += `
            <div class="review-section">

                
                <img src="${item.image.thumbnail}" alt="${item.name}">
                <div class="review-item">
                    <div class = "item-info">
                        <p>${item.name}</p>

                        <div class="item-details">
                            <span>${item.quantity}x</span>
                            <span>@ $${item.price}</span>
                        </div>
                    </div>

                    
                        <strong>$${itemTotal.toFixed(2)}</strong>
                </div>
                 
            </div>
            <hr>  

        `;
  });

  orderDiv.innerHTML += `
     <div class="review-total">
                    <p>Order Total</p>
                    <strong>$${total.toFixed(2)}</strong>
                </div>`;
};

function newOrder() {
  cartArray = [];
  localStorage.removeItem("cart");
  totalCartCount();
  displayItems();
  displayCart();
}

// for (let index = 0; index < array.length; index++) {
//     const element = array[index];

// }
// const displayCart = () =>{

// }

// addEventListener.cart-btn("click", addItem)

// let iconCart = document.querySelector(".icon-cart");
// let body = document.querySelector("body");
// let closeCart = document.querySelector("#close");

// iconCart.addEventListener("click", ()=>{
//     body.classList.toggle("showCart")
// })

// closeCart.addEventListener("click", ()=>{
//     body.classList.toggle("showCart")
// })

// tailwind modal component
// tailwimd plus eelement, dialog
// tailwindcss.com
// cdand tailwind css plus
// copy sciot from both and tailwind css plus
