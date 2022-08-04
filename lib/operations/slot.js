const { Vector3 } = require("../vector3");

function slot(toolHead, horizontal, length, depth) {
    const slotOrigin = toolHead.position.clone();
    let start = slotOrigin.z - toolHead.settings.stepDownRate;

    for (
        ;
        start > -depth - toolHead.settings.stepDownRate;
        start -= toolHead.settings.stepDownRate
    ) {
        if (start < -depth) start = -depth;
        toolHead.cutTo(
            new Vector3(slotOrigin.x, slotOrigin.y, start),
            toolHead.settings.stepDownFeedRate
        );

        toolHead.cutTo(
            horizontal
                ? new Vector3(slotOrigin.x + length, slotOrigin.y, start)
                : new Vector3(slotOrigin.x, slotOrigin.y + length, start),
            toolHead.settings.normalCutFeedRate
        );

        if (start > -depth)
            toolHead.repositionTo(
                new Vector3(slotOrigin.x, slotOrigin.y, start)
            );
    }
}

module.exports = { slot };
