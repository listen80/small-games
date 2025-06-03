import { BOX_SIZE } from "../js/size.js";
import { Tank } from "./ManyUI.js";

export class Player extends Tank {
  constructor(name, x, y, img, cmdKeys) {
    super(x, y, img);
    this.name = name;
    this.speed = BOX_SIZE;
    this.cmdKeys = cmdKeys;
    this.isMy = true;
    this.canMove = true;
    this.canFire = true;
  }
  onAppear($engine) {
    $engine.controller.registryKeys(this.cmdKeys);
  }
  calcFire() {
    const $engine = this.getEngine();
    if (!this.canFire) {
      return;
    }
    const { fire } = $engine.controller.cmds;
    if (fire) {
      const mapInstance = this.getParent().getParent()
      mapInstance.createFire(this);
    }
  }
  calcMove() {
    const $engine = this.getEngine();
    if (!this.canMove) {
      return
    }
    const { up, down, left, right } = $engine.controller.cmds;
    if (up) {
      this.y -= this.speed;
    }
    if (down) {
      this.y += this.speed;
    }
    if (left) {
      this.x -= this.speed;
    }
    if (right) {
      this.x += this.speed;
    }
  }
  step() {
    this.calcMove();
    this.calcFire();
  }
}
