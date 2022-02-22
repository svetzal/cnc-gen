const { helical } = require("./operations/helical");
const { parallel } = require("./operations/parallel");
const { Vector3 } = require("./utilities");
const { ToolHead } = require("./tool_head");

function cutToDepth(
    toolHead,
    millSize,
    depth,
    faceOrigin,
    toolStartPosition,
    surfacingSize,
    advanceRate,
    settings
) {
    toolHead.comment(`Boring to depth ${depth}`);
    helical(
        toolHead,
        millSize * 1.2, // TODO: magic number
        depth
    );

    toolHead.comment(
        `Cutting face ${surfacingSize.x}x${surfacingSize.y}x${depth}`
    );
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
}

function createFacingProgram(
    writer,
    settings,
    commandGenerator,
    millSize,
    faceOrigin,
    surfacingSize,
    targetDepth,
    advanceRate
) {
    if (advanceRate >= millSize)
        throw "Advance rate must be smaller than mill tool diameter.";

    const toolStartPosition = new Vector3(
        faceOrigin.x + surfacingSize.x,
        faceOrigin.y,
        0
    );

    const toolHead = new ToolHead(
        writer,
        settings,
        commandGenerator,
        millSize,
        toolStartPosition
    );

    toolHead.prepare(0);

    if (targetDepth <= settings.stepDownRate) {
        toolHead.comment(
            `Single step-down facing operation to depth ${targetDepth}`
        );
        cutToDepth(
            toolHead,
            millSize,
            targetDepth,
            faceOrigin,
            toolStartPosition,
            surfacingSize,
            advanceRate,
            settings
        );
    } else {
        toolHead.comment(
            `Multiple step-down facing operation to depth ${targetDepth}`
        );
        for (
            let step = settings.stepDownRate;
            step <= targetDepth;
            step += settings.stepDownRate
        ) {
            toolHead.comment(`Stepdown ${step}`);
            cutToDepth(
                toolHead,
                millSize,
                step,
                faceOrigin,
                toolStartPosition.setZ(step - settings.stepDownRate),
                surfacingSize,
                advanceRate,
                settings
            );
            toolHead.repositionTo(toolStartPosition.setZ(-step));
        }
        if ((targetDepth / settings.stepDownRate) % 1 > 0) {
            let startZ =
                Math.floor(targetDepth / settings.stepDownRate) *
                settings.stepDownRate;
            toolHead.comment(
                `Stepdown finishing pass ${startZ} to ${targetDepth}`
            );
            cutToDepth(
                toolHead,
                millSize,
                targetDepth,
                faceOrigin,
                toolStartPosition.setZ(-startZ),
                surfacingSize,
                advanceRate,
                settings
            );
        }
    }

    toolHead.finish();
}

module.exports = { createFacingProgram };
