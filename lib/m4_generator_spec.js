const {expect} = require('chai');
const fs = require('fs');
const {Vector3} = require("./utilities");
const {ToolHead} = require("./tool_head");
const {SpyWriter} = require("./utilities");
const {CommandGenerator} = require("./command_generator");
const {createM4CountersunkHole} = require("./m4_generator");
const {DefaultSettings} = require("./default_settings");

describe("createM4Program", () => {
    const settings = DefaultSettings;
    const commandGenerator = new CommandGenerator("cnc-gen M4 countersunk");
    const writer = new SpyWriter();
    const reference = fs.readFileSync("./reference_output/m4-d10s5.txt", 'utf8');

    it("should match reference output", () => {
        let position = new Vector3(0, 0, 0);
        createM4CountersunkHole(
            new ToolHead(writer, settings, commandGenerator, 3.175, position),
            10,
            5
        );
        expect(writer.capture).to.equal(reference);
    });
});
