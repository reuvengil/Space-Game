class Player {
    /**
    * @param {number} vh - virtual height of the browser
    * @param {number} vw - virtual width of the browser
    */
    constructor(vh, vw) {
        this.element = document.createElement('img');
        this.element.className = 'player';
        this.element.setAttribute('id', 'player');
        this.element.style.width = `${config.player.size}px`;
        this.element.style.height = `${config.player.size}px`;
        this.element.src = config.players_imgs.src[config.players_imgs.index];
        document.body.appendChild(this.element);
        var point = Point.getRandomPointOnScreen(vw, vh, config.player.size);
        this.currentlocation = point;
        this.element.style.right = `${this.currentlocation.x}px`;
        this.element.style.top = `${this.currentlocation.y}px`;
        this.vh = vh;
        this.vw = vw;
        this.life = config.player.life;
        this.map = {};
        const playerMove = async (e) => {
            e = e || event;
            this.map[e.code] = e.type == 'keydown';
            if (this.map['ArrowLeft']) {
                this.currentlocation.increment(new Point(config.player.speed, 0));
            }
            if (this.map['ArrowUp']) {
                this.currentlocation.increment(new Point(0, -config.player.speed));
            }
            if (this.map['ArrowRight']) {
                this.currentlocation.increment(new Point(-config.player.speed, 0));
            }
            if (this.map['ArrowDown']) {
                this.currentlocation.increment(new Point(0, config.player.speed));
            }
            //sleep 25 milliseconds
            await new Promise(resolve => setTimeout(resolve, 25));
        };
        document.body.addEventListener('keydown', playerMove);
        document.body.addEventListener('keyup', playerMove);
        this.move = () => {
            if (this.currentlocation.x + config.player.size >= this.vw) {
                this.currentlocation.x = this.vw - config.player.size;
            }
            if (this.currentlocation.y + config.player.size >= this.vh) {
                this.currentlocation.y = this.vh - config.player.size;
            }
            if (this.currentlocation.x <= 0) {
                this.currentlocation.x = 0;
            }
            if (this.currentlocation.y <= 0) {
                this.currentlocation.y = 0;
            }
            this.element.style.right = `${this.currentlocation.x}px`;
            this.element.style.top = `${this.currentlocation.y}px`;
        }
    }
    /**
    * @param {number} vh - virtual height of the browser
    */
    setvh(vh) {
        this.vh = vh;
        this.currentlocation = Point.getRandomPointOnScreen(this.vw, this.vh, config.player.size);
        this.move()
    }

    /**
    * @param {number} vw - virtual width of the browser
    */
    setvw(vw) {
        this.vw = vw;
        this.currentlocation = Point.getRandomPointOnScreen(this.vw, this.vh, config.player.size);
        this.move()
    }
    dismiss() {
        this.element.remove();
    }
}