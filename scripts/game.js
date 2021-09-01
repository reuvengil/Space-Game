var goback = document.getElementById('goback');
goback.src = 'icons/arrow.svg'
goback.addEventListener('click', function () {
    window.location.href = './index.html';
});
var vw, vh;
var timer;
const updateViewPortWidthAndHeight = function () {
    vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    if (timer) {
        timer.setvh(vh);
        timer.setvw(vw);
    }
}
updateViewPortWidthAndHeight();
timer = new Timer('timer', 'level', vh, vw);
window.onresize = updateViewPortWidthAndHeight;