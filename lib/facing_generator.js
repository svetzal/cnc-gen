const {boreToDepth} = require("./operations/helical");
const {Vector3} = require("./utilities");
const {ToolHead} = require("./tool_head");

function createFacingProgram(writer, settings, commandGenerator, millSize, faceOrigin, surfacingSize, advanceRate) {
    if (advanceRate >= millSize) throw "Advance rate must be smaller than mill tool diameter.";

    let toolStartPosition = new Vector3(faceOrigin.x + surfacingSize.x, faceOrigin.y, 0);

    const toolHead = new ToolHead(writer, settings, commandGenerator, millSize, toolStartPosition);

    let depth = 0 - settings.stepDownRate;
    toolHead.prepare(0);

    boreToDepth(toolHead, millSize * 1.2, depth);

    let extentY = toolStartPosition.y + surfacingSize.y;
    for (let y = toolStartPosition.y; y < extentY + advanceRate; y += advanceRate) {
        if (y > extentY) y = extentY;

        toolHead.cutTo(
            new Vector3(toolStartPosition.x - surfacingSize.x, y, depth),
            y === faceOrigin.y ? settings.firstCutFeedRate : settings.normalCutFeedRate
        );
        if (y < extentY) {
            toolHead.repositionTo(
                new Vector3(
                    toolStartPosition.x,
                    y + advanceRate > extentY ? extentY : y + advanceRate,
                    depth
                )
            );
        }
    }

    toolHead.finish();
}

module.exports = {createFacingProgram};
