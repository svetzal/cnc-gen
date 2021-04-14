const {Vector3} = require("./utilities");

class ToolHead {
    constructor(writer, settings, commandGenerator, title, millSize, position) {
        this.settings = settings;
        this.gen = commandGenerator;
        this.writer = writer;
        this.title = title;
        this.millSize = millSize;
        this.position = position;
    }

    prepare(depth) {
        this.writer.write(this.gen.createPreamble(this.title));
        this.writer.write([
            this.gen.createRapidMove(this.position.x, this.position.y, this.settings.retractHeight),
            this.gen.createCuttingMove(this.position.x, this.position.y, depth, this.settings.stepDownFeedRate),
        ]);
    }

    repositionTo(x, y, safe, depth) {
        this.writer.write([
            this.gen.createRapidMove(this.position.x, this.position.y, this.settings.retractHeight),
            this.gen.createRapidMove(x, y, this.settings.retractHeight),
            this.gen.createCuttingMove(x, y, safe, this.settings.normalCutFeedRate),
            this.gen.createCuttingMove(x, y, depth, this.settings.stepDownFeedRate),
        ]);
        this.position = new Vector3(x, y, depth);
    }

    cutTo(x, y, z, feedRate) {
        this.writer.write(
            this.gen.createCuttingMove(x, y, z, feedRate)
        );
        this.position = new Vector3(x, y, z);
    }

    finish() {
        this.writer.write(this.gen.createRapidMove(this.position.x, this.position.y, this.settings.retractHeight));
        this.writer.write(this.gen.createPostamble());
    }
}

module.exports = {ToolHead};
