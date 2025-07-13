import { Group, Text } from "Engine";

export default class Level extends Group {
  constructor() {
    super();
    this.text = new Text({ x: 500, y: 330 }, "这是第1关")
    this.add(this.text)
    this.tick = 0
  }
  onAppear($engine) {
    const canvas = $engine.canvaser.canvas;
    const { height, width } = canvas
    this.text.rect({ x: width / 2, y: height / 2 })
  }
  step() {
    this.tick++
    if (this.tick === 30) {
      this.getEngine().goto("Map")
    }
  }
}
