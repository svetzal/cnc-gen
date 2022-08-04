const DefaultSettings = {
    retractHeight: 5,
    firstCutFeedRate: 100,
    normalCutFeedRate: 400,
    stepDownFeedRate: 100,
    stepDownRate: 1,
    plungeFeedRate: 30,
    helicalStepDownRate: 0.3,
    safetyMargin: 1,
    plunge: false,
};

function createSettingsFromArgs(args) {
    return {
        retractHeight: args.retractHeight,
        firstCutFeedRate: args.firstCutFeedRate,
        normalCutFeedRate: args.normalCutFeedRate,
        stepDownFeedRate: args.stepDownFeedRate,
        stepDownRate: args.stepDownRate,
        plungeFeedRate: args.plungeFeedRate,
        helicalStepDownRate: args.helicalStepDownRate,
        safetyMargin: args.safetyMargin,
        plunge: args.plunge,
    };
}

module.exports = { DefaultSettings, createSettingsFromArgs };
