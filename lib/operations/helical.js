const {Vector3} = require("../utilities");

function boreToDepth(toolHead, diameter, depth) {
    const segmentQuantity = 16;

    // This might be easier if we can do arcs in gcode?
    // https://www.cnccookbook.com/cnc-g-code-arc-circle-g02-g03/

    if (diameter < toolHead.millSize) throw "Unable to drill a hole smaller than the end mill diameter"
    if (diameter > toolHead.millSize * 2) throw "Unable to drill a clean hole larger than twice the end mill diameter"

    let helixRadius = diameter / 2 - toolHead.millSize / 2;
    let origin = toolHead.position.clone();
    let start = origin.z;

    toolHead.cutTo(
        new Vector3(origin.x - helixRadius, origin.y, start),
        toolHead.settings.stepDownFeedRate
    );

    for (; start > depth; start -= toolHead.settings.helicalStepDownRate) {
        const remainingStepdown = (-depth - -start) < toolHead.settings.helicalStepDownRate
            ? -depth - -start
            : toolHead.settings.helicalStepDownRate;

        for (let i = 1 / segmentQuantity; i <= 1.0; i += 1 / segmentQuantity) {
            let radians = i * 2 * Math.PI;
            toolHead.cutTo(
                new Vector3(
                    origin.x - helixRadius * Math.cos(radians),
                    origin.y + helixRadius * Math.sin(radians),
                    start - i * remainingStepdown
                ),
                toolHead.settings.firstCutFeedRate
            );
        }
    }

    toolHead.cutTo(
        new Vector3(origin.x, origin.y, depth),
        toolHead.settings.firstCutFeedRate
    );
}

module.exports = {boreToDepth};
