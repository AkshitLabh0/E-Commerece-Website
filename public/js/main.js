
// Cart Open Close
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};

// Close Cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// DOMContentLoaded Event Listener
document.addEventListener("DOMContentLoaded", () => {
  // Remove item from cart
  var removeCartButtons = document.querySelectorAll(".cart-remove");
  removeCartButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });

  // Quantity Change
  var quantityInputs = document.querySelectorAll(".cart-quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", quantityChanged);
  });

  // Add to Cart
  var addCartButtons = document.querySelectorAll(".add-cart");
  addCartButtons.forEach((button) => {
    button.addEventListener("click", addCartClicked);
  });
    loadCartItems();
});

// Function to Remove Cart Item
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
    updateTotal();
    saveCartItems();
    updatedCartIcon();
}

// Quantity Change
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
    updateTotal();
    saveCartItems();
    updatedCartIcon();

}

// Add to Cart Function
function addCartClicked(event) {
  var button = event.target;
  var shopProduct = button.parentElement;
  var title = shopProduct.querySelector('.product-title').innerText;
  var price = shopProduct.querySelector('.price').innerText;
  var productImg = shopProduct.querySelector('.product-img').src;
  addProductToCart(title, price, productImg);
    updateTotal();
    saveCartItems();
    updatedCartIcon();
    
}

// Add Product to Cart
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");

  // Check if item is already in cart
  var cartItems = document.querySelector(".cart-content");
  var cartItemsTitles = cartItems.querySelectorAll(".cart-product-title");
  for (var i = 0; i < cartItemsTitles.length; i++) {
    if (cartItemsTitles[i].innerText === title) {
      alert("You have already added this item to cart");
      return;
    }
  }

  cartShopBox.innerHTML = `
    <img src="${productImg}" alt="" class="cart-img" />
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity" />
    </div>
    <i class="bx bx-trash-alt cart-remove"></i>`;

  // Append cartShopBox to cartItems
  cartItems.appendChild(cartShopBox);

  // Attach event listeners to new elements
  cartShopBox.querySelector('.cart-remove').addEventListener('click', removeCartItem);
    cartShopBox.querySelector('.cart-quantity').addEventListener('change', quantityChanged);
    saveCartItems();
    updatedCartIcon();
    
}

// Update Total Price
function updateTotal() {
  var cartBoxes = document.querySelectorAll(".cart-box");
  var total = 0;

  cartBoxes.forEach((cartBox) => {
    var priceElement = cartBox.querySelector(".cart-price");
    var quantityElement = cartBox.querySelector(".cart-quantity");
    
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.valueAsNumber;

    if (!isNaN(price) && !isNaN(quantity)) {
      total += price * quantity;
    }
  });

  // Round total to two decimal places
  total = Math.round(total * 100) / 100;

  // Display the total price
    document.querySelector('.total-price').innerText = '$' + total.toFixed(2);
    //save total to localstorage
    localStorage.setItem("cartTotal", total);
}

