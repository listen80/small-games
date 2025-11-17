import { Group, Text } from "Engine";

export default class Level extends Group {
  constructor(level = 1) {
    super();
    this.level = level;
    this.text = new Text({ x: 16, y: 4 }, `这是第${level}关`);
    this.add(this.text);
    this.tick = 0;
  }
  onAppear($engine) {
    const canvas = $engine.canvaser.canvas;
    const { height, width } = canvas;
    // this.text.rect({ x: width / 2, y: height / 2 });
  }
  step() {
    this.tick++
    this.text.val(`这是第${this.level}关`)
    if (this.tick === 60) {
      this.getEngine().goto("Map")
    }
  }
}
