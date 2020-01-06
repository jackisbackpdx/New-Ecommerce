import appArray from './app.js';
import { mainMouseOver, mainMouseOut, lineMouseOver, lineMouseOut, pullOpenMenu, closeMenu } from './side-bar-button.js';
import sideBarContent from './panels.js';
import findById from './find-by-ids.js';

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
    price.classList.add('firstprice');
    //event listner for price, add to cart
    price.addEventListener('click', firstClick); 
    
    function firstClick() {
        if (price.style.backgroundColor === 'green') {
            price.textContent = 'WAIT';
            price.style.backgroundColor = 'rgb(179, 180, 89)';
            price.style.width = '53px';
            // dot animation
            let dot = 0;
            const increaseDots = () => {
                setTimeout(function() {
                    if (dot < 3) {
                        price.textContent += '.';
                        dot++;
                        increaseDots();
                    } else {
                        dot = 0;
                        price.textContent = 'WAIT';
                        increaseDots();
                    }
                }, 300);
            };
            increaseDots();
        }
        if (price.textContent === priceToString) {
            price.textContent = 'GET';
            price.style.backgroundColor = 'green';
            price.classList.remove('firstprice');
        }
        // setting the shopping cart if app is added to downloads
        
        if (price.style.backgroundColor === 'rgb(179, 180, 89)') {
            let json = localStorage.getItem('CART');
            let cart;
            if (json) {
                cart = JSON.parse(json);
            } 
            else {
                cart = [];
            }
            
            let downloadItem = findById(cart, app.name);
            
            if (!downloadItem) {
                downloadItem = {
                    name: app.name,
                    img: app.image,
                    size: app.size
                };
                cart.push(downloadItem);
            }
            else {
                return;
            }
            json = JSON.stringify(cart);
            localStorage.setItem('CART', json);
        }
    }
    
    let link = document.createElement('a');
    link.appendChild(price);
    li.appendChild(link);
    
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

// click away event listner

let priceTag = document.getElementsByClassName('price');

const listenForOffOrOnClick = () => {
    document.addEventListener('click', function(e) {
        let targetElement = e.target;
        do {
            if (targetElement.className === 'price') {
                return;
            }
            targetElement = targetElement.parentNode;
        } while (targetElement);
    
        for (let i = 0; i < priceTag.length; i++) {
            let currentTag = priceTag[i];
            let tagText = currentTag.textContent;
            if (tagText === 'WAIT' || tagText === 'WAIT.' || tagText === 'WAIT..' || tagText === 'WAIT...') {
                return;
            } else {
                currentTag.style.backgroundColor = 'silver';
                currentTag.textContent = pricesArray[i];
                currentTag.classList.add('firstprice');
            }
        }
    });
};

listenForOffOrOnClick();