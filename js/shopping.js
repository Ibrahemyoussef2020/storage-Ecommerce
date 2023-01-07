import {qs,qsA,AddCards} from "./helper.js";
////////////////////////////////////
const choosen =  qsA(".cart-icon"),
      cartIcon = qs("#cart-icon"),
      aside     = qs("aside"),
      addCards   = qsA(".add-cart"),
      cartContent = qs(".cart-content"),
      totalPrice = qs(".total-price"),
      beforeCalc = qs(".beforeCalc"),
      length     = qs(".length"),
      buy_button = qs(".buy"),
      test = qs(".test");      
let productsArr = JSON.parse(localStorage.getItem("package"))||[],
    total = totalPrice.innerHTML.slice(1,); 
 //////////////////////////////////
 //           aside             //
/////////////////////////////////
cartIcon.addEventListener("click",e=>{
    aside.classList.toggle("move"); 
})
 //////////////////////////////////
//           cereate data       //
/////////////////////////////////
addCards.forEach(addCard =>{

    let src   = addCard.parentElement.children[0].src,
        name  = addCard.parentElement.children[1].innerHTML, 
        price = addCard.previousElementSibling.innerHTML.slice(1,),
        id    = (Date.now() + Math.random()) - +price,
        count = 1,
        totalps = +price;

    addCard.onclick = function(){

        let addProduct = new AddCards(
            src,
            name,
            price,
            id,
            count,
            1,
            totalps,
        );
        if(productsArr.length < 1){
            productsArr.push(addProduct);
        }else{
        productsArr.forEach((product,i)=>{
            let find = productsArr.find(product => product.name == name)

            if(find != undefined){
               
                if(product.name === name) product.count++;
                
            }else{
                productsArr.push(addProduct); 
            }
        })
      }
      showProducts();  
      localStorage.setItem("package",JSON.stringify(productsArr))          
   }; 
});
 //////////////////////////////////
//           show data          //
/////////////////////////////////
function showProducts(){
    let choosenProduct = "";
    let total = 0;
    productsArr.forEach(function(product,i){ 

        total += productsArr[i].totalps * +productsArr[i].count
        choosenProduct += 
        `<div class="cart-box" code="${productsArr[i].id}" >
            <img src="${productsArr[i].src}" alt="shirt">
            <div class="details">
                <span class="cart-product-title">${productsArr[i].name}</span>
                <span class="cart-product-price">$${productsArr[i].price}</span>
                <input code="${productsArr[i].id}" value="${productsArr[i].count}"   class="center quantity mainCount">
            </div>
            <i class='bx bxs-trash-alt cancel'></i>
        </div>
        `
    });
    cartContent.innerHTML = choosenProduct;
    totalPrice.innerHTML = total ; 
    length.innerHTML = productsArr.length || "";
};
showProducts();
 //////////////////////////////////
//           remove data        //
/////////////////////////////////
aside.addEventListener("click",e=>{
    if(e.target.classList.contains("cancel")){
       let DeletedItem = e.target.parentElement.getAttribute("code");
       let Pric  = e.target.previousElementSibling.children[1].innerHTML.slice(1,) * +e.target.previousElementSibling.children[2].value
       productsArr = productsArr.filter((p => p.id != DeletedItem ));
        localStorage.setItem("package" , JSON.stringify(productsArr));      
        totalPrice.innerHTML = +totalPrice.innerHTML -  Pric; 
       showProducts();     
    }
});
