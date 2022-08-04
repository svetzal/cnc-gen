class Vector3 {
    constructor(x, y, z) {
        [this.x, this.y, this.z] = [x, y, z];
    }

    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    setZ(z) {
        return new Vector3(this.x, this.y, z);
    }

    add(v3) {
        return new Vector3(
            (this.x += v3.x),
            (this.y += v3.y),
            (this.z += v3.z)
        );
    }
}

module.exports = {Vector3};