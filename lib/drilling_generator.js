const {helical} = require("./operations/helical");

function createDrillingProgram(toolHead, diameter, depth) {
    toolHead.prepare(0);
    helical(toolHead, diameter, depth);
    toolHead.finish();
}

module.exports = {createDrillingProgram};
