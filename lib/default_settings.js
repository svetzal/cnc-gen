const DefaultSettings = {
    retractHeight: 15,
    firstCutFeedRate: 300,
    normalCutFeedRate: 800,
    stepDownFeedRate: 100,
    stepDownRate: 1,
    safetyMargin: 1,
}

function createSettingsFromArgs(args) {
    return {
        retractHeight: args.retractHeight,
        firstCutFeedRate: args.firstCutFeedRate,
        normalCutFeedRate: args.normalCutFeedRate,
        stepDownFeedRate: args.stepDownFeedRate,
        stepDownRate: args.stepDownFeedRate,
        safetyMargin: args.safetyMargin,
    }
}

module.exports = { DefaultSettings, createSettingsFromArgs };
