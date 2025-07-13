import { Group, Text } from "Engine";

export default class Loading extends Group {
  constructor() {
    super();
    this.text = new Text({ x: 0, y: 0 }, "加载中")
    this.add(this.text);
  }
  onAppear() {
    const $engine = this.getEngine();
    const canvas = $engine.canvaser.canvas;
    const { height, width } = canvas
    this.text.rect({ x: width / 2, y: height / 2 })
  }
}
