const { Vector3 } = require("./utilities");
const { slot } = require("./operations/slot");
const { ToolHead } = require("./tool_head");

function createSlotProgram(
    writer,
    settings,
    commandGenerator,
    millSize,
    position,
    horizontal,
    length,
    depth
) {
    const toolStartPosition = horizontal
        ? new Vector3(position.x - length / 2, position.y, position.z)
        : new Vector3(position.x, position.y - length / 2, position.z);
    const toolHead = new ToolHead(
        writer,
        settings,
        commandGenerator,
        millSize,
        toolStartPosition
    );

    toolHead.prepare(0);
    slot(toolHead, horizontal, length, depth);
    toolHead.finish();
}

module.exports = { createSlotProgram };
