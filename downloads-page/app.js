import appendToMainAndAddHeight from './commons.js';

const cart = localStorage.getItem('CART');
const listAppender = document.querySelector('ul');
let json = JSON.parse(cart);
let downloadBackDrop = document.querySelector('main');
downloadBackDrop.style.height = '500px';
let listItems = [];
let newPara = document.createElement('p');

if (!json) {
    newPara.textContent = 'Nothing in Downloads';
    newPara.classList.add('empty');
    downloadBackDrop.appendChild(newPara);
}

function eachItem(item, i) {
    let titleAndImg = document.createElement('div');

    let panel = document.createElement('li');
    panel.classList.add('downloads');
    let id = `item ${i}`;
    panel.setAttribute('id', id);

    let title = document.createElement('h3');
    title.textContent = item.name;

    titleAndImg.appendChild(title);

    let img = document.createElement('img');
    img.src = item.img;

    titleAndImg.appendChild(img);

    panel.appendChild(titleAndImg);

    const insideBar = document.createElement('div');
    insideBar.setAttribute('id', 'inside-bar');
    const outsideBar = document.createElement('div');
    outsideBar.setAttribute('id', 'outside-bar');

    insideBar.style.width = '300px';

    const percentage = document.createElement('p');
    percentage.style.marginLeft = '10px';

    panel.appendChild(insideBar);
    panel.appendChild(outsideBar);
    panel.appendChild(percentage);

    listAppender.appendChild(panel);
    // setup and execution of mock loading bar
    let size = item.size;
    let counter = 0;
    let increment = 55 / size;

    const widthIncrement = increment * 3;

    let width = 0;
    outsideBar.style.width = width + 'px';

    function shrinkDownload() {
        panel.style.transitionDuration = '900ms';
        panel.style.border = 'none';
        panel.style.height = '0px';
        panel.textContent = '';
        panel.style.margin = 'none';
        panel.style.padding = 'none';
        panel.style.width = '489px';
    }
    function increaseWidth() {
        setTimeout(function() {
            if (counter < 100) {
                counter += increment;
                width += widthIncrement;
                outsideBar.style.transitionDuration = '200ms';
                outsideBar.style.width = width + 'px';
                if (counter < 100) {
                    percentage.textContent = counter.toFixed(2) + '%';
                    increaseWidth();
                }
                if (width > 300) {
                    outsideBar.style.width = '300px';
                }
            }
            if (counter > 100) {
                percentage.textContent = '100%';
            }
            if (percentage.textContent === '100%') {
                shrinkDownload();
                setTimeout(function() {
                    listItems.pop(panel);
                    panel.remove();
                    addFinishedToLocalStorage(item);
                    let backDropHeight = parseInt(downloadBackDrop.style.height);
                    if (backDropHeight > 500) {
                        backDropHeight -= 115;
                        downloadBackDrop.style.height = backDropHeight + 'px';
                    }
                    localStorage.removeItem('CART');
                }, 900);
            }
            if (listItems.length === 0) {
                console.log('empty');
                newPara.textContent = 'Nothing in Downloads';
                newPara.classList.add('empty');
                downloadBackDrop.appendChild(newPara);
            }
            console.log('yuh');
        }, 100);    
    }
    increaseWidth();
    listItems.push(panel);
}

function addFinishedToLocalStorage(item) {
    let json = localStorage.getItem('FINISHED');
    let finished;
    if (json) {
        finished = JSON.parse(json);
    } else {
        finished = [];

    }

    let finishedItem = {
        name: item.name,
        finished: true
    };

    finished.push(finishedItem);
    
    json = JSON.stringify(finished);
    localStorage.setItem('FINISHED', json);
}

if (json) {
    appendToMainAndAddHeight(json, downloadBackDrop, eachItem, listItems);
} 
////////////////////////////////////////////////////////////////////////////////////////
const sideBarButton = document.getElementById('container');
const lines = document.getElementsByClassName('line');
const nav = document.getElementById('sidebar');
const panels = document.getElementsByClassName('panel');
const exit = document.getElementById('exit');
import { mainMouseOut, mainMouseOver, lineMouseOver, lineMouseOut, pullOpenMenu, closeMenu } from '../store/side-bar-button.js';
import sideBarContent from '../store/panels.js';
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
        divider.style.backgroundColor = 'rgba(192, 192, 192, 0.164);';
        divider.classList.add('divider');
        nav.appendChild(divider);
    }
}

const divider = document.getElementsByClassName('divider');
pullOpenMenu(sideBarButton, nav, panels, exit);
closeMenu(sideBarButton, nav, panels, exit, divider);