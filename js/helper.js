export function qs(element , parent = document){
    return parent.querySelector(element)
}

export function qsA(element , parent = document){
    return [...parent.querySelectorAll(element)]
}

export var AddCards = class{
    constructor(src,name,price,id,count,value,totalps,isAdded=false){
        this.src = src;
        this.name  = name;
        this.price = price;
        this.id = id;
        this.count  = count;
        this.value = value;
        this.totalps = totalps;
        this.isAdded = isAdded 
    }    
}

