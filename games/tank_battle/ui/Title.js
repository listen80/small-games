import { Group, Text } from "../lib/Base.js";

export default class Title extends Group {
  constructor() {
    super();
    this.add(new Text({ x: 330, y: 333 }, "开始游戏"));
  }
  step() {
    const $engine = this.getEngine()
    const confirm = $engine.controller.keyMap.confirm;
    if (confirm) {
      $engine.goto("Level")
    }
  }
}
