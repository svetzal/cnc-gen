const fs = require("fs");
const {Writer} = require("./writer");

module.exports = class FileWriter extends Writer {
    constructor(filename) {
        super();
        this.filename = filename;
        if (fs.existsSync(filename)) fs.unlinkSync(filename);
    }

    writeData(data) {
        fs.appendFileSync(this.filename, data + EOL);
    }
}