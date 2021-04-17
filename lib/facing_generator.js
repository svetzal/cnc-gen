const {helical} = require("./operations/helical");
const {parallel} = require('./operations/parallel');
const {Vector3} = require("./utilities");
const {ToolHead} = require("./tool_head");

function createFacingProgram(writer, settings, commandGenerator, millSize, faceOrigin, surfacingSize, advanceRate) {
    if (advanceRate >= millSize) throw "Advance rate must be smaller than mill tool diameter.";

    let toolStartPosition = new Vector3(faceOrigin.x + surfacingSize.x, faceOrigin.y, 0);

    const toolHead = new ToolHead(writer, settings, commandGenerator, millSize, toolStartPosition);

    let depth = 0 - settings.stepDownRate;
    toolHead.prepare(0);

    helical(
        toolHead,
        millSize * 1.2,  // TODO: magic number
        depth);

    parallel(
        toolHead,
        faceOrigin,
        toolStartPosition,
        surfacingSize,
        depth,
        advanceRate,
        settings.firstCutFeedRate,
        settings.normalCutFeedRate
    );

    toolHead.finish();
}

module.exports = {createFacingProgram};
