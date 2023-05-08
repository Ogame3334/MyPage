"use strict";
function init() {
    // const window_innerWidth: number = window.innerWidth;
    // const window_innerHeight: number = window.innerHeight;
    // const root: HTMLElement = document.querySelector(':root')! as HTMLElement;
    // root.style.setProperty("--display-width", window_innerWidth.toString());
    // root.style.setProperty("--display-height", window_innerHeight.toString());
    // document.documentElement.style.setProperty('--display-width', window_innerWidth.toString());
    const header = document.getElementById('header');
    const header_height = getComputedStyle(header).height;
    const main = document.getElementById('main');
    main.style.top = header_height;
}
function startUpAnim() {
    const square_left = document.getElementById('start-up-square-left');
    const square_right = document.getElementById('start-up-square-right');
    const background = document.getElementById('start-up-back');
    function state_0() {
        square_left.style.top = 'calc(50% - 50px)';
        square_left.style.left = 'calc(30% - 50px)';
        square_left.style.width = '100px';
        square_left.style.height = '100px';
        square_left.style.transform = 'rotate(720deg)';
        square_right.style.top = 'calc(50% - 50px)';
        square_right.style.left = 'calc(70% - 50px)';
        square_right.style.width = '100px';
        square_right.style.height = '100px';
        square_right.style.transform = 'rotate(765deg)';
    }
    function state_1() {
        square_left.style.left = 'calc(50% - 50px)';
        square_right.style.left = 'calc(50% - 50px)';
    }
    function state_2() {
        square_left.style.transition = '1.5s';
        square_right.style.transition = '1.5s';
        square_left.style.transform = 'rotate(1080deg)';
        square_right.style.transform = 'rotate(1215deg)';
        square_left.style.outlineColor = '#00ff00';
        square_right.style.outlineColor = '#00ff00';
    }
    function state_3() {
        square_left.style.transition = '2s';
        square_right.style.transition = '2s';
        square_left.style.scale = '1.5';
        square_right.style.scale = '1.5';
        square_left.style.opacity = '0';
        square_right.style.opacity = '0';
        background.style.opacity = '0';
    }
    setTimeout(state_0, 1);
    setTimeout(state_1, 1701);
    setTimeout(state_2, 3401);
    setTimeout(state_3, 4901);
    setTimeout(() => {
        const start_up = document.getElementById('start-up');
        start_up.remove();
    }, 7000);
    // square_left.classList.add('start-up-square-anim-0-class');
    // setTimeout(() => {square_left.classList.remove('start-up-square-anim-0-class'); square_left.classList.add('start-up-square-anim-1-class')}, 1000);
}
var menuButtonIsClicked = false;
var canClickMenuButton = true;
function menuButtonOnClicked() {
    if (canClickMenuButton) {
        canClickMenuButton = false;
        const linesGetted = document.getElementsByClassName('menu-button-line');
        const lines = [linesGetted.item(0), linesGetted.item(1), linesGetted.item(2)];
        const line_height = getComputedStyle(lines[0]).height;
        const line_width = getComputedStyle(lines[0]).width;
        const header_subtitle = document.getElementById('header-subtitle');
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
            header_subtitle.style.top = '30px';
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
            header_subtitle.style.top = '100px';
            menuButtonIsClicked = true;
        }
        setTimeout(() => { canClickMenuButton = true; }, 1000);
    }
}
function onAccess() {
    const param = window.location.search;
    if (/\?anim=false/.exec(param)) {
        const start_up = document.getElementById('start-up');
        start_up.remove();
        return;
    }
    const sessionKey = 'ogamemidorikawa';
    const sessionValue = 'true';
    //sessionStorageにsessionKeyというデータの有無を判別
    if (sessionStorage.getItem(sessionKey) != sessionValue) {
        startUpAnim();
        //sessionStorageにデータを追加
        sessionStorage.setItem(sessionKey, sessionValue);
    }
    else {
        const start_up = document.getElementById('start-up');
        start_up.remove();
    }
}
// 読み込み時に実行↓
const button = document.getElementById('menu-button');
button.addEventListener('click', menuButtonOnClicked);
window.addEventListener('resize', init);
onAccess();
