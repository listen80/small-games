import { Tank } from "./Tank.js";
import { Spirit } from "Engine";

export class Player extends Tank {
  constructor(name, x, y, img, cmdKeys) {
    super(x, y, img);
    this.name = name;
    this.speed = 1;
    this.cmdKeys = cmdKeys;
    this.isMy = true;
    this.canMove = true;
    this.canFire = true;
    this.tick = 0;
    this.spirit = new Spirit({ w: 2, h: 2 }, img);
    this.add(this.spirit);
  }
  
  onAppear($engine) {
    // Controller keys are registered at a higher level
  }
  
  calcFire() {
    if (!this.canFire) {
      return;
    }
    
    const $engine = this.getEngine();
    if ($engine.controller.has(' ')) {
      const mapInstance = this.parent().parent();
      mapInstance.createFire(this);
    }
  }
  
  calcMove() {
    if (!this.canMove) {
      return;
    }
    
    let dist = null;
    const $engine = this.getEngine();
    
    if ($engine.controller.has('w')) {
      dist = this.move({ y: -this.speed });
      this.tick = 3;
    } else if ($engine.controller.has('s')) {
      dist = this.move({ y: this.speed });
      this.tick = 3;
    } else if ($engine.controller.has('a')) {
      dist = this.move({ x: -this.speed });
      this.tick = 3;
    } else if ($engine.controller.has('d')) {
      dist = this.move({ x: this.speed });
      this.tick = 3;
    }

    if (dist) {
      const collisions = this.parent().parent().calcCollisions(this, dist);
      if (collisions.length) {
        const hasZeroZ = collisions.some(item => item.rect().z === 0);
        if (!hasZeroZ) {
          this.rect(dist);
        }
        
        collisions.forEach(item => {
          if (item.rect().z === 0 && item.defense < 150) {
            item.remove();
          }
        });
      } else {
        this.rect(dist);
      }
    }
  }
  
  step() {
    if (!this.tick) {
      this.calcMove();
    } else {
      this.tick--;
    }
    this.calcFire();
  }
}
