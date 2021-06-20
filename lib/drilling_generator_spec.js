const {expect} = require('chai');
const fs = require('fs');
const {ToolHead} = require("./tool_head");
const {Vector3, SpyWriter} = require("./utilities");
const {CommandGenerator} = require("./command_generator");
const {DefaultSettings} = require("./default_settings");
const {createDrillingProgram} = require('./drilling_generator');

describe("createDrillingProgram", () => {
    const settings = DefaultSettings;
    const commandGenerator = new CommandGenerator("cnc-gen drilling");
    const writer = new SpyWriter();
    const reference = fs.readFileSync("./reference_output/drill-d7z10.txt", 'utf8');

    it("should match reference output", () => {
        let position = new Vector3(0,0,0);
        let toolDiameter = 6.35;
        const toolHead = new ToolHead(writer, settings, commandGenerator, toolDiameter, position);
        createDrillingProgram(toolHead, 7, -10);
        expect(writer.capture).to.equal(reference);
    });
});
