import Controller from "./Controller.js";
import Canvas from "./Canvas.js";
import Loader from "./Loader.js";

export class Engine {
  #scenes;
  constructor({ scenes, config, resource }) {
    this.loader = new Loader();
    this.#scenes = {};
    this.registryScenes(scenes);
    this.loader.init(() => {
      this.initBase(config);
      this.goto('Loading')
      this.render();
      this.loadResource(resource);
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
  }

  initBase(config) {
    this.canvaser = new Canvas(config);
    this.controller = new Controller(config);
    
  }

  loadResource(resource) {
    this.loader.loadResource(resource, () => {
      this.goto('Title');
    });
  }

  render() {
    const render = () => {
      // this.controller.calc();
      const now = performance.now();
      const dt = now - (this._lastTime || now);
      this._lastTime = now;
      this.renderRoot.step(this.controller, dt);
      // this.controller.reset();
      this.canvaser.clear();
      this.renderRoot.draw(this.canvaser.ctx);
      // console.log(this.renderRoot )
      requestAnimationFrame(render);
    };

    render();
  }
}
