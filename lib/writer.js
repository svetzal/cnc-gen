const { EOL } = require("os");

class Writer {
    write(lines) {
        let data;
        if (Array.isArray(lines)) data = lines;
        else data = [lines];

        this.writeData(this.joinLines(data));
    }

    joinLines(lines) {
        return lines.join(EOL);
    }
}

module.exports = {Writer};