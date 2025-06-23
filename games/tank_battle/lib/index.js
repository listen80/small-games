// engine
import Controller from "./Controller.js";
import Canvas from "./Canvas.js";
import Loader from "./Loader.js";

export * from './Base.js'

export class Engine {
  #scenes;
  constructor() {
    this.loader = new Loader();
    this.#scenes = {};
    this.loader.init(() => {
      this.initBase();
      this.loadResource();
    });
  }

  registryScenes(allScenes) {
    this.#scenes = {
      ...this.#scenes,
      ...allScenes
    };
  }

  goto(name, data) {
    const Scene = this.#scenes[name]
    const root = new Scene(data);
    this.renderRoot = root;
    root.setEngine(this)
    console.log(name, root)
  }

  initBase() {
    this.canvaser = new Canvas();
    this.controller = new Controller();
    this.goto('Loading')
    this.render();
  }

  loadResource() {
    this.loader.loadResource(() => {
      this.goto('Map');
    });
  }

  render() {
    const render = () => {
      // this.controller.calc();
      this.renderRoot.step(this.controller);
      // this.controller.reset();
      this.canvaser.clear();
      this.renderRoot.draw(this.canvaser.ctx);
      requestAnimationFrame(render);
    };

    render();
  }
}
