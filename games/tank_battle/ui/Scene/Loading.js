import { Group, Text } from "Engine";

export default class Loading extends Group {
  constructor() {
    super();
    this.text = new Text({ x: 200, y: 200 }, "加载中")
    this.add(this.text);
  }
  step() {
    const $engine = this.getEngine();
    const canvas = $engine.canvaser.canvas;
    const { height, width } = canvas
    this.text.rect({ x: width / 2, y: height / 2 })
  }
}
