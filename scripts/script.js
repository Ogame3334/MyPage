function sleep(waitSec, callbackFunc) {
 
    var spanedSec = 0;
   
    var waitFunc = function () {
   
        spanedSec += 0.1;
   
        if (spanedSec >= waitSec) {
            if (callbackFunc) callbackFunc();
            return;
        }
   
        clearTimeout(id);
        id = setTimeout(waitFunc, 100);
    
    };
   
    var id = setTimeout(waitFunc, 100);
   
  }

var menuButtonIsClicked = false;
function menuButtonOnClicked(){
    const linesGetted = document.getElementsByClassName('menu-button-line');
    const lines = [linesGetted.item(0), linesGetted.item(1), linesGetted.item(2)];
    if(menuButtonIsClicked){
        lines[0].style = 'transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 7.14); top: 14.28px; width: calc(var(--header-height) / 14);';
        lines[2].style = 'transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 21.42); top: -14.28px; width: calc(var(--header-height) / 14);';
        setTimeout(()=>{lines[0].style = 'transform: matrix(1, 0, 0, 1, 0, 7.14); top: 14.28px; width: calc(var(--header-height) / 14);'}, 100);
        setTimeout(()=>{lines[2].style = 'transform: matrix(1, 0, 0, 1, 0, 21.42); top: -14.28px; width: calc(var(--header-height) / 14);'}, 100);
        setTimeout(()=>{lines[0].style = 'transform: matrix(1, 0, 0, 1, 0, 7.14); top: 14.28px;';}, 400);
        setTimeout(()=>{lines[1].style = 'transform: matrix(1, 0, 0, 1, 0, 14.28); opacity: 0;';}, 400);
        setTimeout(()=>{lines[2].style = 'transform: matrix(1, 0, 0, 1, 0, 21.42); top: -14.28px;';}, 400);
        setTimeout(()=>{lines[0].style = 'transform: matrix(1, 0, 0, 1, 0, 7.14);'}, 700);
        setTimeout(()=>{lines[1].style = 'transform: matrix(1, 0, 0, 1, 0, 14.28);'}, 700);
        setTimeout(()=>{lines[2].style = 'transform: matrix(1, 0, 0, 1, 0, 21.42);'}, 700);
        menuButtonIsClicked = false;
    }
    else{
        lines[0].style = 'transform: matrix(1, 0, 0, 1, 0, 7.14); top: 14.28px;';
        lines[1].style = 'transform: matrix(1, 0, 0, 1, 0, 14.28); opacity: 0;';
        lines[2].style = 'transform: matrix(1, 0, 0, 1, 0, 21.42); top: -14.28px;';
        setTimeout(()=>{lines[0].style = 'transform: matrix(1, 0, 0, 1, 0, 7.14); top: 14.28px; width: calc(var(--header-height) / 14);'}, 300);
        setTimeout(()=>{lines[2].style = 'transform: matrix(1, 0, 0, 1, 0, 21.42); top: -14.28px; width: calc(var(--header-height) / 14);'}, 300);
        setTimeout(()=>{lines[0].style = 'transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 7.14); top: 14.28px; width: calc(var(--header-height) / 14);'}, 600);
        setTimeout(()=>{lines[2].style = 'transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 21.42); top: -14.28px; width: calc(var(--header-height) / 14);'}, 600);
        setTimeout(()=>{lines[0].style = 'transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 7.14); top: 14.28px;'}, 700);
        setTimeout(()=>{lines[2].style = 'transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 21.42); top: -14.28px;'}, 700);
        menuButtonIsClicked = true;
    }
}

const button = document.getElementById('menu-button');
button.addEventListener('click', menuButtonOnClicked);