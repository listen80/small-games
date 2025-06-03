export default class Controller {
  constructor() {
    this.keys = [];
    this.bind()
  }
  bind() {
    document.addEventListener("keydown", (e) => {
      this.keydown(e);
    });
  }
  keydown(e) {
    this.keys.push(e.key);
    // const key = e.key;
    // this.calcKey(key);
  }
  calcKey(key) {
    const x = {
      w: 'up',
      s: 'down',
      a: 'left',
      d: 'right',
      ' ': 'fire'
    }
    this.cmds[x[key]] = true;
  }
  registryKeys(cmdKeys) {
    this.cmdKeys = cmdKeys;
  }
  calc() {
    for (let key of this.keys) {
      for (let x in this.cmdKeys) {
        if (this.cmdKeys[x] === key) {
          this.cmds[x] = true;
        }
      }
    }
  }
  reset() {
    this.keys = [];
    this.cmds = {};
  }
}
