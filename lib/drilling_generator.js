const {ToolHead} = require('./tool_head');
function createDrillingProgram(writer, settings, commandGenerator, millSize, position, diameter, advanceRate) {
    const toolHead = new ToolHead(writer, settings, commandGenerator, "cnc-gen drilling", millSize, position);

    toolHead.prepare(0);
    toolHead.drillDepth(diameter, 1);
    toolHead.finish();
}

module.exports = {createDrillingProgram};
