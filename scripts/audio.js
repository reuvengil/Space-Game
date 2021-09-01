var audio = new Audio("music/time_and_space.mp3"); //or you can get it with getelementbyid
audio.addEventListener('canplay', async function () {
    const premit_music = document.createElement('img');
    premit_music.src = 'icons/volume-up-fill.svg';
    premit_music.style.position = 'absolute';
    premit_music.style.cursor = 'pointer';
    premit_music.style.right = '0';
    premit_music.style.top = '0';
    premit_music.style.width = '50px';
    premit_music.style.height = '50px';
    premit_music.style.margin = '0px';
    premit_music.style.zIndex = '3';
    premit_music.addEventListener('click', async function () {
        if (premit_music.src.includes('icons/volume-mute-fill.svg')) {
            premit_music.src = 'icons/volume-up-fill.svg'
            await play()
            audio.muted = false;
        } else {
            premit_music.src = 'icons/volume-mute-fill.svg';
            audio.muted = true;
        }
    });
    document.body.appendChild(premit_music);
    try {
        await play();
    } catch (error) {
        //browser no support autoplay
        premit_music.src = 'icons/volume-mute-fill.svg';
    }
});
async function play() {
    audio.loop = true;
    audio.volume = config.volume;
    await audio.play();
}