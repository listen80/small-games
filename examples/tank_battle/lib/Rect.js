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
