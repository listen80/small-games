export default class Controller {
  constructor() {
    this.keys = new Set();
    this.bind()
  }
  bind() {
    document.addEventListener("keydown", (e) => {
      this.keydown(e);
    });
    document.addEventListener("keyup", (e) => {
      this.keyup(e);
    });
  }
  keydown(e) {
    this.keys.add(e.key);
  }
  keyup(e) {
    this.keys.delete(e.key);
  }
  has(key) {
    return this.keys.has(key)
  }
  calcKey(key) {

  }
  registryKeys(cmdKeys) {
  }
  calc() {

  }
  reset() {
    this.keys.clear();
  }
}
