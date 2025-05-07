const monitor = document.querySelector(".content");
const mouse = document.querySelector(".mouse");
const mousePad = document.querySelector(".mouse-pad");

var winWidth = window.width;
var winHeight = window.height;
var monWidth = monitor.offsetWidth;
var monHeight = monitor.offsetHeight;
var padWidth = mousePad.offsetWidth;
var padHeight = mousePad.offsetHeight;
var mouseWidth = mouse.offsetWidth;
var mouseHeight = mouse.offsetHeight;
var capX = padWidth - mouseWidth - 1;
var capY = padHeight - mouseHeight - 1;

// If we are in monochrome, add the relevant listeners
function addMonochromeMouseListeners() {
    window.addEventListener("resize", resizeWin);
    monitor.addEventListener("mousemove", moveMouse);
}

function resizeWin() {
    // update window dimensions
    winWidth = window.width;
    winHeight = window.height;

    // udpate monitor dimensions
    monWidth = monitor.offsetWidth;
    monHeight = monitor.offsetHeight;

    // update mousepad dimensions
    padWidth = mousePad.offsetWidth;
    padHeight = mousePad.offsetHeight;

    // update mouse dimensions
    mouseWidth = mouse.offsetWidth;
    mouseHeight = mouse.offsetHeight;

    // update cap width
    const oldCapX = capX;
    const oldCapY = capY;
    capX = padWidth - mouseWidth - 1;
    capY = padHeight - mouseHeight - 1;

    // transform old mouse pos to new 
    let {mouseX, mouseY} = getTranslateXY(mouse);
    let x = (mouseX / oldCapX) * capX;
    let y = (mouseY / oldCapY) * capY;
    mouse.style.transform = `translate(${x}px, ${y}px)`;
}

function getTranslateXY(element) {
    const style = window.getComputedStyle(element)
    const matrix = new DOMMatrixReadOnly(style.transform)
    return {
        translateX: matrix.m41,
        translateY: matrix.m42
    }
}

function moveMouse(e) {
    // transform window cursor position to mouse pad position

    // represent the mouse position in the monitor coordinate system

    // figure out what window x is equivalent to monitor x
    // cannot use offset left because monitor's parent's width != window width at all times
    const monLeftStart = (winWidth - monWidth) / 2;

    // figure out what window y is equivalent to monitor y
    // here we can use the offset top becuase monitor's parent's height === window height at all times
    const monTopStart = monitor.offsetTop;

    const monX = e.clientX - monLeftStart;
    const monY = e.clientY - monTopStart;

    // map the monitor pos to a corresponding mouse pos
    var x = (monX / monWidth) * capX;
    var y = (monY / monHeight) * capY;

    // move mouse to corresponding position
    mouse.style.transform = `translate(${x}px, ${y}px)`;
}

// for some reason it doesn't work on reload unless i do this lol
document.addEventListener('DOMContentLoaded', function() {
    resizeWin();
    checkHomeContent();
}, false);