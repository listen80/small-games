import { BOX_SIZE, TANK_SIZE } from "../../data/size.js";
import { Base, Group, Text, Spirit, Move } from "../../lib/Base.js";
export class Grass extends Spirit {
  constructor(x, y) {
    super({ x: x * BOX_SIZE, y: y * BOX_SIZE, w: BOX_SIZE, h: BOX_SIZE });
  }
  onAppear($engine) {
    const imgs = $engine.loader.imgs
    this.setImage(imgs.grass)
  }

}

export class Water extends Spirit {
  constructor(x, y) {
    super({ x: x * BOX_SIZE, y: y * BOX_SIZE, w: BOX_SIZE, h: BOX_SIZE });

  }
  onAppear($engine) {
    const imgs = $engine.loader.imgs
    this.setImage(imgs.water)
  }

}

export class Wall extends Spirit {
  constructor(x, y) {
    super({ x: x * BOX_SIZE, y: y * BOX_SIZE, w: BOX_SIZE, h: BOX_SIZE });
    this.canBeDestoried = true;
  }

  onAppear($engine) {
    const imgs = $engine.loader.imgs
    this.setImage(imgs.wall)
  }
}

export class Steel extends Spirit {
  constructor(x, y) {
    super({ x: x * BOX_SIZE, y: y * BOX_SIZE, w: BOX_SIZE, h: BOX_SIZE });

  }
  onAppear($engine) {
    const imgs = $engine.loader.imgs
    this.setImage(imgs.steel)
  }

}

export class Home extends Spirit {
  constructor(x, y) {
    super({ x: x * BOX_SIZE, y: y * BOX_SIZE, w: BOX_SIZE * 2, h: BOX_SIZE * 2 });
  }
  onAppear($engine) {
    const imgs = $engine.loader.imgs
    this.setImage(imgs.home)
  }

}

export class Tank extends Move {
  constructor(x, y, img) {
    super({ x: x * BOX_SIZE, y: y * BOX_SIZE, w: BOX_SIZE * 2, h: BOX_SIZE * 2 });
    // this.x += (BOX_SIZE * 2 - TANK_SIZE) / 2;
    // this.y += (BOX_SIZE * 2 - TANK_SIZE) / 2;
    // this.destoryProps = {
    //   // img: imgs.destory,
    //   frames: [0, 1, 2, 3, 2, 1, 3, 1, 3, 1, 0],
    //   interval: 1,
    //   size: 66,
    // };
    // this.ObstacleArray = [];
    // this.canBeDestoried = true;
    // this.baseSpeed = 3;
    // this.name = "tank";
  }
  openFire() {
    return true;
  }
}

export class Bullet extends Move {
  constructor(props) {
    super(props.x, props.y, BULLET_SIZE, BULLET_SIZE, imgs.bullet);
    this.baseSpeed = props.baseSpeed * 4;
    this.canBeDestoried = true;
    this.hasDestoryAbility = true;
    this.destoryProps = {
      img: imgs.blast,
      frames: [1, 2, 1, 0],
      interval: 1,
      size: 32,
    };
    // this.fatherArray = BulletArray;
    this.isMy = props.isMy;
    var face = (this.face = this.key = props.face);
    var keys = (this.keys = props.keys);
    var offset = TANK_SIZE - BULLET_SIZE;
    this.ObstacleArray = [];
    switch (face) {
      case keys.left:
        this.y += offset / 2;
        break;
      case keys.right:
        this.x += offset;
        this.y += offset / 2;
        break;
      case keys.up:
        this.x += offset / 2;
        break;
      case keys.down:
        this.x += offset / 2;
        this.y += offset;
        break;
    }
  }
  step(i) {
    this.move(i);
    // this.draw();
  }
}

export class Enemy extends Tank {
  constructor(x, y) {
    super(x, y.enemy);
    this.keys = {
      left: "left",
      right: "right",
      up: "up",
      down: "down",
    };
    this.face = this.key = this.keys.down;
    this.randomKey = Object.keys(this.keys);
    this.tick = 0;
    this.interval = (Math.random() * 30 + 30) | 0;
    // this.fatherArray = EnemyArray;
    this.isMy = false;
  }
  changeDirection() {
    this.face = this.key = this.randomKey[(Math.random() * 4) | 0];
  }
  step(i) {
    return
    this.tick++;
    if (this.tick % this.interval === 0) {
      Math.random() > 0.5 && this.changeDirection();
      this.fire = 1;
    }
    if (this.fire) {
      this.fire = false;
      if (!this.cold) {
        this.cold = 1 * 30;
        // BulletArray.push(new Bullet(this));
        // audios.attack.play();
      }
    }
    if (this.cold) {
      this.cold--;
    }
    // this.move(i);
    // this.draw();
  }
}

export class Boom extends Spirit {
  constructor(props) {
    var destoryProps = props.destoryProps;
    super(
      props.x,
      props.y,
      destoryProps.size,
      destoryProps.size,
      destoryProps.img
    );
    this.tick = 0;
    this.frame = 0;
    // this.fatherArray = BoomArray;
    this.frames = destoryProps.frames;
    this.interval = destoryProps.interval;
    this.x += (props.w - this.w) / 2;
    this.y += (props.h - this.h) / 2;
  }
  step(i) {
    this.tick++;
    if (this.tick % this.interval === 0) {
      this.frame++;
      if (this.frame === this.frames.length) {
        // this.fatherArray.splice(i, 1);
      }
    }
    ctx.drawImage(
      this.img,
      this.frames[this.frame] * this.w,
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
