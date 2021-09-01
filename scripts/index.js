const getclientheight = function(){
    const B = document.body,
    H = document.documentElement;
    if (typeof document.height !== 'undefined') {
        return document.height; // For webkit browsers
    }
    return Math.max( B.scrollHeight, B.offsetHeight,H.clientHeight, H.scrollHeight, H.offsetHeight );
}
const getclientwidth = function(){
    const B = document.body,
    H = document.documentElement;
    if (typeof document.width !== 'undefined') {
        return document.width; // For webkit browsers
    }
    return Math.max( B.scrollWidth, B.offsetWidth,H.clientWidth, H.scrollWidth, H.offsetWidth );
}

const centerbuttons = ()=>{
    const clientheight = getclientheight(),
    root = document.getElementById('root');
    const mt = (clientheight - root.offsetHeight) / 2;
    root.style.marginTop = `${mt}px`;
}
document.getElementById('playbtn').onclick = function(){
    window.location.href = 'game.html';
}
document.getElementById('settingsbtn').onclick = function(){
    window.location.href = 'settings.html';
}

centerbuttons();
window.onresize = centerbuttons;