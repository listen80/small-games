import { Group, Text } from "Base";

export default class Level extends Group {
  constructor() {
    super();
    this.add();
    this.textNode = new Text({ x: 500, y: 330 }, "这是第xx关")
    this.add(this.textNode)
    this.tick = 0
  }
  step() {
    this.tick++
    // console.log(this.tick)
    if (this.tick % 60 === 0) {
      this.textNode.setText(`这是第${this.tick / 60}关`)
      if (this.tick === 300) {
        const $engine = this.getEngine()
        $engine.goto("Map")
      }
      // this.add(new Text({ x: 500, y: 330 + this.tick / 60 }, `这是第${this.tick}关`));
    }
  }
}
