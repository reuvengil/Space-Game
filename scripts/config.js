const defaultConfig = {
    levels: [{
        time: '00:30', n: 1, meteors: [
            { start: '00:05', size: 30, speed: 50 },
            { start: '00:07', size: 50, speed: 40 },
            { start: '00:10', size: 60, speed: 30 },
            { start: '00:16', size: 40, speed: 45 }]
    },
    {
        time: '00:40', n: 2, meteors: [
            { start: '00:05', size: 30, speed: 50 },
            { start: '00:09', size: 40, speed: 45 },
            { start: '00:16', size: 37, speed: 50 }]
    },
    {
        time: '00:40', n: 3, meteors: [
            { start: '00:05', size: 30, speed: 50 },
            { start: '00:06', size: 40, speed: 45 },
            { start: '00:10', size: 50, speed: 40 },
            { start: '00:15', size: 40, speed: 45 },
            { start: '00:20', size: 40, speed: 45 },
            { start: '00:30', size: 40, speed: 45 }]
    },
    {
        time: '01:00', n: 4, meteors: [
            { start: '00:05', size: 30, speed: 50 },
            { start: '00:06', size: 40, speed: 45 },
            { start: '00:07', size: 50, speed: 40 },
            { start: '00:09', size: 40, speed: 45 },
            { start: '00:10', size: 40, speed: 45 },
            { start: '00:13', size: 40, speed: 45 },
            { start: '00:16', size: 40, speed: 45 }]
    },

    ],
    player: {
        size: 50,
        speed: 15,
        life: 5,
    },
    players_imgs: {
        src: [
            'images/ss1.png',
            'images/ss2.png',
            'images/ss3.png',
            'images/ss4.png',
            'images/ss5.png',
            'images/ss6.png',
        ],
        index: 0,
    },
    astroid_imgs: {
        src: [
            'images/astroid1.png',
            'images/astroid2.png',
        ]
    },
    volume: 1,
}

const config = JSON.parse(window.sessionStorage.getItem('config')) || defaultConfig;

function setconfig(config) {
    window.sessionStorage.setItem('config', JSON.stringify(config));
}
function restoreDefault() {
    setconfig(defaultConfig);
    window.location.reload();
}

function incIndex() {
    var index = config.players_imgs.index + 1;
    config.players_imgs.index = index % config.players_imgs.src.length;
    setconfig(config);
}