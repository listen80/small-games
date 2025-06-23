import { Tank } from "./Tank.js";
import { Spirit } from "../../lib/Base.js";
export class Player extends Tank {
  constructor(name, x, y, img, cmdKeys) {
    super(x, y, img);
    this.name = name;
    this.speed = 1;
    this.cmdKeys = cmdKeys;
    this.isMy = true;
    this.canMove = true;
    this.canFire = true;
    this.spirit = new Spirit({ w: 1 * 2, h: 1 * 2 }, img)
    this.add(this.spirit)
  }
  onAppear($engine) {
    // $engine.controller.registryKeys(this.cmdKeys);
  }
  calcFire() {
    if (!this.canFire) {
      return;
    }
    const $engine = this.getEngine();
    const fire = $engine.controller.has(' ');
    if (fire) {
      const mapInstance = this.parent().parent()
      mapInstance.createFire(this);
    }
  }
  calcMove() {
    // if (!this.canMove) {
    //   return
    // }
    let dist = null
    const $engine = this.getEngine();
    if ($engine.controller.has('w')) {
      dist = this.move({ y: -this.speed })
      this.tick = 3;
    }
    if ($engine.controller.has('s')) {
      dist = this.move({ y: this.speed })
      this.tick = 3;
    }
    if ($engine.controller.has('a')) {
      dist = this.move({ x: -this.speed })
      this.tick = 3;
    }
    if ($engine.controller.has('d')) {
      dist = this.move({ x: this.speed })
      this.tick = 3;
    }

    if (dist) {
      const find = this.parent().parent().calcColxss(this, dist)
      
      if (find) {
        console.log(find)
      } else {
        this.rect(dist)
      }
    }
  }
  step() {
    if (!this.tick) {
      this.calcMove();
    } else {
      this.tick--
    }
    this.calcFire();
  }
}
