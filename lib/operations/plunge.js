const { Vector3 } = require("../vector3");

function plunge(toolHead, depth) {
    const slotOrigin = toolHead.position.clone();

    toolHead.cutTo(
        new Vector3(slotOrigin.x, slotOrigin.y, -depth),
        toolHead.settings.plungeFeedRate
    )
}

module.exports = { plunge };