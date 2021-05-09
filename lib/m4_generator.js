const {helical} = require("../lib/operations/helical");

const M4_SHAFT_DIAMETER = 4.5; // mm
const M4_HEAD_DIAMETER = 7.0; // mm

function createM4CountersunkHole(toolHead, total_height, shaft_height) {
    toolHead.prepare(0);
    const start_position = toolHead.position.clone();
    toolHead.comment(`M4 bolt shaft (${M4_SHAFT_DIAMETER}mm)`);
    helical(toolHead, M4_SHAFT_DIAMETER, total_height);
    toolHead.repositionTo(start_position);
    toolHead.comment(`M4 bolt countersink (${M4_HEAD_DIAMETER})`);
    helical(toolHead, M4_HEAD_DIAMETER, total_height - shaft_height, false);
    toolHead.finish();
}

module.exports = {createM4CountersunkHole};
