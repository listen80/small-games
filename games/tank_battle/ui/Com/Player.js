import { BOX_SIZE } from "Data/size.js";
import { Tank } from "./Tank.js";
import { Spirit } from "../../lib/Base.js";
export class Player extends Tank {
  constructor(name, x, y, img, cmdKeys) {
    super(x, y, img);
    this.name = name;
    this.speed = BOX_SIZE;
    this.cmdKeys = cmdKeys;
    this.isMy = true;
    this.canMove = true;
    this.canFire = true;
    const spirit = new Spirit({}, img)
    this.add(spirit)
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
      const mapInstance = this.getParent().getParent()
      mapInstance.createFire(this);
    }
  }
  calcMove() {
    if (!this.canMove) {
      return
    }
    const $engine = this.getEngine();
    if ($engine.controller.has('w')) {
      this.y -= this.speed;
    }
    if ($engine.controller.has('s')) {
      this.y += this.speed;
    }
    if ($engine.controller.has('a')) {
      this.x -= this.speed;
    }
    if ($engine.controller.has('d')) {
      this.x += this.speed;
    }
  }
  step() {
    this.calcMove();
    this.calcFire();
  }
}
