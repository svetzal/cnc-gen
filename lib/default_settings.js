const DefaultSettings = {
    retractHeight: 15,
    firstCutFeedRate: 300,
    normalCutFeedRate: 800,
    stepDownFeedRate: 100,
    stepDownRate: 1,
    helicalStepDownRate: 0.3,
    safetyMargin: 1,
}

function createSettingsFromArgs(args) {
    return {
        retractHeight: args.retractHeight,
        firstCutFeedRate: args.firstCutFeedRate,
        normalCutFeedRate: args.normalCutFeedRate,
        stepDownFeedRate: args.stepDownFeedRate,
        stepDownRate: args.stepDownRate,
        helicalStepDownRate: args.helicalStepDownRate,
        safetyMargin: args.safetyMargin,
    }
}

module.exports = { DefaultSettings, createSettingsFromArgs };
