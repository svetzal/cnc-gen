const {helical} = require("./operations/helical");
const {ToolHead} = require('./tool_head');

function createDrillingProgram(writer, settings, commandGenerator, millSize, position, diameter, depth) {
    const toolHead = new ToolHead(writer, settings, commandGenerator, millSize, position);

    toolHead.prepare(0);
    helical(toolHead, diameter, depth);
    toolHead.finish();
}

module.exports = {createDrillingProgram};
