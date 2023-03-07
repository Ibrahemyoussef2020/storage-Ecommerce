const getLocalStorage = JSON.parse(localStorage.getItem("package")) || [];


export function checkIsAdded(name){
    const getLocalStorageLinght = getLocalStorage && getLocalStorage.length;
    const isFind = getLocalStorage.some(itemData => itemData.name == name);  
    return isFind
}

export const productsList = [
    {
        id:'EROREADY-25-1',
        name:'EROREADY SHIRT',
        price:'25',
        src:'product1',
        isAdded:checkIsAdded('EROREADY SHIRT') || false
    },
    {
        id:'WIRELESS-100-2',
        name:'WIRELESS EAIRBOUDS',
        price:'100',
        src:'product2',
        isAdded:checkIsAdded('WIRELESS EAIRBOUDS') || false
    },
    {
        id:'HOOD-45-3',
        name:'HOOD BARKA',
        price:'45',
        src:'product3',
        isAdded:checkIsAdded('HOOD BARKA') || false
    },
    {
        id:'METAL-24-4',
        name:'METAL BOTTLE',
        price:'24',
        src:'product4',
        isAdded:checkIsAdded('METAL BOTTLE') || false
    },
    {
        id:'SILVER-50-5',
        name:'SILVER METAL',
        price:'50',
        src:'product5',
        isAdded:checkIsAdded('SILVER METAL') || false
    },
    {
        id:'BACKHAT-60-6',
        name:'BACKHAT',
        price:'60',
        src:'product6',
        isAdded:checkIsAdded('BACKHAT') || false
    },
]


function showProducts(){
const shopContent = document.querySelector('.shop-content')
productsList.map(product => 
    shopContent.innerHTML += `<div class="product-box" id=${product.id} data-added=${product.isAdded}>
        <img src="images/${product.src}.jpg" alt="shirt">
        <h4>${product.name}</h4>
        <small>$${product.price}</small>
        <span class="add-more add-card-btn ${product.isAdded ? 'inline-add-more': 'none-add-more'}">+<small>.add more</small></span>
        <div class="add-card ">
            <img class="${product.isAdded ? 'remove' : 'add'}-card-btn toggle-card-img click" src="${product.isAdded ? './images/delete-icon.png'  :'./images/bag.png'}"/>
        </div>
    </div>`
)
}
showProducts()







