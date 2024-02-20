const cartBtn = document.querySelector(".cartbtn")
const cartPage = document.querySelector(".cart-section")
const closeCartBtn = document.querySelector(".close-cart")
const productContainer = document.querySelector(".product-container")
const cartContainer = document.querySelector(".product-section")
const totalCost = document.querySelector(".total-cost")
const cartQuantity = document.querySelector(".cart-quantity")
let productArray = []
let cartArray = []
let total=0;


async function getData(){
  const data = await  fetch('https://dummyjson.com/products')
  const response = await data.json()
  productArray = response.products
  console.log(productArray)
  displayProducts(productArray)
}

getData()

function displayProducts(data){
    let clutter = ''
    Array.from(data).forEach(element => {
        clutter+=`<div class="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
          <img class="object-cover" src="${element.images[0]}" alt="product image" />
          <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
        </a>
        <div class="mt-4 px-5 pb-5">
          <a href="#">
            <h5 class="text-xl tracking-tight text-slate-900">${element.title}</h5>
          </a>
          <div class="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span class="text-3xl font-bold text-slate-900">$${element.price}</span>
            </p>
          </div>
          <button  id=${element.id} class="add-cart flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to cart</button
          >
        </div>
      </div>`
    });


    productContainer.innerHTML=clutter

}

productContainer.addEventListener("click",(e)=>{
  if(e.target.classList.contains("add-cart")){
    let productId = parseInt(e.target.id);
    let selectedProduct = productArray.find(product => product.id === productId);
    let hasobj =cartArray.filter(pro=>pro.id===productId)
    console.log("hello world : ",hasobj,selectedProduct)
      if (selectedProduct && hasobj.length==0) {
        // Add the selected product to the cartArray
        cartArray.push({...selectedProduct,item:1});
        // console.log('Product added to cart:', selectedProduct);
        displayCartProducts(cartArray)
        showCartQuantity()
        calculateTotalCost()
      }
  }

})

cartContainer.addEventListener("click",(e)=>{
  if(e.target.classList.contains("delete")){
    let productId = parseInt(e.target.id);
    let selectedProduct = productArray.find(product => product.id === productId);
      if (selectedProduct) {
        // Add the selected product to the cartArray
        cartArray=cartArray.filter(product=>product.id!=productId)
        cartContainer.innerHTML=""
        displayCartProducts(cartArray)
        showCartQuantity()
        calculateTotalCost()
      }
  }
})

function displayCartProducts(data){
  let clutter = ""
  data.forEach(ele=>{
    clutter+=`
    <div class="card w-full md:w-96 flex justify-between items-center bg-zinc-800 my-3">
      <div class="img w-20 h-20 md:w-30 md:h-30">
        <img class="w-full h-full object-cover" src="${ele.images[0]}" alt="">
      </div>
      <div class="detail">
        <h1>${ele.title}</h1>
        <p>$${ele.price}</p>
      </div>
      <div class="control flex flex-col justify-between gap-2">
        <button id="${ele.id}" class="delete px-2 py-1 bg-red-600 flex justify-center items-center">delete</button>
        <div class="c flex justify-center items-center">
          <button onclick="decreament(${ele.id})" class="increament px-3 bg-zinc-400 h-[30px] flex justify-center items-center text-red-400 font-bold">-</button>
          <span class="counter px-3 bg-zinc-400 h-[30px] flex justify-center items-center font-bold">${ele.item}</span>
          <button onclick="increament(${ele.id})" class="decreament px-3 bg-zinc-400 h-[30px] flex justify-center items-center text-green-300 font-bold">+</button>
        </div>
      </div>
    </div>
    `
  })

  cartContainer.innerHTML=clutter
}

function cartModalToggle(){
        cartBtn.addEventListener("click",()=>{
            cartPage.classList.remove("-translate-y-full")
        })
        closeCartBtn.addEventListener("click",()=>{
            cartPage.classList.add("-translate-y-full")
})
}

cartModalToggle()

function increament(id){
    let productId = id
    let selectedProduct = cartArray.find(pro=>pro.id===id)
    selectedProduct.item+=1
    displayCartProducts(cartArray)
    calculateTotalCost()
}

function decreament(id){
  let productId = id
  let selectedProduct = cartArray.find(pro=>pro.id===id)
  selectedProduct.item-=1
  if(selectedProduct.item<=0){
    cartArray = cartArray.filter(pro=>pro.id!=productId)
    showCartQuantity()
  }
  displayCartProducts(cartArray)
  calculateTotalCost()
}

function calculateTotalCost(){
  total=0
  for(let i=0;i<cartArray.length;i++){
    total+=cartArray[i].item*cartArray[i].price
  }
  displayTotalCost(total)
}

function displayTotalCost(total){
  totalCost.innerHTML=total
}

function showCartQuantity(){
  cartQuantity.textContent=cartArray.length
}
showCartQuantity()