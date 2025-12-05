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
