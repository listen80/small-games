export class Base {
  #parent = null;
  #root = null;
  // #x = 0;
  // #y = 0;
  // #w = 0;
  // #h = 0;
  constructor({ x = 0, y = 0, w = 0, h = 0 } = {}) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  setParent(p) {
    this.#parent = p;
    console.log(p)
    this.#root = p.#root;
  }
  getParent() {
    return this.#parent;
  }
  remove() {
    this.#parent.removeChild(this);
  }
  getRoot() {
    return this.#root;
  }
  setRoot(root) {
    this.#root = root;
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
      debugger
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
}

export class Spirit extends Base {
  #img = null;
  constructor(x, y, w, h, img) {
    super({ x, y, w, h });
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.setImage(img);
  }
  setImage(img) {
    this.img = img;
  }
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
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
    ctx.fillStyle = "red";
    ctx.fillText(this.#text, this.x, this.y);
  }
}
