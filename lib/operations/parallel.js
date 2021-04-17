function parallel(toolHead, faceOrigin, toolStartPosition, surfacingSize, depth, advanceRate, firstCutFeedRate, normalCutFeedRate) {
    let extentY = toolStartPosition.y + surfacingSize.y;
    for (let y = toolStartPosition.y; y < extentY + advanceRate; y += advanceRate) {
        if (y > extentY) y = extentY;

        toolHead.cutTo(
            new Vector3(toolStartPosition.x - surfacingSize.x, y, depth),
            y === faceOrigin.y ? firstCutFeedRate : normalCutFeedRate
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
}

module.exports = {parallel};
