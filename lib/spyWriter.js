const { EOL } = require("os");
const {Writer} = require("./writer");

class SpyWriter extends Writer {
    constructor() {
        super();
        this.capture = "";
    }

    writeData(data) {
        this.capture += data + EOL;
    }
}

module.exports = {SpyWriter};