// Save cart items to localStorage
function saveCartItems() {
  var cartContent = document.querySelector('.cart-content');
  var cartBoxes = cartContent.getElementsByClassName('cart-box');
  var cartItems = [];

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var titleElement = cartBox.querySelector('.cart-product-title');
    var priceElement = cartBox.querySelector('.cart-price');
    var quantityElement = cartBox.querySelector('.cart-quantity');
    var productImg = cartBox.querySelector('.cart-img').src;

    var item = {
      title: titleElement.innerText,
      price: priceElement.innerText,
      quantity: quantityElement.value,
      productImg: productImg
    };

    cartItems.push(item);
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Load cart items from localStorage
function loadCartItems() {
  var cartItems = localStorage.getItem('cartItems');
  if (cartItems) {
    cartItems = JSON.parse(cartItems);
    cartItems.forEach((item) => {
      addProductToCart(item.title, item.price, item.productImg);

      // Set quantity for the last added cart item
      var cartBoxes = document.querySelectorAll(".cart-box");
      var cartBox = cartBoxes[cartBoxes.length - 1];
      var quantityElement = cartBox.querySelector(".cart-quantity");
      quantityElement.value = item.quantity;
    });
  }
}

// Update total price display from localStorage
var cartTotal = localStorage.getItem('cartTotal');
if (cartTotal) {
  document.querySelector('.total-price').innerText = '$' + cartTotal;
}

// Update cart icon based on cart item quantity
function updatedCartIcon() {
  var cartBoxes = document.querySelectorAll('.cart-box');
  var quantity = 0;

  cartBoxes.forEach((cartBox) => {
    var quantityElement = cartBox.querySelector(".cart-quantity");
    quantity += parseInt(quantityElement.value);
  });

  var cartIcon = document.querySelector("#cart-icon");
  cartIcon.setAttribute("data-quantity", quantity);
}

// Call updatedCartIcon to update cart icon initially
updatedCartIcon();


























// //keep item in cart when page refresh with localstorage
// function saveCartItems() {
//     var carContent = document.getElementsByClassName('cart-content')[0];
//     var carBoxes = cartContent.getElementsByClassName('cart-box');
//     var cartItems = [];

//     for (var i = 0; i < cartBoxes.length; i++){
//         cartBox = cartBoxes[i];
//         var titleElement = cartBox.getElementsByClassName('cart-product-title')[0];
//         var priceElement = cart.getElementsByClassName('cart-price')[0];
//         var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
//         var productImg = cartBox.getElementsByClassName('cart-img')[0].src;

//         var item = {
//             title: titleElement.innerText,
//             price: priceElement.innerText,
//             quantity: quantityElement.value,
//             productImg: productImg,
            
//         };
//         cartItems.push(item);

//     }
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
// }

// //loads in cart
// function loadCartItems() {
//     var cartItems = localStorage.getItem('cartItems');
//     if (cartItems) {
//         cartItems = JSON.parse(cartItems);
//         for (var i = 0; i < cartItems.length; i++)
//             var item = cartItems[i];
//         addProductToCart(item.title, item.price, item.productImg);

//         var cartBoxes = document.getElementsByClassName("cart-box");
//         var cartBox = cartBoxes[cartBoxes.length - 1];
//         var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
//         quantityElement.value = item.quantity;

//     }
// }
// var cartTotal = localStorage.getItem('cartTotal');
// if (cartTotal) {
//     document.getElementsByClassName('tottal-price')[0].innerText = "$" + cartTotal;
// }
// updatedCartIcon();


// // quantity in cart icon
// function updatedCartIcon() {
//     var cartBoxes = document.getElementsByClassName('cart-box');
//     var quantity = 0;
// }

// for (var i = 0; i < cartBoxes.length; i++){
//     var cartBoxes = cartBoxes[i];
//     var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
//     quantity += parseInt(quantityElement.value);
// }
// var cartIcon = document.querySelector("#cart-icon");
// cartIcon.setAttribute("data-quantity", quantity);





















// // Cart Open Close
// let cartIcon = document.querySelector("#cart-icon");
// let cart = document.querySelector(".cart");
// let closeCart = document.querySelector("#close-cart");

// // Open Cart
// cartIcon.onclick = () => {
//   cart.classList.add("active");
// };

// // Close Cart
// closeCart.onclick = () => {
//   cart.classList.remove("active");
// };

// // DOMContentLoaded Event Listener
// document.addEventListener("DOMContentLoaded", () => {
//   // Remove item from cart
//   var removeCartButtons = document.getElementsByClassName("cart-remove");
//   for (var i = 0; i < removeCartButtons.length; i++) {
//     var button = removeCartButtons[i];
//     button.addEventListener("click", removeCartItem);
//     }
//     //Quantity Change
//     var quantityInputs = document.getElementsByClassName("cart-quantity");
//      for (var i = 0; i < quantityInputs.length; i++) {
//        var input = quantityInputs[i];
//        input.addEventListener("change", quantityChanged);
//     }
//     //Add to cart 
//     var addCart = document.getElementsByClassName("add-cart");
//      for (var i = 0; i < addCart.length; i++) {
//        var button = addCart[i];
//        button.addEventListener("change", addCartClicked);
//      }
// });

// // Function to Remove Cart Item
// function removeCartItem(event) {
//   var buttonClicked = event.target;
//     buttonClicked.parentElement.remove();
//     updateTotal();
// }

// // Quantity change
// function quantityChanged(event) {
//     var input = event.target;
//     if (isNaN(input.value) || input.value <= 0) {
//         input.value = 1;
//     }
//     updateTotal(); // Call the correct function name: updateTotal() instead of updatedtotal()
// }

// //Add Cart Function
// function addCartClicked(event) {
//     var button = event.target;
//     var shopProducts = button.parentElement;
//     var title = shopProducts.getElementsByClassName('product-title').innerText;
//     var price = shopProducts.getElementsByClassName('price').innerText;
//     var productImg = shopProducts.getElementsByClassName('product-img')[0].src
//     addProductToCart(title, price, productImg);
//     updateTotal();
// }

// function addProductToCart(title, price, productImg) {
//     var cartShopBox = document.createElement("div");
//     cartShopBox.classList.add("cart-box");
//     var cartItems = document.getElementsByClassName("cart-content")[0];
//     var cartItemsNames = cartItems.getElementsByClassNames("cart-product-title");
//     for (var i = 0; i < cartItemsNames.length; i++){
//         if (cartItemsNames[i].innerText == title) {
//             alert("You have already added this item to cart");
//             return;
//         }
//     } 
//     var carBoxcontent = `
//         < img src = "${productImg}" alt = "" class="cart-img" />
//         <div class="detail-box">
//             <div class="cart-product-title">${title}</div>
//             <div class="cart-price">${price}</div>
//             <input
//             type="number"
//             name=""
//             id=""
//             value="1"
//             class="cart-quantity"
//             />
//         </div >
            
//         // <!-- Remove Item -->
//         <i class="bx bx-trash-alt cart-remove"></i> `;
//     cartShopBox.innerHTML = cartBoxContent;
//     cartItems.append(cartShopBox);
//     cartShopBox.getElementsByClassName('cart-remove')[0]
//     .addEventListener('click', removeCartItem);
//     cartShopBox.getElementsByClassName('cart-quantity')[0]
//     .addEventListener('change', quantityChanged);

// }

// // Update total price
// function updateTotal() {
//     var cartBoxes = document.getElementsByClassName("cart-box");
//     var total = 0;

//     for (var i = 0; i < cartBoxes.length; i++) {
//         var cartBox = cartBoxes[i];
//         var priceElement = cartBox.getElementsByClassName("cart-price")[0];
//         var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

//         var price = parseFloat(priceElement.innerText.replace("$", ""));
//         var quantity = quantityElement.valueAsNumber; // Use valueAsNumber to get the numeric value of input

//         if (!isNaN(price) && !isNaN(quantity)) {
//             total += price * quantity;
//         }
//     }
//     //if price contain some cents
//     total = Math.round(total * 100) / 100;

//     // Display the total price
//     document.getElementsByClassName('total-price')[0].innerText = '$' + total.toFixed(2);
// }














































// // //Quantity change
// // function quantityChanged(event) {
// //     var input = event.target;
// //     if (isNaN(input.value) || input.value <= 0) {
// //         input.value = 1;

// //     }
// //     updatedtotal();
// // }
// // //update total
// // function updatetotal() {
// //     var cartContent = document.getElementsByClassName("cart-content")[0];
// //     var cartBoxes = cartContent.getElementsByClassName("cart-box");
// //     var total = 0
// //     for (var i = 0; i < cartBoxes.length; i++){
// //         var cartBox = cartBoxes[i];
// //         var priceElement = cartBox.getElementsByClassName("cart-price")[0];
// //         var quantityElement = cartBox.getElementsByClassName("car-quantity")[0];
// //         var price = parseFloat(priceElement.innerText.replace("$", ""));
// //         var quantity = quantityElement.value;
// //         total += price * quantity;

// //         document.getElementsByClassName('total-price')[0].innerText = '$' + total;
        
// //     }
// // }


















// // // Cart Open Close
// // let cartIcon = document.querySelector('#cart-icon');
// // let cart = document.querySelector(".cart");
// // let closeCart = document.querySelector("#close-cart");
// // // Open Cart
// // cartIcon.onclick = () => {
// //     cart.classList.add("active");
// // };
// // // Close Cart
// // closeCart.onclick = () => {
// //   cart.classList.remove("active");
// // };
// // // Making Add to cart
// // //Cart Working JS
// // if (document.readyState == "loading") {
// //     document.addEventListener("DOMContentLoaded", ready);
// // } else {
// //     ready();
// // }
// // //Making function
// // function ready() {
// //     //remove item from cart
// //     var removeCartButtons = document.getElementByClassName('cart-remove');
// //     for (var i = 0; i < removeCartButtons.length; i++){
// //         var button = removeCartButtons[i];
// //         button.addEventListener("click", removeCartItem);
// //     }
// // }

// // function removeCartItem(event) {
// //     var buttonClicked = event.target;
// //     buttonClicked.parentElement.remove();
// // }
