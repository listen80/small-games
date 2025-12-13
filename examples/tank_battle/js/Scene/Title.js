import { Group, Text, Ease } from "Engine";

export default class Title extends Group {
  constructor() {
    super();
    this.title = new Text({ x: 16, y: 12 }, "坦克大战");
    this.text = new Text({ x: 16, y: 32 }, "A 开始游戏");
    this.add(this.title);
    this.add(this.text);
  }
  
  onAppear($engine) {
    // Create a smooth animation for the start text
    this.ease = new Ease().to(this.text.rect(), { x: 16, y: 21 }, {
      duration: 500, // Animation duration in milliseconds
      ease: Ease.outQuad, // Use a smooth easing function
      onUpdate: (rect) => {
        this.text.rect(rect);
      },
      onComplete: () => {
        // Animation complete callback
      }
    });
    
    // Play start sound
    // $engine.audio.play('start');
  }
  
  step(a, dt) {
    // Update the animation
    this.ease.update(dt || 1 / 60);
    
    // Check for start game input
    const $engine = this.getEngine();
    if ($engine.controller.has('a')) {
      $engine.goto("Level");
    }
  }
}
