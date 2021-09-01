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
var updateuibyconfig = function(){
    var volume = document.getElementById('volume');
    volume.value = config.volume *100;
    
    volume.addEventListener('change',()=>{
        audio.volume = config.volume =volume.value/100;
        setconfig(config)
    });

    var life = document.getElementById('life'),
    lifetext = document.getElementById('lifetext');
    life.value = config.player.life;
    lifetext.innerText = `player life: ${config.player.life}`;
    life.addEventListener('change',()=>{
        config.player.life = parseInt(life.value)+1;
        lifetext.innerText = `player life: ${config.player.life}`;
        setconfig(config)
    });
    var img = document.getElementById('playerview');
    img.src = config.players_imgs.src[config.players_imgs.index];
    img.addEventListener('click',()=>{
        incIndex();
        img.src = config.players_imgs.src[config.players_imgs.index];
    });

    document.getElementById('goback').addEventListener('click',()=>{
        window.location.href='index.html';
    });
    document.getElementById('restoredefault').addEventListener('click',()=>{
        restoreDefault();
    });
}

centerbuttons();
updateuibyconfig()
window.onresize = centerbuttons;