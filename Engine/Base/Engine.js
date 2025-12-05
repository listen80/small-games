import Style from "../Support/Style.js";

import Loader from "../Support/Loader.js";
import Canvas from "./Canvas.js";
import Sound from "./Sound.js";

import Controller from "./Controller.js";


export class Engine {
  #scenes = {};
  #lastTime = 0;
  constructor(all) {
    const { scenes, config, resource } = all
    this.all = all
    this.initBase(config);
    this.#scenes = {};
    this.registryScenes(scenes);
    this.render();
    this.goto(resource ? 'Loading' : 'Title')
  }

  registryScenes(allScenes) {
    this.#scenes = {
      ...this.#scenes,
      ...allScenes
    };
  }

  goto(name, data) {
    const Scene = this.#scenes[name]
    if (!Scene) {
      throw new Error(`场景${name}不存在`);
    }
    const root = new Scene(data);
    this.renderRoot = root;
    root.setEngine(this)
  }

  initBase(config) {
    this.style = new Style(config);
    this.loader = new Loader(config);
    this.canvaser = new Canvas(config, this.loader);
    this.sound = new Sound(config, this.loader);
    this.controller = new Controller(config);
  }

  render() {
    const render = () => {
      // this.controller.calc();
      const now = performance.now();
      const dt = now - (this.#lastTime || now);
      this.#lastTime = now;
      if (this.renderRoot) {
        this.renderRoot.step(this.controller, dt);
        // this.controller.reset();
        this.canvaser.clear();
        this.renderRoot.draw(this.canvaser.ctx);
        // console.log(this.renderRoot )
      }
      requestAnimationFrame(render);
    };

    render();
  }
}

