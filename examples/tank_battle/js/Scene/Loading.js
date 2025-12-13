import { Group, Text } from "Engine";

export default class Loading extends Group {
  constructor() {
    super();
    this.text = new Text({ x: 16, y: 16 }, "加载中...");
    this.add(this.text);
    this.loaded = false;
  }
  
  onAppear() {
    const $engine = this.getEngine();
    const { resource } = $engine.all;
    
    // Add loading progress display
    $engine.loader.loadResource(resource, () => {
      this.loaded = true;
      this.text.val("加载完成，按空格开始游戏");
      // Automatically go to title screen after a short delay
      setTimeout(() => {
        $engine.goto("Title");
      }, 1000);
    }, (progress) => {
      // Update loading progress
      this.text.val(`加载中... ${Math.round(progress * 100)}%`);
    });
  }
  
  step(a, dt) {
    const $engine = this.getEngine();
    
    // Allow manual skip to title screen when loaded
    if (this.loaded && $engine.controller.has(' ')) {
      $engine.goto("Title");
    }
  }
}
