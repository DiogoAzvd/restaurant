let currentItem = 0;
let numberOfItems = 2;
let animationTimer;

const leftPattern = [];
const zIndexList = [];

for (let i = 0; i < numberOfItems; i++) {
    leftPattern.push(i == 0 ? numberOfItems - 1 : i - 1);
    zIndexList.push(i == 0 ? i : numberOfItems - i)
}

function setItemIndex(direction) { 
    if (direction == "right") {
        for (let i = 0; i < numberOfItems; i++) {
            let item = itemId(i);
            item.style.zIndex = zIndexList[i];
        }
      
        currentItem = (currentItem + 1) % numberOfItems;
    }
    
    else {
        for (let i = 0, j = numberOfItems; j > 0; i++, j--) {
            let item = itemId(i);
            item.style.zIndex = zIndexList[j % numberOfItems];
        } 
      
        currentItem = leftPattern[currentItem];
    }
    
    animationTimer = setTimeout(() => {
        animate("right");
    }, 7000);
}

function animateItem(direction) {
    let item = itemId(0);
    let nextItem;

    let circle = document.getElementById("currentItem" + currentItem);
    let nextCircle;
    
    let title = document.getElementById("salesDescriptionTitle" + currentItem); 
    let nextTitle;

    let text = document.getElementById("salesDescriptionText" + currentItem);
    let nextText;

    if (direction == "right") {    
        nextItem = itemId(1);
        nextCircle = document.getElementById("currentItem" + ((currentItem + 1) % numberOfItems));
        nextTitle = document.getElementById("salesDescriptionTitle" + ((currentItem + 1) % numberOfItems));
        nextText = document.getElementById("salesDescriptionText" + ((currentItem + 1) % numberOfItems));
    }

    else {
        nextItem = itemId(leftPattern[currentItem] - currentItem);
        nextCircle = document.getElementById("currentItem" + leftPattern[currentItem]);
        nextTitle = document.getElementById("salesDescriptionTitle" + leftPattern[currentItem]);
        nextText = document.getElementById("salesDescriptionText" + leftPattern[currentItem]);
    }
  
    item.style.opacity = 0;
    nextItem.style.opacity = 1;

    circle.style.backgroundColor = "transparent";
    nextCircle.style.backgroundColor = "#fff";  
    
    title.style.opacity = "0";
    nextTitle.style.opacity = "1";

    text.style.opacity = "0";
    nextText.style.opacity = "1";
}

function itemId(number) {
    let item = document.getElementById("item" + (currentItem + number) % numberOfItems);
    return item;
}

function onClickAnimate(direction) {
    clearTimeout(animationTimer);
    clearTimeout(animationStart);
    animate(direction);   
}

function animate(direction) {
    animateItem(direction);
    setItemIndex(direction);
}

let animationStart = setTimeout(() => animate("right"), 7000);