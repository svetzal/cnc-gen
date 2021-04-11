class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class ConsoleWriter {
    writeLine(line) {
        console.log(line);
    }

    write(lines) {
        if (Array.isArray(lines))
            lines.map(this.writeLine);
        else
            this.writeLine(lines);
    }
}

module.exports = {Vector, ConsoleWriter};
