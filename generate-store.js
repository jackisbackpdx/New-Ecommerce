import appArray from './app.js';

const ul = document.querySelector('ul');

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
    price.setAttribute('id', 'price');
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




function changeCurrency(price) {

}


