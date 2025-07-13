import { Group, Text } from "Engine";

export default class Title extends Group {
  constructor() {
    super();
    this.text = new Text({ x: 0, y: 0 }, "开始游戏")
    this.add(this.text);
  }
  onAppear($engine) {
    const canvas = $engine.canvaser.canvas;
    const { height, width } = canvas
    this.text.rect({ x: width / 2, y: height / 2 })
  }
  step() {
    const $engine = this.getEngine()
    const confirm = $engine.controller.has(' ');
    if (confirm) {
      $engine.goto("Level")
    }
  }
}
