import Controller from "./Controller.js";
import Canvas from "./Canvas.js";
import Loader from "./Loader.js";
import Style from "./Style.js";
import Loading from "./Loading.js";
export class Engine {
  #scenes;
  constructor(all) {
    const { scenes, config, resource } = all
    this.all = all
    this.loader = new Loader();
    this.#scenes = { Loading };
    this.registryScenes(scenes);
    this.initBase(config);
    this.goto(resource ? 'Loading' : 'Title')
    this.render();
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
    this.canvaser = new Canvas(config);
    this.controller = new Controller(config);
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
