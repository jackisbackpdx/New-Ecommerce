function mainMouseOver(sideBarButton, lines) {
    sideBarButton.addEventListener('mouseover', function(e) {
        
        e.target.style.backgroundColor = 'white';
        for (let i = 0; i < lines.length; i++) {
            lines[i].style.backgroundColor = 'black';
        }
    });
}

function mainMouseOut(sideBarButton, lines) {
    sideBarButton.addEventListener('mouseout', function(e) {

        e.target.style.backgroundColor = 'black';
        for (let i = 0; i < lines.length; i++) {
            lines[i].style.backgroundColor = 'white';
        }
    });
}

function lineMouseOver(sideBarButton, lines) {
    for (let i = 0; i < lines.length; i++) {

        lines[i].addEventListener('mouseover', function(e) {
            e.target.style.backgroundColor = 'black';
            sideBarButton.style.backgroundColor = 'white';
        });
    }
}

function lineMouseOut(sideBarButton, lines) {
    for (let i = 0; i < lines.length; i++) {
        lines[i].addEventListener('mouseout', function(e) {
            e.target.style.backgroundColor = 'white';
            sideBarButton.style.backgroundColor = 'black';
        });
    }
}

function pullOpenMenu(sideBarButton, sideBar, panels, exit) {
    sideBarButton.addEventListener('click', function() {
        // make sidebar width increase from nothing, by increasing width
        sideBarButton.style.transitionDuration = '500ms';
        sideBarButton.style.transform = 'rotate(90deg) scale(0.0)';
        sideBar.style.width = '200px';
        sideBar.style.transition = 'width 1000ms';
        // show exit button 
        exit.style.display = 'initial';

        for (let i = 0; i < panels.length; i++) {
            panels[i].style.display = 'flex';
            panels[i].style.width = '185px';
            panels[i].style.transition = 'width 1000ms';
        }
    });
}

function closeMenu(sideBarButton, sideBar, panels, exit, divider) {
    exit.addEventListener('click', function() {
        sideBarButton.style.transitionDuration = '1000ms';
        sideBarButton.style.transform = 'rotate(0deg) scale(1.0)';
        sideBar.style.width = '0px';
        sideBar.style.transition = 'width 1000ms';
        // show exit button 
        exit.style.display = 'none';
        // remove panels
        for (let i = 0; i < panels.length; i++) {
            panels[i].style.display = 'none';
            panels[i].style.width = '0px';
            panels[i].style.transition = 'width 1000ms';
        }
        // remove dividers
        for (let i = 0; i < divider.length; i++) {
            let bar = divider[i];
            bar.style.width = '0px';
        }
    }); 
}


export { mainMouseOut, mainMouseOver, lineMouseOver, lineMouseOut, pullOpenMenu, closeMenu };