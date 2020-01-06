let img = document.querySelector('img');
let h1 = document.querySelector('h1');
let h2 = document.querySelector('h2');

img.addEventListener('mouseover', function() {
    h1.style.transitionDuration = '1000ms';
    h2.style.transitionDuration = '1000ms';
    h1.style.color = 'rgb(230, 233, 79)';
    h2.style.color = 'rgb(230, 233, 79)';
    img.style.transitionDuration = '1000ms';
    img.style.transform = 'rotate(360deg)';
});

img.addEventListener('mouseout', function() {
    h1.style.transitionDuration = '1000ms';
    h2.style.transitionDuration = '1000ms';
    h1.style.color = 'rgb(157, 49, 230)';
    h2.style.color = 'rgb(157, 49, 230)';
    img.style.transitionDuration = '1000ms';
    img.style.transform = 'rotate(0deg)';
});