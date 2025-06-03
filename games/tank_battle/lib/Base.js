export class Rect {
  constructor({ x = 0, y = 0, w = 0, h = 0 } = {}) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    if (typeof x !== "number") {
      debugger
      console.error("x is not number");
    }
    if (typeof y !== "number") {
      console.error("y is not number");
    }
    if (typeof w !== "number") {
      console.error("w is not number");
    }
    if (typeof h !== "number") {
      console.error("h is not number");
    }
  }
  multi(n) {
    this.x *= n;
    this.y *= n;
    this.w *= n;
    this.h *= n;
  }
}
export class Base {
  #parent = null;
  #engine = null;
  #rect = { x: 0, y: 0, w: 0, h: 0 }
  constructor({ x = 0, y = 0, w = 0, h = 0 } = {}) {
    this.#rect = new Rect({ x, y, w, h });
  }
  getRect() {
    return this.#rect;
  }
  setParent(p) {
    this.#parent = p;
    this.#engine = p.#engine;
  }
  getParent() {
    return this.#parent;
  }
  remove() {
    this.#parent.removeChild(this);
  }
  getEngine() {
    return this.#engine;
  }
  setEngine(engine) {
    this.#engine = engine;
    this.onAppear?.(engine);
  }
}

export class Group extends Base {
  #children = [];
  constructor(...rest) {
    super();
    rest.forEach((child) => {
      this.add(child);
    });
  }
  removeChild(child) {
    const index = this.#children.indexOf(child);
    const re = this.#children.splice(index, 1);
    if (re.length) {
      child.setParent(null);
    } else {
      console.error("?????");
    }
  }
  add(...children) {
    for (let child of children) {
      if (typeof child === "object" && child) {
        child.setParent(this);
        // child.#parent = this;
        this.#children.push(child);
      } else {
        //   console.error(child, this);
      }
    }
  }
  reset() {
    this.#children.splice(0, this.length);
    console.warn("reset");
  }
  step(controller) {
    this.#children.forEach((child, i) => {
      child.step?.(controller);
    });
  }
  draw(ctx) {
    this.#children.forEach((child, i) => {
      child.draw?.(ctx, i);
    });
  }
  setEngine(engine) {
    super.setEngine(engine);
    this.#children.forEach((child, i) => {
      child.setEngine(engine);
    })
  }
}

export class Spirit extends Base {
  #img = null;
  constructor({ x, y, w, h }, img) {
    super({ x, y, w, h });
    this.setImage(img);
  }
  setImage(img) {
    this.#img = img;
  }
  draw(ctx) {
    const $rect = this.getRect();
    ctx.drawImage(this.#img, $rect.x, $rect.y, $rect.w, $rect.h);
  }
}

export class Text extends Base {
  #text = "";
  constructor(pos, text) {
    super(pos);
    this.setText(text);
  }
  setText(text) {
    this.#text = text;
  }
  draw(ctx) {
    const $rect = this.getRect();
    ctx.fillStyle = "red";
    ctx.fillText(this.#text, $rect.x, $rect.y);
  }
}

export class Move extends Base {
  constructor({ x, y, w, h }, img) {
    super({ x, y, w, h });
  }
  left(target, x) {
    var line = target.x + target.w;
    if (
      this.$rect.x > target.x + target.w &&
      x <= target.x + target.w &&
      this.$rect.y + this.$rect.h >= target.y &&
      this.$rect.y <= target.y + target.h
    ) {
      return { next: line + 1 };
    }
  }
  right(target, x) {
    var line = target.x - this.$rect.w;
    if (
      this.$rect.x < line &&
      x >= line &&
      this.$rect.y + this.$rect.h >= target.y &&
      this.$rect.y <= target.y + target.h
    ) {
      return { next: line - 1 };
    }
  }
  up(target, y) {
    var line = target.y + target.h;
    if (
      this.$rect.y > line &&
      y <= line &&
      this.$rect.x + this.$rect.w >= target.x &&
      this.$rect.x <= target.x + target.w
    ) {
      return { next: line + 1 };
    }
  }
  down(target, y) {
    var line = target.y - this.$rect.h;
    if (
      this.$rect.y < line &&
      y >= line &&
      this.$rect.x + this.$rect.w >= target.x &&
      this.$rect.x <= target.x + target.w
    ) {
      return { next: line - 1 };
    }
  }
  handleObstacle(next, dir, i) {
    var self = this;
    this.ObstacleArray.forEach(function (arr) {
      this.arr.forEach(function (target, index) {
        if (
          self === target ||
          (self.hasDestoryAbility &&
            target.isMy === self.isMy &&
            (target.name === "tank" || target.hasDestoryAbility))
        ) {
          return;
        } else {
          var result = self[dir](target, next);
          if (result) {
            self.handlePengzhang(target, self, index, i);
            next = result.next;
          }
        }
      });
    });
    return next;
  }
  handlePengzhang(target, self, index, i) {
    if (self.hasDestoryAbility) {
      //   self.fatherArray.splice(i, 1);
      self.remove();
      BoomArray.push(new Boom(self));
      if (target.canBeDestoried) {
        target.remove();
        // target.fatherArray.splice(index, 1);
        target.destoryProps && BoomArray.push(new Boom(target));
      }
    }
  }
  move(keyMap) {
    var key = this.key;
    var keys = this.keys;
    var next;
    switch (key) {
      case keys.left:
        next = this.$rect.x - this.baseSpeed;
        this.$rect.x = this.handleObstacle(next, "left", i);
        break;
      case keys.right:
        next = this.$rect.x + this.baseSpeed;
        this.$rect.x = this.handleObstacle(next, "right", i);
        break;
      case keys.up:
        next = this.$rect.y - this.baseSpeed;
        this.$rect.y = this.handleObstacle(next, "up", i);
        break;
      case keys.down:
        next = this.$rect.y + this.baseSpeed;
        this.$rect.y = this.handleObstacle(next, "down", i);
        break;
    }
  }
  drawX(ctx) {
    ctx.save();
    ctx.translate(this.$rect.x + this.$rect.w / 2, this.$rect.y + this.$rect.h / 2);
    ctx.rotate(
      ([this.keys.up, this.keys.right, this.keys.down, this.keys.left].indexOf(
        this.face
      ) *
        Math.PI) /
      2
    );
    ctx.translate(-this.$rect.w / 2, -this.$rect.h / 2);
    ctx.drawImage(this.img, 0, 0, this.$rect.w, this.$rect.h);
    ctx.restore();
  }
}