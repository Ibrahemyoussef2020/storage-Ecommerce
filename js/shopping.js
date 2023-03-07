import {qs,qsA,AddCards} from "./helper.js";
import { productsList,checkIsAdded } from "./productList.js";

////////////////////////////////////
const choosen =  qsA(".card-icon"),
      shopContent = qs(".shop-content"),  
      cardIcon = qs("#card-icon"),
      aside     = qs("aside"),
      productBoxs = qsA(".product-box"),
      addCards   = qsA(".add-card"),
      cardContent = qs(".card-content"),
      totalPrice = qs(".total-price"),
      beforeCalc = qs(".beforeCalc"),
      length     = qs(".length"),

      modal   = qs(".modal"),
      modalClose = qs(".modal-close"),
      modalImg = qs(".modal-img"),
      modalName = qs(".modal-name"),
      modalPrice = qs(".modal-price"),
      modalIsAdded = qs(".modal-isAdded"),
      layOut =  qs(".layOut"),

      buy_button = qs(".buy"),
      test = qs(".test"); 

      let purchasesList = JSON.parse(localStorage.getItem("package"))||[],
          total = totalPrice.innerHTML.slice(1,); 
        
 //////////////////////////////////
 //         toggle aside        //
/////////////////////////////////
cardIcon.addEventListener("click",e=>{
    aside.classList.toggle("move"); 
})
 //////////////////////////////////
 //       close modal           //
/////////////////////////////////
modalClose.addEventListener("click",e=>{
    modal.style.display = 'none'
    layOut.style.display = 'none'  
})
 //////////////////////////////////
//           cereate data       //
/////////////////////////////////
productBoxs.forEach(productBox =>{
    let src   =  qs('img',productBox).src ,            
        name  =  qs('h4',productBox).innerHTML,         
        price =  qs('small',productBox).innerHTML.slice(1,),         
        id    = productBox.id,
        count = 1,
        totalps = +price,
        isAdded = checkIsAdded(productBox.name) ;   

    productBox.onclick = function(e){
        
        if(e.target.classList.contains('add-card-btn')){
            productBox.dataset.added = true
            isAdded = true;
            changeBtnsToRemoveState(this)    
            addCardToPurshes({src, name,price,id, count,totalps,isAdded})
            showPurchases();  
            localStorage.setItem("package",JSON.stringify(purchasesList))
        }   
        else if(e.target.classList.contains('remove-card-btn')){
            productBox.dataset.added = false
            isAdded = false;
            removeFromMainList(e)
            showPurchases()
            localStorage.setItem("package",JSON.stringify(purchasesList))
        }   
        else{
            if(!e.target.classList.contains('click')){

                let addAttr = productBox.getAttribute("data-added");
                let isAdded = addAttr === true.toString() ? true : false;

                modalShow(src,name,price,isAdded)
            }
        }
   }; 
})
////////////////////////////////////
//        add CardTo Purshes      //  
///////////////////////////////////
function addCardToPurshes({src, name,price,id, count,totalps,isAdded}){

    let addProduct = new AddCards(
        src, name,price,id, count,1, totalps,isAdded
    );

    if(purchasesList.length < 1){
        purchasesList.push(addProduct);
    }else{
        purchasesList.forEach((product,i)=>{
            let find = purchasesList.find(product => product.name == name)

            if(find != undefined){  
                if(product.name === name) product.count++;         
            }else{
                purchasesList.push(addProduct); 
            }
    })
  }
}

////////////////////////////////////
//          modal shwo           //  
///////////////////////////////////
function modalShow(src,name,price,isAdded){
    modal.style.display = 'block'
    modalImg.src = src
    modalName.innerHTML = `${name} - `
    modalPrice.innerHTML = price
    modalIsAdded.innerHTML = isAdded ? 'added' : 'didnt add'
    layOut.style.display = 'block'
} 
 //////////////////////////////////
//           show data          //
/////////////////////////////////
function showPurchases(){
    let choosenProduct = "";
    let total = 0;
    purchasesList.forEach(function(product,i){ 
        total += purchasesList[i].totalps * +purchasesList[i].count
        choosenProduct += 
        `<div class="card-box" id="${product.id}" data-added=${product.isAdded}>
            <img src="${purchasesList[i].src}" alt="shirt">
            <div class="details">
                <span class="card-product-title">${purchasesList[i].name}</span>
                <span class="card-product-price">$${purchasesList[i].price}</span>
                <input code="${purchasesList[i].id}" value="${purchasesList[i].count}"   class="center quantity mainCount">
            </div>
            <img class='cancel' src='./images/delete-icon.png'>
        </div>
        `
    });
    cardContent.innerHTML = choosenProduct;
    totalPrice.innerHTML = total ; 
    length.innerHTML = purchasesList.length || "";

};
showPurchases();
 //////////////////////////////////
//           remove data        //
/////////////////////////////////
function removeFromMainList(e){
    let TragetItem = e.target.parentElement.parentElement,
        DeletedItem = purchasesList.filter(product => product.id ==  TragetItem.id)[0],
        Price = +DeletedItem.price;

        purchasesList = purchasesList.filter((p => p.id != DeletedItem.id)); 
        totalPrice.innerHTML = +totalPrice.innerHTML -  Price; 

        changeBtnsToAddState(TragetItem)
}

function removeFromCardList(e){
   let DeletedItem = e.target.parentElement,
    Price = qs('.cancel' , DeletedItem),         
    OrignalObject =  productsList.filter((p => p.id == DeletedItem.id))[0],
    OrignalItem =  qs(`#${OrignalObject.id}`,shopContent);

    purchasesList = purchasesList.filter((p => p.id != DeletedItem.id));
    totalPrice.innerHTML = +totalPrice.innerHTML -  Price; 

    changeBtnsToAddState(OrignalItem); 

    OrignalItem.dataset.added = false
    OrignalObject.isAdded = false 
}

aside.addEventListener("click",e=>{
    removeFromCardList(e)
    showPurchases();
    localStorage.setItem("package",JSON.stringify(purchasesList))

});
 //////////////////////////////////
//     modify toggle buttons    //
/////////////////////////////////

function changeBtnsToRemoveState(parent){
    let removeSrc = './images/delete-icon.png'  ,  
        removeClass = 'remove-card-btn toggle-card-img click';

    qs('.toggle-card-img',parent).src = removeSrc; 
    qs('.toggle-card-img',parent).className = removeClass;
    qs('.add-more',parent).className = 'add-more add-card-btn inline-add-more' ;
}

function changeBtnsToAddState(parent){
    let addSrc  = './images/bag.png' ,
        addClass = 'add-card-btn toggle-card-img click';  

    qs('.toggle-card-img',parent).src = addSrc;
    qs('.toggle-card-img',parent).className = addClass;
    qs('.add-more',parent).className = 'add-more add-card-btn none-add-more' ;   
}


