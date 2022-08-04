const { DefaultSettings } = require("./default_settings");

function commonArgumentParser() {
    const args = require("yargs")
        // Settings
        .option("retractHeight", {
            default: DefaultSettings.retractHeight,
            describe: "retraction height for rapid moves (mm)",
            type: "number",
        })
        .option("normalCutFeedRate", {
            default: DefaultSettings.normalCutFeedRate,
            describe: "feed rate when cutting normal overlap passes (mm/min)",
            type: "number",
        })
        .option("firstCutFeedRate", {
            default: DefaultSettings.firstCutFeedRate,
            describe: "feed rate when cutting full mill diameter (mm/min)",
            type: "number",
        })
        .option("stepDownFeedRate", {
            default: DefaultSettings.stepDownFeedRate,
            describe: "feed rate with helical step down (mm/min)",
            type: "number",
        })
        .option("plungeFeedRate", {
            default: DefaultSettings.plungeFeedRate,
            describe: "feed rate for plunging (mm/min)",
            type: "number",
        })
        .option("stepDownRate", {
            default: DefaultSettings.stepDownRate,
            describe: "total step down amount (mm)",
            type: "number",
        })
        .option("helicalStepDownRate", {
            default: DefaultSettings.helicalStepDownRate,
            describe: "total step down per helical drill pass (mm)",
            type: "number",
        })
        .option("safetyMargin", {
            default: DefaultSettings.safetyMargin,
            describe:
                "safety margin to back away from edges and avoid hitting stock (mm)",
            type: "number",
        })
        // General
        .option("output", {
            alias: "o",
            describe: "write cnc program to this filename instead of console",
            type: "string",
        })
        .option("toolDiameter", {
            alias: "t",
            default: 3.175,
            describe: "mill bit diameter (mm)",
            type: "number",
        })
        .option("plunge", {
            alias: "p",
            describe: "use plunge instead of helical boring operation",
            type: "boolean",
        });
    return args;
}

module.exports = { commonArgumentParser };
