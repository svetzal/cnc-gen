#!/usr/bin/env node

const {FileWriter} = require("../lib/utilities");
const {createSettingsFromArgs} = require("../lib/default_settings");
const {DefaultSettings} = require("../lib/default_settings");
const {CommandGenerator} = require("../lib/command_generator");
const {ConsoleWriter, Vector} = require('../lib/utilities');
const {createFacingProgram} = require("../lib/facing_generator");

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
    // Drill
    .option('w', {
        alias: 'width',
        describe: 'width to surface - x axis (mm)',
        type: 'number',
    })
    .option('l', {
        alias: 'length',
        describe: 'length to surface - y axis (mm)',
        type: 'number',
    })
    .option('v', {
        alias: 'advanceRate',
        default: 1,
        describe: 'amount to advance bit during surfacing per pass (mm)',
        type: 'number',
    })
    .option('z', {
        alias: 'depth',
        default: 1,
        describe: 'depth to drill (mm)'
    })
    .help()
    .argv;

const main = async (args) => {
    let settings = createSettingsFromArgs(args);

    let writer = args.output
        ? new FileWriter(args.output)
        : new ConsoleWriter();

    let size = new Vector(args.width, args.length);
    let faceOrigin = new Vector(0 - size.x / 2, 0 - size.y / 2);

    createFacingProgram(
        writer,
        settings,
        new CommandGenerator(),
        args.toolDiameter,
        faceOrigin,
        size,
        args.advanceRate,
    );
}

main(args);
