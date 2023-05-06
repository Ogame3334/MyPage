"use strict";
function sleep(waitSec, callbackFunc) {
    var spanedSec = 0;
    var waitFunc = function () {
        spanedSec += 0.1;
        if (spanedSec >= waitSec) {
            if (callbackFunc)
                callbackFunc();
            return;
        }
        clearTimeout(id);
        id = setTimeout(waitFunc, 100);
    };
    var id = setTimeout(waitFunc, 100);
}
var menuButtonIsClicked = false;
function menuButtonOnClicked() {
    const linesGetted = document.getElementsByClassName('menu-button-line');
    const lines = [linesGetted.item(0), linesGetted.item(1), linesGetted.item(2)];
    const line_height = getComputedStyle(lines[0]).height;
    const line_width = getComputedStyle(lines[0]).width;
    if (menuButtonIsClicked) {
        lines[0].style.width = line_height;
        lines[2].style.width = line_height;
        setTimeout(() => { lines[0].style.transform = 'matrix(1, 0, 0, 1, 0, 7.14)'; }, 100);
        setTimeout(() => { lines[2].style.transform = 'matrix(1, 0, 0, 1, 0, 21.42)'; }, 100);
        setTimeout(() => { lines[0].style.width = line_width; }, 400);
        setTimeout(() => { lines[2].style.width = line_width; }, 400);
        setTimeout(() => { lines[0].style.top = '0'; }, 700);
        setTimeout(() => { lines[1].style.opacity = '1'; }, 700);
        setTimeout(() => { lines[2].style.top = '0'; }, 700);
        menuButtonIsClicked = false;
    }
    else {
        lines[0].style.top = '14.28px';
        lines[1].style.opacity = '0';
        lines[2].style.top = '-14.28px';
        setTimeout(() => { lines[0].style.width = line_height; }, 300);
        setTimeout(() => { lines[2].style.width = line_height; }, 300);
        setTimeout(() => { lines[0].style.transform = 'matrix(0.71, 0.71, -0.71, 0.71, 0, 7.14)'; }, 600);
        setTimeout(() => { lines[2].style.transform = 'matrix(0.71, -0.71, 0.71, 0.71, 0, 21.42)'; }, 600);
        setTimeout(() => { lines[0].style.width = line_width; }, 700);
        setTimeout(() => { lines[2].style.width = line_width; }, 700);
        menuButtonIsClicked = true;
    }
}
const button = document.getElementById('menu-button');
button.addEventListener('click', menuButtonOnClicked);
window.addEventListener('resize', () => {
    const header = document.getElementById('header');
    const header_height = getComputedStyle(header).height;
    const main = document.getElementById('main');
    main.style.top = header_height;
});
