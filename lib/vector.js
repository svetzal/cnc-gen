class Vector {
    constructor(x, y) {
        [this.x, this.y] = [x, y];
    }

    add(v2) {
        return new Vector((this.x += v2.x), (this.y += v2.y));
    }
}

module.exports = { Vector };