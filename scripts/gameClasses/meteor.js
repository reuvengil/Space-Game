var id = 0;
class Meteor {
    /**
     * @param {number} vh - virtual height of the browser
     * @param {number} vw - virtual width of the browser
     * @param {number} speed of the meteor
     * @param {number} size of the meteor
     * @param {Player} player that in the game
     */
    constructor(vh, vw, speed, size, player) {
        this.element = document.createElement('img');
        this.element.className = 'meteor';
        this.element.setAttribute('id', `meteor${id}`);
        this.element.style.width = `${size}px`;
        this.element.style.height = `${size}px`;
        this.element.src = `${config.astroid_imgs.src[Math.round(Math.random())]}`
        id = id + 1;
        document.body.appendChild(this.element);
        this.size = size;
        this.player = player;
        var point = Point.getRandomPointOnScreen(vw, vh, size, this.player);
        this.currentlocation = point;
        this.element.style.right = `${this.currentlocation.x}px`;
        this.element.style.top = `${this.currentlocation.y}px`;
        this.vh = vh;
        this.vw = vw;
        this.speed = speed;
        this.direction = new Point(speed, -speed);
        setInterval(() => {
            this.currentlocation.increment(this.direction);
            if (this.currentlocation.x + size >= this.vw) {
                this.currentlocation.x = this.vw - size;
                this.direction.x = -this.direction.x;
            }
            if (this.currentlocation.y + size >= this.vh) {
                this.currentlocation.y = this.vh - size;
                this.direction.y = -this.direction.y;
            }
            if (this.currentlocation.x <= 0) {
                this.currentlocation.x = 0;
                this.direction.x = -this.direction.x;
            }
            if (this.currentlocation.y <= 0) {
                this.currentlocation.y = 0;
                this.direction.y = -this.direction.y;
            }
            this.element.style.right = `${this.currentlocation.x}px`;
            this.element.style.top = `${this.currentlocation.y}px`;
        }, 125);
    }

    /**
    * @param {number} vh - virtual height of the browser
    */
    setvh(vh) {
        this.vh = vh;
        this.currentlocation = Point.getRandomPointOnScreen(this.vw, this.vh, this.size, this.player);
        this.direction = new Point(this.speed, -this.speed);
        this.element.style.right = `${this.currentlocation.x}px`;
        this.element.style.top = `${this.currentlocation.y}px`;
    }

    /**
    * @param {number} vw - virtual width of the browser
    */
    setvw(vw) {
        this.vw = vw;
        this.currentlocation = Point.getRandomPointOnScreen(this.vw, this.vh, this.size, this.player);
        this.direction = new Point(this.speed, -this.speed);
        this.element.style.right = `${this.currentlocation.x}px`;
        this.element.style.top = `${this.currentlocation.y}px`;
    }

    dismiss() {
        this.element.remove();
    }
}