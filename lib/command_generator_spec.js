const { expect } = require("chai");
const { CommandGenerator } = require("./command_generator");

describe("CommandGenerator", () => {
    const gen = new CommandGenerator();

    it("should round pad trailing decimals on 0", () => {
        expect(gen.paddedfloat(0)).to.equal("0.000");
    });

    it("should pad trailing decimals when missing left of decimal", () => {
        expect(gen.paddedfloat(0.1)).to.equal("0.100");
    });

    it("should round down after the padding", () => {
        expect(gen.paddedfloat(1.111111)).to.equal("1.111");
    });

    it("should round down up after the padding", () => {
        expect(gen.paddedfloat(1.5555555)).to.equal("1.556");
    });
});
