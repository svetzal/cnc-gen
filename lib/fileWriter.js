const fs = require("fs");
const { EOL } = require("os");
const {Writer} = require("./writer");

class FileWriter extends Writer {
    constructor(filename) {
        super();
        this.filename = filename;
        if (fs.existsSync(filename)) fs.unlinkSync(filename);
    }

    writeData(data) {
        fs.appendFileSync(this.filename, data + EOL);
    }
}

module.exports = {FileWriter};