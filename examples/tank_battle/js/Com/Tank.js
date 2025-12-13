import { BOX_SIZE, BULLET_SIZE } from "Data/size.js";
import { Spirit, Move } from "Engine";

export class Tank extends Move {
  constructor(x, y, img) {
    super({ x: x, y: y, w: 2, h: 2 });
  }
  
  openFire() {
    return true;
  }
}

export class Bullet extends Move {
  constructor(props) {
    const TANK_SIZE = BOX_SIZE * 2;
    super(props.x, props.y, BULLET_SIZE, BULLET_SIZE, props.img.bullet);
    this.baseSpeed = props.baseSpeed * 4;
    this.canBeDestoried = true;
    this.hasDestoryAbility = true;
    this.destoryProps = {
      img: props.img.blast,
      frames: [1, 2, 1, 0],
      interval: 1,
      size: 32,
    };
    this.isMy = props.isMy;
    this.face = this.key = props.face;
    this.keys = props.keys;
    this.ObstacleArray = [];
    
    const offset = TANK_SIZE - BULLET_SIZE;
    switch (this.face) {
      case this.keys.left:
        this.y += offset / 2;
        break;
      case this.keys.right:
        this.x += offset;
        this.y += offset / 2;
        break;
      case this.keys.up:
        this.x += offset / 2;
        break;
      case this.keys.down:
        this.x += offset / 2;
        this.y += offset;
        break;
    }
  }
  
  step(i) {
    this.move(i);
  }
}

export class Boom extends Spirit {
  constructor(props) {
    const destoryProps = props.destoryProps;
    super({
      x: props.x + (props.w - destoryProps.size) / 2,
      y: props.y + (props.h - destoryProps.size) / 2,
      w: destoryProps.size,
      h: destoryProps.size,
      src: destoryProps.img
    });
    this.tick = 0;
    this.frame = 0;
    this.frames = destoryProps.frames;
    this.interval = destoryProps.interval;
  }
  
  step(i) {
    this.tick++;
    if (this.tick % this.interval === 0) {
      this.frame++;
      if (this.frame >= this.frames.length) {
        this.remove();
      }
    }
    
    const frameIndex = Math.min(this.frame, this.frames.length - 1);
    this.drawFrame(this.frames[frameIndex]);
  }
  
  drawFrame(frameIndex) {
    this.ctx.drawImage(
      this.img,
      frameIndex * this.w,
      0,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
}

