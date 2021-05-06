class ToolHead {
    constructor(writer, settings, commandGenerator, millSize, position) {
        this.settings = settings;
        this.gen = commandGenerator;
        this.writer = writer;
        this.millSize = millSize;
        this.position = position;
    }

    comment(message) {
        this.writer.write(this.gen.createComment(message));
    }

    prepare(depth) {
        this.writer.write(this.gen.createPreamble());

        this.writer.write([
            this.gen.createRapidMove(this.position.setZ(this.settings.retractHeight)),
            this.gen.createCuttingMove(this.position.setZ(depth), this.settings.stepDownFeedRate),
        ]);
    }

    repositionTo(position) {
        this.writer.write([
            this.gen.createRapidMove(this.position.setZ(this.settings.retractHeight)),
            this.gen.createRapidMove(position.setZ(this.settings.retractHeight)),
            this.gen.createCuttingMove(position.setZ(0), this.settings.normalCutFeedRate),
            this.gen.createCuttingMove(position, this.settings.stepDownFeedRate),
        ])
        this.position = position
    }

    cutTo(position, feedRate) {
        this.writer.write(
            this.gen.createCuttingMove(position, feedRate)
        );
        this.position = position;
    }

    finish() {
        this.writer.write(this.gen.createRapidMove(this.position.setZ(this.settings.retractHeight)));
        this.writer.write(this.gen.createPostamble());
    }
}

module.exports = {ToolHead};
