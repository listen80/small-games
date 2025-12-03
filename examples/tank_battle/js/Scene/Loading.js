import { Group, Text } from "Engine";

export default class Loading extends Group {
  constructor() {
    super();
    this.text = new Text({ x: 16, y: 16 }, "加载中")
    this.add(this.text);
  }
  onAppear() {
    const $engine = this.getEngine();
    const { resource } = $engine.all
    $engine.loader.loadResource(resource, () => {
      this.text.val('加载完成，按空格开始游戏')
    });
  }
  step(a, dt) {
    const $engine = this.getEngine()
    const confirm = $engine.controller.has(' ');
    if (confirm) {
      $engine.goto("Title")
    }
  }
}
