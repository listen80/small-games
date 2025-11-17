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
    const { height, width } = canvas;
    $engine.canvaser.ctx.font = "32px serif";
    $engine.canvaser.ctx.textAlign = "center";
    $engine.canvaser.ctx.fillStyle = "white";
    this.text.rect({ x: width / 2, y: height / 2 })
  }
}
