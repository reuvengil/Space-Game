class Point {
    /**
    * @param {number} x In the x-axis - right style
    * @param {number} y In the y-axis - top style
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @param {Point} point the point we want to add
    */
    increment(point) {
        this.x += point.x;
        this.y += point.y;
    }
    /**
    * @param {number} vh - virtual height of the browser
    * @param {number} vw - virtual width of the browser
    * @param {Player} player that in the game
    */
    static getRandomPointOnScreen(vh, vw, size, player) {
        var x = Math.floor((Math.random() * vh)) - size;
        if (x < 0) {
            x += size;
        }
        var y = Math.floor((Math.random() * vw)) - size;
        if (y < 0) {
            y += size;
        }
        var ran_point = new Point(x, y);
        if (player && this.iftouch(ran_point, size, player.currentlocation, player.size)) {
            return this.getRandomPointOnScreen(vh, vw, player);
        }
        return new Point(x, y);
    }
    /**
     *@param {Point}  a point of element a
    * @param {number} size_a size of elemnt a
    * @param {Point} b point of element b
    * @param {number} size_b size of element b
    */
    static iftouch(a, size_a, b, size_b) {
        var is_in_the_box = function (box_point, box_size, external_point) {
            return (box_point.x <= external_point.x && external_point.x <= box_point.x + box_size) &&
                (box_point.y <= external_point.y && external_point.y <= box_point.y + box_size)
        }
        var ax = new Point(a.x + size_a, a.y),
            bx = new Point(b.x + size_b, b.y);
        return is_in_the_box(a, size_a, b) || is_in_the_box(b, size_b, a) || is_in_the_box(b, size_b, ax) || is_in_the_box(a, size_a, bx);
    }
}