import { Group, Text } from "Engine";

export default class Title extends Group {
  constructor() {
    super();
    this.text = new Text({ x: 330, y: 333 }, "开始游戏")
    this.add(this.text);
  }
  onAppear($engine) {
    $engine.controller.registryKeys({
      confirm: 'Enter'
    })
  }
  step() {
    const $engine = this.getEngine()

    const canvas = $engine.canvaser.canvas;
    const { height, width } = canvas
    this.text.rect({ x: width / 2, y: height / 2 })

    const confirm = $engine.controller.cmds.confirm;
    if (confirm) {
      $engine.goto("Level")
    }
  }
}
