var wait_after_lose = 3, flag = true;
class Timer {
    /**
    * @param {string} element_id of the root element
    * @param {string} level_id the labal id that show the current level
    * @param {number} vh - virtual height of the browser
    * @param {number} vw - virtual width of the browser
    */
    constructor(element_id, level_id, vh, vw) {
        this.vh = vh;
        this.vw = vw;
        var level = config.levels[0];
        var level_element = document.getElementById(level_id);
        level_element.textContent = `LEVEL ${level.n}`;
        var timer_element = document.getElementById(element_id);
        this.totalSeconds = 0;
        var meteorcfg;
        this.meteors = [];
        this.player = new Player(vh, vw);
        this.life_span = document.getElementById('life');
        this.progress_bar_life = document.getElementById('progress-bar-life');
        this.life_span.style.width = `${this.player.life / 5 * 100}%`;
        this.setLifeSpancolor();
        var tick = setInterval(() => {
            this.player.move();
            this.totalSeconds += 0.125;
            this.meteors.forEach(meteor => {
                if (Point.iftouch(this.player.currentlocation, config.player.size, meteor.currentlocation, meteor.size)) {
                    if (flag) {
                        this.player.element.classList.add('animate-flicker');
                        this.player.life--;
                        this.life_span.style.width = `${this.player.life / 5 * 100}%`;
                        this.setLifeSpancolor()
                        if (this.player.life == 0) {
                            timer_element.textContent = 'game over';
                            this.player.dismiss();
                            this.meteors.forEach(meteor => meteor.dismiss());
                            document.body.style.backgroundImage = "url(images/bg-go.gif)";
                            document.body.style.backgroundSize = `${this.vw}px ${this.vh}px`;

                            clearInterval(tick);
                            setTimeout(() => {
                                window.location.href = 'index.html';
                            }, 5000);
                        }
                        flag = false;
                        setTimeout(() => {
                            this.player.element.classList.remove('animate-flicker');
                            flag = true;
                        }, wait_after_lose * 1000);
                    }
                }
            });
            if (level.meteors.length != 0) {
                meteorcfg = level.meteors.shift();
                if (meteorcfg.start == this.getTimestring()) {
                    this.meteors.push(new Meteor(this.vh, this.vw, meteorcfg.speed, meteorcfg.size, this.player));
                } else {
                    level.meteors.unshift(meteorcfg)
                }
            }
            if (level.time == this.getTimestring()) {
                this.meteors.forEach(meteor => meteor.dismiss());

                timer_element.textContent = "00:00";
                if (level.n == config.levels.length) {
                    this.player.dismiss();
                    timer_element.textContent = 'course clear';
                    document.body.style.backgroundImage = "url(images/bg-mp.gif)";
                    document.body.style.backgroundSize = `${this.vw}px ${this.vh}px`;
                    setInterval(() => { window.location.href = './index.html' }, 5000);
                    clearInterval(tick);
                    return;
                }
                level = config.levels[level.n];
                level_element.textContent = `LEVEL ${level.n}`;
                this.totalSeconds = 0;
                this.meteors = [];
            } else if (this.totalSeconds % 1 == 0) {
                timer_element.textContent = this.getTimestring();
            }
        }, 125);
    }
    getTimestring() {
        var pad = (val) => {
            var valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
            } else {
                return valString;
            }
        }
        return `${Timer.pad(parseInt(this.totalSeconds / 60))}:${Timer.pad(this.totalSeconds % 60)}`;
    }
    setLifeSpancolor() {
        switch (this.player.life) {
            case 1:
                this.progress_bar_life.className = 'progress-bar red stripes';
                break;
            case 2:
                this.progress_bar_life.className = 'progress-bar red stripes';
                break;
            case 3:
                this.progress_bar_life.className = 'progress-bar yellow stripes';
                break;
            case 4:
                this.progress_bar_life.className = 'progress-bar green stripes';
                break;
            case 5:
                this.progress_bar_life.className = 'progress-bar green stripes';
                break;
        }
    }

    /**
    * @param {number} vh - virtual height of the browser
    */
    setvh(vh) {
        this.vh = vh;
        this.player.setvh(vh);
        this.meteors.forEach(meteor => {
            meteor.setvh(vh);
        });
    }

    /**
    * @param {number} vw - virtual width of the browser
    */
    setvw(vw) {
        this.vw = vw;
        this.player.setvw(vw);
        this.meteors.forEach(meteor => {
            meteor.setvw(vw);
        });
    }
}