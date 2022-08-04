const sinon = require('sinon');
const {ToolHead} = require('./tool_head');
const {Vector3} = require("./vector3");
const {DefaultSettings} = require('./default_settings');

describe("ToolHead", () => {

    let toolHead;

    let fakeWriter = {
        write: function () {}
    };

    let mockWriter = sinon.mock(fakeWriter);

    let fakeCommandGenerator = {
        createComment: function () {}
    };

    let mockCommandGenerator = sinon.mock(fakeCommandGenerator);

    let defaultMillSize = 3.125;
    let startLocation = new Vector3(0, 0, 0);

    beforeEach(() => {
        toolHead = new ToolHead(
            fakeWriter,
            DefaultSettings,
            fakeCommandGenerator,
            defaultMillSize,
            startLocation
        )
    });

    afterEach(() => sinon.restore());

    it("should generate a comment", () => {
        const message = "fake message";

        mockWriter.expects("write").once();
        mockCommandGenerator.expects("createComment").once().withArgs(message);

        toolHead.comment(message);

        mockWriter.verify();
        mockCommandGenerator.verify();
    });

});