const {Vector} = require("../utilities");

function boreToDepth(toolHead, diameter, depth) {
    const segmentQuantity = 16;

    // This might be easier if we can do arcs in gcode?
    // https://www.cnccookbook.com/cnc-g-code-arc-circle-g02-g03/

    if (diameter < toolHead.millSize) throw "Unable to drill a hole smaller than the end mill diameter"
    if (diameter > toolHead.millSize * 2) throw "Unable to drill a clean hole larger than twice the end mill diameter"

    let helixRadius = diameter / 2 - toolHead.millSize / 2;

    let origin = new Vector(toolHead.position.x, toolHead.position.y);

    let start = 0;
    toolHead.cutTo(origin.x - helixRadius, origin.y, start, toolHead.settings.stepDownFeedRate);

    for (; start > depth; start -= toolHead.settings.helicalStepDownRate) {
        let remainingStepdown = (-depth - -start) < toolHead.settings.helicalStepDownRate
            ? -depth - -start
            : toolHead.settings.helicalStepDownRate;
        for (let i = 1 / segmentQuantity; i <= 1.0; i += 1 / segmentQuantity) {
            let r = i * 2 * Math.PI;
            let z = start - i * remainingStepdown;
            let x = origin.x - helixRadius * Math.cos(r);
            let y = origin.y + helixRadius * Math.sin(r);
            toolHead.cutTo(x, y, z, toolHead.settings.firstCutFeedRate);
        }
    }

    toolHead.cutTo(origin.x, origin.y, depth, toolHead.settings.firstCutFeedRate);
}

module.exports = {boreToDepth};
