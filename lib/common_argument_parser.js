const {DefaultSettings} = require("./default_settings");

function commonArgumentParser() {
    const args = require('yargs')
        .scriptName('cnc-gen-drill')
        // Settings
        .option('r', {
            alias: 'retractHeight',
            default: DefaultSettings.retractHeight,
            describe: 'retraction height for rapid moves (mm)',
            type: 'number',
        })
        .option('f', {
            alias: 'normalCutFeedRate',
            default: DefaultSettings.normalCutFeedRate,
            describe: 'feed rate when cutting normal overlap passes (mm/min)',
            type: 'number',
        })
        .option('ff', {
            alias: 'firstCutFeedRate',
            default: DefaultSettings.firstCutFeedRate,
            describe: 'feed rate when cutting full mill diameter (mm/min)',
            type: 'number',
        })
        .option('fs', {
            alias: 'stepDownFeedRate',
            default: DefaultSettings.stepDownFeedRate,
            describe: 'feed rate with helical step down (mm/min)',
            type: 'number',
        })
        .option('s', {
            alias: 'stepDownRate',
            default: DefaultSettings.stepDownRate,
            describe: 'total step down amount (mm)',
            type: 'number',
        })
        .option('sh', {
            alias: 'helicalStepDownRate',
            default: DefaultSettings.helicalStepDownRate,
            describe: 'total step down per helical drill pass (mm)',
            type: 'number',
        })
        .option('m', {
            alias: 'safetyMargin',
            default: DefaultSettings.safetyMargin,
            describe: 'safety margin to back away from edges and avoid hitting stock (mm)',
            type: 'number',
        })
        // General
        .option('o', {
            alias: 'output',
            describe: 'write cnc program to this filename instead of console',
            type: 'string',
        })
        .option('t', {
            alias: 'toolDiameter',
            default: 6.35,
            describe: 'mill bit diameter (mm)',
            type: 'number',
        })
    return args;
}

module.exports = {commonArgumentParser};
