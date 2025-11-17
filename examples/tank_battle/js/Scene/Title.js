import { Group, Text, Ease } from "Engine";

export default class Title extends Group {
  constructor() {
    super();
    this.text = new Text({ x: 0, y: 0 }, "开始游戏")
    this.add(this.text);
  }
  onAppear($engine) {
    const canvas = $engine.canvaser.canvas;
    const { height, width } = canvas;
    // this.animate = new Animate({ x: 0, y: 0 })
    // this.animate.to({ x: 2, y: 1 })
    // this.animate.add(this.text)
    // this.add(this.animate)
    this.ease = new Ease().to(this.text.rect(), { x: 11, y: 11 }, {
      onUpdate: (rect) => {
        this.text.rect(rect)
      },
      onComplete: () => {
        // this.text.rect({ x: 2, y: 1 })
      }
    })

    console.log(this.ease)

    // this.text.rect({ x: 2, y: 1 })
    // this.text.rect().to({ x: width / 2, y: height / 2 - 50 })
    // this.text.rect({ x: width / 2, y: height / 2 - 50 })
    // .ease(Ease.outQuad)
    // .duration(300)
    // this.text.rect({ x: width / 2, y: height / 2 })
    //   .ease(Ease.outQuad)
    //   .duration(300)
  }
  step(a, dt) {
    // this.text.rect().add({ x: 0.02, y: 0.01 })
    this.ease.update(dt || 1 / 60)
    const $engine = this.getEngine()
    const confirm = $engine.controller.has(' ');
    if (confirm) {
      $engine.goto("Level")
    }
  }
}
