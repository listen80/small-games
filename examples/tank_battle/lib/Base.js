/**
 * 缓动动画工具类
 * 提供常用缓动函数及动画驱动方法
 */
export class Ease {
  /**
   * 构造器
   * @param {Object} data 初始化配置（可选）
   * @param {number} data.duration 默认动画时长(ms)，默认 300
   * @param {Function} data.timing 默认缓动函数，默认 Ease.linear
   */
  constructor(data = {}) {
    this.duration = data.duration ?? 300;
    this.timing = data.timing ?? Ease.linear;
  }

  /**
   * 线性缓动
   * @param {number} t 当前时间 0~1
   * @returns {number}
   */
  static linear(t) {
    return t;
  }

  /**
   * 二次方缓入
   * @param {number} t 当前时间 0~1
   * @returns {number}
   */
  static quadIn(t) {
    return t * t;
  }

  /**
   * 二次方缓出
   * @param {number} t 当前时间 0~1
   * @returns {number}
   */
  static quadOut(t) {
    return t * (2 - t);
  }

  /**
   * 二次方缓入缓出
   * @param {number} t 当前时间 0~1
   * @returns {number}
   */
  static quadInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  /**
   * 创建一个缓动动画
   * @param {Object} target 目标对象
   * @param {Object} to 目标属性键值对
   * @param {Object} opts 可选配置
   * @param {number} opts.duration 动画时长(ms)
   * @param {Function} opts.timing 缓动函数
   * @param {Function} opts.onUpdate 每帧更新回调
   * @param {Function} opts.onComplete 完成回调
   * @returns {string} 动画 id，可用于手动停止
   */
  to(target, to, opts = {}) {
    this.opts = opts;
    this.duration = opts.duration ?? this.duration;
    this.timing = opts.timing ?? this.timing;
    this.from = {};
    this.elapsed = 0;
    this.to = to;
    this.target = target;
    // 记录初始值
    for (const key in to) {
      this.from[key] = target[key];
    }
    return this
  }

  update(dt) {
    if (this.elapsed / this.duration === 1) {
      return
    }
    this.elapsed += dt;
    let t = this.elapsed / this.duration;
    if (t >= 1) t = 1;
    const eased = this.timing(t);

    for (const key in this.to) {
      const start = this.from[key];
      const end = this.to[key];
      this.target[key] = start + (end - start) * eased;
    }

    this.opts.onUpdate?.(this.target);

    if (t < 1) {
    } else {
      this.opts.onComplete?.(this.target);
    }
  }
}

const size = 30;
export class Rect {
  constructor(rect) {
    if (rect) {
      this.set(rect)
    }
  }
  set({ x, y, z = 0, w, h }) {
    this.z = z;
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
    this.x += x;
    this.y += y;
  }
  equal(rect) {
    return this.x === rect.x && this.y === rect.y
  }
  to(dist, opts = {}) {
    debugger
    this.dist = dist;
    this.opts = opts;
    this._animations = true
  }
  step(controller) {
    if (!this._animations) {
      return;
    }
    debugger
    const elapsed = now - startTime;
    let t = elapsed / duration;
    if (t >= 1) t = 1;
    const eased = this.opts.timing(t);
    for (const key in this.dist) {
      const start = this[key];
      const end = this.dist[key];
      this[key] = start + (end - start) * eased;
    }
    if (t === 1) {
      this._animations = false;
      this.opts.onComplete?.(this);
    }
    // for (const key in to) {
    //   const start = from[key];
    //   const end = to[key];
    //   // this.#rect[key] = start + (end - start) * eased;
    // }
  }
}

export class Animate extends Rect {
  constructor({ x = 0, y = 0, w = 0, h = 0, z } = {}) {
    super({ x, y, w, h, z });
  }
}

export class Base {
  #parent = null;
  #engine = null;
  #rect = { x: 0, y: 0, w: 0, h: 0 }
  constructor({ x = 0, y = 0, w = 0, h = 0, z } = {}) {
    this.#rect = new Rect({ x, y, w, h, z });
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
  constructor({ x, y, w, h, z }, img) {
    super({ x, y, w, h, z });

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
    // debugger
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