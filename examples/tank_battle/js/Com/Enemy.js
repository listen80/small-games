import { Tank } from "./Tank.js";
import { Bullet } from "./Tank.js";

export class Enemy extends Tank {
  constructor(x, y, imgs) {
    super(x, y, imgs.enemy);
    this.keys = {
      left: "left",
      right: "right",
      up: "up",
      down: "down",
    };
    this.face = this.key = this.keys.down;
    this.randomKeys = Object.keys(this.keys);
    this.tick = 0;
    this.interval = Math.floor(Math.random() * 30 + 30);
    this.isMy = false;
    this.fire = false;
    this.cold = 0;
  }
  
  changeDirection() {
    this.face = this.key = this.randomKeys[Math.floor(Math.random() * 4)];
  }
  
  step(i) {
    this.tick++;
    
    // Randomly change direction
    if (this.tick % this.interval === 0) {
      if (Math.random() > 0.5) {
        this.changeDirection();
      }
      this.fire = true;
      this.interval = Math.floor(Math.random() * 30 + 30); // Reset interval
    }
    
    // Fire logic
    if (this.fire) {
      this.fire = false;
      if (!this.cold) {
        this.cold = 30; // 1 second cooldown at 60fps
        // Create bullet and play sound
        const bullet = new Bullet({
          x: this.x,
          y: this.y,
          face: this.face,
          keys: this.keys,
          baseSpeed: 1,
          isMy: false,
          img: {
            bullet: imgs.bullet,
            blast: imgs.blast
          }
        });
        this.parent().parent().bulletArray.add(bullet);
        // $engine.audio.play('attack');
      }
    }
    
    // Cooldown reduction
    if (this.cold > 0) {
      this.cold--;
    }
    
    // Move the enemy
    this.move(i);
  }
}
