const {Vector} = require("./utilities");
const {ToolHead} = require("./tool_head");

function createFacingProgram(writer, settings, commandGenerator, millSize, origin, surfacingSize, advanceRate) {
    let x = origin.x + surfacingSize.x;
    let y = origin.y;

    const toolHead = new ToolHead(writer, settings, commandGenerator, "cnc-gen facing", millSize, new Vector(x, y));

    let depth = 0 - settings.stepDownRate;
    toolHead.prepare(depth);

    for (; y <= origin.y + surfacingSize.y; y += advanceRate) {
        toolHead.cutTo(
            x - surfacingSize.x,
            y,
            depth,
            y == origin.y ? settings.firstCutFeedRate : settings.normalCutFeedRate
        );
        if (y + advanceRate <= origin.y + surfacingSize.y)
            toolHead.repositionTo(x, y + advanceRate, depth);
    }

    toolHead.finish();
}

module.exports = {createFacingProgram};
