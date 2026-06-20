const productList = document.getElementById("product-list");
const cartDiv = document.getElementById("cart");

const cartStorage = JSON.parse(localStorage.getItem("cart"))

let productArray = [];
let cartArray = [];


async function getList(){
    try{
        const data = await fetch("data.json")
        let productData = await data.json();

        productArray = productData

        localStorage.setItem("items",JSON.stringify(productData))

        displayItems()

        console.log(productData);
    }
    catch(err){
        "unable to fetch data";
    }
}
getList()

const displayItems = () =>{
    productList.innerHTML = "";

    productArray.forEach((item)=>{

    productList.innerHTML += `<div class="productList">
        
    <div class="product-img-btn">
    <img class="product-image" src="${item.image.desktop}" alt="${item.name}"/>
    </div>

    <div>
        <button onclick="addItem()">    
        <img src="/product-list-with-cart-main/assets/images/icon-add-to-cart.svg" alt="cart icon">
        <span>Add to Cart</span></button>
        <p>${item.category}</p>
        <h3>${item.name}</h3>
        <p style= color:red>$${item.price}</p>
    </div>
    </div>
    `
    })
 console.log(productArray)
}

function addItem(){
    const existingItem = cartArray.filter(
    item => item.id === productId
);

    existingItem.length > 0
        ? existingItem[0].qty++
        : cartArray.push({
          ...productArray.filter(
              item => item.id === productId
          )[0],
          qty: 1
      });
}








// tailwind modal component
// tailwimd plus eelement, dialog
// tailwindcss.com
// cdand tailwind css plus
// copy sciot from both and tailwind css plus