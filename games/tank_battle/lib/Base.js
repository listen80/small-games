export class Ease {
  constructor(data) {
    console.log(data)
  }
}

const size = 30;
export class Rect {
  constructor(rect) {
    if (rect) {
      this.set(rect)
    }
  }
  set({ x, y, w, h }) {
    if (typeof x === "number") {
      this.x = x;
    }
    if (typeof y === "number") {
      this.y = y;
    }
    if (typeof w === "number") {
      this.w = w;
    }
    if (typeof h === "number") {
      this.h = h;
    }

  }
  multi(n) {
    this.x *= n;
    this.y *= n;
    this.w *= n;
    this.h *= n;
  }
  add(rect) {
    const { x = 0, y = 0 } = rect
  }
  equal(rect) {
    return this.x === rect.x && this.y === rect.y
  }
}
export class Base {
  #parent = null;
  #engine = null;
  #rect = { x: 0, y: 0, w: 0, h: 0 }
  constructor({ x = 0, y = 0, w = 0, h = 0 } = {}) {
    this.#rect = new Rect({ x, y, w, h });
  }
  move(rect) {
    const { x = 0, y = 0 } = rect
    const _rect = new Rect({ x: this.#rect.x, y: this.#rect.y })
    _rect.x += x
    _rect.y += y
    return _rect;
  }
  rect(rect) {
    if (rect) {
      this.#rect.set(rect)
    }
    return this.#rect;
  }
  setParent(p) {
    this.#parent = p;
    if (p) {
      this.#engine = p.#engine;
    } else {
      this.#engine = null
    }
  }
  parent() {
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
  size() {
    return this.#children.length
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
  find(func) {
    return this.#children.find(func);
  }
  reset() {
    this.#children.splice(0, this.length);
  }
  step(controller) {
    this.#children.forEach((child, i) => {
      child.step?.(controller);
    });
  }
  draw(ctx) {
    const rect = this.rect()
    ctx.translate(rect.x * size, rect.y * size)
    this.#children.forEach((child, i) => {
      child.draw?.(ctx, i);
    });
    ctx.translate(-rect.x * size, -rect.y * size)

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
    this.src(img);
  }
  src(img) {
    this.#img = img;
  }
  draw(ctx) {
    const $rect = this.rect();
    ctx.drawImage(this.#img, $rect.x * size, $rect.y * size, ($rect.w || 1) * size, ($rect.h || 1) * size);
  }
}

export class Text extends Base {
  #text = "";
  constructor(pos, text) {
    super(pos);
    this.val(text);
  }
  val(text) {
    this.#text = text;
  }
  draw(ctx) {
    const $rect = this.rect();
    ctx.fillStyle = "red";
    ctx.fillText(this.#text, $rect.x * size, $rect.y * size);
  }
}

export class Move extends Group {
  constructor({ x, y, w, h }, img) {
    super();
    this.rect({ x, y, w, h })
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
  movex(keyMap) {
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