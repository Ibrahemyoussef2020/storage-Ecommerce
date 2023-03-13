import {useSelector,useSelectors,AddCards} from "./helper.js";
import { productsList,checkIsAdded } from "./productList.js";

////////////////////////////////////
const choosen =  useSelectors(".card-icon"),
      shopContent = useSelector(".shop-content"),  
      cardIcon = useSelector("#card-icon"),
      aside     = useSelector("aside"),
      productBoxs = useSelectors(".product-box"),
      addCards   = useSelectors(".add-card"),
      cardContent = useSelector(".card-content"),
      totalPrice = useSelector(".total-price"),
      beforeCalc = useSelector(".beforeCalc"),
      length     = useSelector(".length"),

      modal   = useSelector(".modal"),
      modalClose = useSelector(".modal-close"),
      modalImg = useSelector(".modal-img"),
      modalName = useSelector(".modal-name"),
      modalprice = useSelector(".modal-price"),
      modalIsAdded = useSelector(".modal-isAdded"),
      layOut =  useSelector(".layOut"),

      buy_button = useSelector(".buy"),
      test = useSelector(".test"); 

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
    let src   =  useSelector('img',productBox).src ,            
        name  =  useSelector('h4',productBox).innerHTML,         
        price =  useSelector('small',productBox).innerHTML.slice(1,),         
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

                const addAttr = productBox.getAttribute("data-added"),
                 isAdded = addAttr === true.toString() ? true : false;

                modalShow(src,name,price,isAdded)
            }
        }
   }; 
})
////////////////////////////////////
//        add CardTo Purshes      //  
///////////////////////////////////
function addCardToPurshes({src, name,price,id, count,totalps,isAdded}){

    const addProduct = new AddCards(
        src, name,price,id, count,1, totalps,isAdded
    );

    if(purchasesList.length < 1){
        purchasesList.push(addProduct);
    }else{
        purchasesList.forEach((product,i)=>{
            const find = purchasesList.find(product => product.id == id)

            if(find != undefined){  
                if(product.id === id) product.count++;         
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
    modalName.textContent =`${name} - `
    modalprice.textContent = price
    modalIsAdded.textContent = isAdded ? 'added' : 'didnt add'
    layOut.style.display = 'block'
} 
 //////////////////////////////////
//           show data          //
/////////////////////////////////
function showPurchases(){
    let choosenProduct = "";
    let total = 0;
    purchasesList.forEach(function(product,i){ 
        total += product.totalps * +product.count
        choosenProduct += 
        `<div class="card-box" id="${product.id}" data-added=${product.isAdded}>
            <img src="${product.src}" alt="shirt">
            <div class="details">
                <span class="card-product-title">${product.name}</span>
                <span class="card-product-price">$${product.price}</span>
                <input code="${product.id}" value="${product.count}"   class="center quantity mainCount">
            </div>
            <img class='cancel' src='./images/delete-icon.png'>
        </div>
        `
    });
    cardContent.innerHTML = choosenProduct;
    totalPrice.textContent = total; 
    length.textContent = purchasesList.length || 0;

};
showPurchases();
 //////////////////////////////////
//           remove data        //
/////////////////////////////////
function removeFromMainList(e){
    const tragetItem = e.target.parentElement.parentElement,
        deletedItem = purchasesList.filter(product => product.id ==  tragetItem.id)[0],
        price = +deletedItem.price;

        purchasesList = purchasesList.filter((p => p.id != deletedItem.id)); 
        totalPrice.textContent = +totalPrice.textContent -  price; 

        changeBtnsToAddState(tragetItem)
}

function removeFromCardList(e){
   const deletedItem = e.target.parentElement,
    price = useSelector('.cancel' , deletedItem),         
    orignalObject =  productsList.filter((p => p.id == deletedItem.id))[0],
    orignalItem =  useSelector(`#${orignalObject.id}`,shopContent);

    purchasesList = purchasesList.filter((p => p.id != deletedItem.id));
    totalPrice.textContent = +totalPrice.textContent -  price;  

    changeBtnsToAddState(orignalItem); 

    orignalItem.dataset.added = false
    orignalObject.isAdded = false 
}

aside.addEventListener("click",e =>{
    if(e.target.classList.contains('cancel')){
        removeFromCardList(e)
        showPurchases();
        localStorage.setItem("package",JSON.stringify(purchasesList))    
    }
});
 //////////////////////////////////
//     modify toggle buttons    //
/////////////////////////////////

function changeBtnsToRemoveState(parent){
    const removeSrc = './images/delete-icon.png'  ,  
        removeClass = 'remove-card-btn toggle-card-img click';

    useSelector('.toggle-card-img',parent).src = removeSrc; 
    useSelector('.toggle-card-img',parent).className = removeClass;
    useSelector('.add-more',parent).className = 'add-more add-card-btn inline-add-more' ;
}

function changeBtnsToAddState(parent){
    const addSrc  = './images/bag.png' ,
        addClass = 'add-card-btn toggle-card-img click';  

    useSelector('.toggle-card-img',parent).src = addSrc;
    useSelector('.toggle-card-img',parent).className = addClass;
    useSelector('.add-more',parent).className = 'add-more add-card-btn none-add-more' ;   
}


