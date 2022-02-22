#!/usr/bin/env node

const { createM4CountersunkHole } = require("../lib/m4_generator");
const { ToolHead } = require("../lib/tool_head");
const { commonArgumentParser } = require("../lib/common_argument_parser");
const { createSettingsFromArgs } = require("../lib/default_settings");
const { CommandGenerator } = require("../lib/command_generator");
const { ConsoleWriter, FileWriter, Vector3 } = require("../lib/utilities");

const args = commonArgumentParser()
    .option("d", {
        alias: "totalDepth",
        default: 12,
        describe: "total depth of stock, shaft + countersink (mm)",
    })
    .option("s", {
        alias: "shaftHeight",
        default: 6,
        describe: "height of shaft (mm)",
    })
    .help().argv;

const main = async (args) => {
    let settings = createSettingsFromArgs(args);

    let writer = args.output
        ? new FileWriter(args.output)
        : new ConsoleWriter();

    let commandGenerator = new CommandGenerator("cnc-gen M4 countersunk");
    let position = new Vector3(0, 0, 0);
    const toolHead = new ToolHead(
        writer,
        settings,
        commandGenerator,
        args.toolDiameter,
        position
    );

    createM4CountersunkHole(toolHead, args.totalDepth, args.shaftHeight);
};

main(args);
