const {Writer} = require('./writer');

class ConsoleWriter extends Writer {
    writeData(data) {
        console.log(data);
    }
}

module.exports = {ConsoleWriter};