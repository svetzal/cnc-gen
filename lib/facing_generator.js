const {boreToDepth} = require("./operations/helical");
const {Vector3} = require("./utilities");
const {ToolHead} = require("./tool_head");

function createFacingProgram(writer, settings, commandGenerator, millSize, faceOrigin, surfacingSize, advanceRate) {
    if (advanceRate >= millSize) throw "Advance rate must be smaller than mill tool diameter.";

    let x = faceOrigin.x + surfacingSize.x;
    let y = faceOrigin.y;

    const toolHead = new ToolHead(writer, settings, commandGenerator, millSize, new Vector3(x, y, 0));

    let depth = 0 - settings.stepDownRate;
    toolHead.prepare(0);

    boreToDepth(toolHead, millSize * 1.2, depth);

    for (; y < faceOrigin.y + surfacingSize.y + advanceRate; y += advanceRate) {
        if (y > faceOrigin.y + surfacingSize.y)
            y = faceOrigin.y + surfacingSize.y;

        toolHead.cutTo(
            new Vector3(x - surfacingSize.x, y, depth),
            y === faceOrigin.y ? settings.firstCutFeedRate : settings.normalCutFeedRate
        );
        if (y < faceOrigin.y + surfacingSize.y) {
            let nexty = y + advanceRate > faceOrigin.y + surfacingSize.y
                ? faceOrigin.y + surfacingSize.y
                : y + advanceRate;
            toolHead.repositionTo(new Vector3(x, nexty, depth));
        }
    }

    toolHead.finish();
}

module.exports = {createFacingProgram};
