import appArray from './app.js';
import { mainMouseOver, mainMouseOut, lineMouseOver, lineMouseOut, pullOpenMenu, closeMenu } from './side-bar-button.js';
import sideBarContent from './panels.js';

const ul = document.querySelector('ul');
let pricesArray = [];

function renderApp(app) {
    const li = document.createElement('li');
    li.classList = app.category;
    li.title = app.name;

    // setup title using the app name in the api
    const h3 = document.createElement('h3');
    h3.textContent = app.name;
    li.appendChild(h3);
    
    // setup the price, and add a dollar sign if it's a number, else say 'FREE'
    const price = document.createElement('p');
    let priceToString;
    if (typeof(app.price) === 'number') {
        priceToString = '$' + app.price.toFixed(2);
    } else {
        priceToString = app.price;
    }
    price.textContent = priceToString;
    pricesArray.push(priceToString);
    price.setAttribute('class', 'price');
    //event listner for price, add to cart
    price.addEventListener('click', firstClick); 
    
    function firstClick() {
        price.textContent = 'GET';
        price.style.backgroundColor = 'green';
        
        price.addEventListener('click', secondClick());
    }
    
    function secondClick() {
        price.addEventListener('click', function() {
            console.log('gotten');
        });
    }
    
    li.appendChild(price);

    
    // setup the image using the relative link stored in the api
    const img = document.createElement('img');
    img.src = app.image;
    li.appendChild(img);

    // setup the description and gave it an id to modify it using css
    const description = document.createElement('p');
    description.textContent = app.description;
    description.setAttribute('id', 'description');
    li.appendChild(description);


    ul.appendChild(li);
}

appArray.forEach((currentApp) => {
    renderApp(currentApp);
});


const sideBarButton = document.getElementById('container');
const lines = document.getElementsByClassName('line');
const nav = document.getElementById('sidebar');
const panels = document.getElementsByClassName('panel');
const exit = document.getElementById('exit');

// imported declared functions from another file, these functions change color of the css
// based on mouseover or mouseout, too complex to do with pure css.
// also the variables/constants connected to the dom must be declared on the page connected to the html

mainMouseOut(sideBarButton, lines);
mainMouseOver(sideBarButton, lines);
lineMouseOver(sideBarButton, lines);
lineMouseOut(sideBarButton, lines);


for (let i = 0; i < sideBarContent.length; i++) {
    let currentAppend = sideBarContent[i];
    let panel = document.createElement('p');
    panel.textContent = currentAppend.title;
    let anchor = document.createElement('a');
    anchor.setAttribute('href', currentAppend.link);
    anchor.classList.add('anchor');
    panel.classList.add('panel');
    anchor.appendChild(panel);
    nav.appendChild(anchor);
    // add separation after side bar content is genereated
    if ((i - 2) % 3 === 0) {
        const divider = document.createElement('div');
        divider.style.width = '200px';
        divider.style.height = '20px';
        divider.style.backgroundColor = 'rgb(109, 120, 134)';
        divider.classList.add('divider');
        nav.appendChild(divider);
    }
}

const divider = document.getElementsByClassName('divider');
pullOpenMenu(sideBarButton, nav, panels, exit);
closeMenu(sideBarButton, nav, panels, exit, divider);

document.addEventListener('click', function(e) {
    let targetElement = e.target;
    do {
        if (targetElement.className === 'price') {
            console.log('clicked inside');
            return;
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);
    let priceTag = document.getElementsByClassName('price');
    for (let i = 0; i < priceTag.length; i++) {
        priceTag[i].style.backgroundColor = 'silver';
        priceTag[i].textContent = pricesArray[i];
    }
});