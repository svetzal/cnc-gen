const fs = require('fs');
const { EOL } = require('os');

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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

module.exports = {Vector, ConsoleWriter, FileWriter};
