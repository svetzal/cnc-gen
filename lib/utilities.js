const fs = require('fs');
const {EOL} = require('os');

class Vector {
    constructor(x, y) {
        [this.x, this.y] = [x, y];
    }

    add(v2) {
        return new Vector(this.x += v2.x, this.y += v2.y);
    }
}

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
        return new Vector3(this.x += v3.x, this.y += v3.y, this.z += v3.z);
    }
}

class Writer {
    write(lines) {
        let data;
        if (Array.isArray(lines))
            data = lines;
        else
            data = [lines];

        this.writeData(this.joinLines(data));
    }

    joinLines(lines) {
        return lines.join(EOL);
    }
}

class ConsoleWriter extends Writer {
    writeData(data) {
        console.log(data);
    }
}

class FileWriter extends Writer {
    constructor(filename) {
        super();
        this.filename = filename;
        if (fs.existsSync(filename))
            fs.unlinkSync(filename);
    }

    writeData(data) {
        fs.appendFileSync(this.filename, data + EOL);
    }
}

class SpyWriter extends Writer {
    constructor() {
        super();
        this.capture = "";
    }

    writeData(data) {
        this.capture += data + EOL;
    }
}

module.exports = {Vector, Vector3, Writer, ConsoleWriter, FileWriter, SpyWriter};
