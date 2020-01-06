import appendToMainAndAddHeight from '../downloads-page/commons.js';

const test = QUnit.test;

QUnit.module('appends to main and adds height');

test('Appends correct elements', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const body = document.createElement('body');
    const appender = document.createElement('ul');
    const main = document.createElement('main');

    function eachItem(item) {
        let titleAndImg = document.createElement('div');
    
        let panel = document.createElement('li');
        panel.classList.add('downloads');
    
        let title = document.createElement('h3');
        title.textContent = item.name;
    
        titleAndImg.appendChild(title);
    
        let img = document.createElement('img');
        img.src = item.img;
    
        titleAndImg.appendChild(img);
    
        panel.appendChild(titleAndImg);
        appender.appendChild(panel);
        main.appendChild(appender);
        body.appendChild(main);
    }

    const json = [{
        name: 'Spotify',
        img: '../images/spotify-logo.png',
        size: 33.5
    },
    {
        name: 'Youtube',
        img: '../images/youtube-logo.png',
        size: 43
    }];

    //Act 
    // Call the function you're testing and set the result to a const
    appendToMainAndAddHeight(json, main, eachItem);
    let expected = '<main style="height: 500px;"><ul><li class="downloads"><div><h3>Spotify</h3><img src="../images/spotify-logo.png"></div></li><li class="downloads"><div><h3>Youtube</h3><img src="../images/youtube-logo.png"></div></li></ul></main>';
    let mainString = main.outerHTML;

    //Assert
    // Make assertions about what is expected valid result
    assert.equal(expected, mainString);
});


test('Height is 500px when json length is under 5', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const body = document.createElement('body');
    const appender = document.createElement('ul');
    const main = document.createElement('main');

    function eachItem(item) {
        let titleAndImg = document.createElement('div');
    
        let panel = document.createElement('li');
        panel.classList.add('downloads');
    
        let title = document.createElement('h3');
        title.textContent = item.name;
    
        titleAndImg.appendChild(title);
    
        let img = document.createElement('img');
        img.src = item.img;
    
        titleAndImg.appendChild(img);
    
        panel.appendChild(titleAndImg);
        appender.appendChild(panel);
        main.appendChild(appender);
        body.appendChild(main);
    }

    const json = [{
        name: 'Spotify',
        img: '../images/spotify-logo.png',
        size: 33.5
    },
    {
        name: 'Youtube',
        img: '../images/youtube-logo.png',
        size: 43
    }];

    //Act 
    // Call the function you're testing and set the result to a const
    appendToMainAndAddHeight(json, main, eachItem);
    let expected = '500px';
    let actual = main.style.height;
    //Assert
    // Make assertions about what is expected valid result
    assert.equal(actual, expected);
});

test('Height is 730px when json length 6', function(assert) {
    //Arrange
    // Set up your parameters and expectations
    const body = document.createElement('body');
    const appender = document.createElement('ul');
    const main = document.createElement('main');

    function eachItem(item) {
        let titleAndImg = document.createElement('div');
    
        let panel = document.createElement('li');
        panel.classList.add('downloads');
    
        let title = document.createElement('h3');
        title.textContent = item.name;
    
        titleAndImg.appendChild(title);
    
        let img = document.createElement('img');
        img.src = item.img;
    
        titleAndImg.appendChild(img);
    
        panel.appendChild(titleAndImg);
        appender.appendChild(panel);
        main.appendChild(appender);
        body.appendChild(main);
    }

    const json = [{
        name: 'Spotify',
        img: '../images/spotify-logo.png',
        size: 33.5
    },
    {
        name: 'Youtube',
        img: '../images/youtube-logo.png',
        size: 43
    },
    {},
    {},
    {},
    {}];

    //Act 
    // Call the function you're testing and set the result to a const
    appendToMainAndAddHeight(json, main, eachItem);
    let expected = '730px';
    let actual = main.style.height;
    //Assert
    // Make assertions about what is expected valid result
    assert.equal(actual, expected);
});

