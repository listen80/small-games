// engine
import Controller from "../lib/Controller.js";
import Canvas from "../lib/Canvas.js";
import Loader from "../lib/Loader.js";

// scene
import Loading from "../ui/Loading.js";
import Map from "../ui/Map.js";
import Title from "../ui/Title.js";
import Level from "../ui/Level.js";

class Game {
  constructor() {
    this.loader = new Loader();
    this.scenes = {
      Loading,
      Title,
      Map,
      Level,
    };
    this.loader.init(() => {
      this.initBase();
      this.loadResource();
    });
  }

  goto(name, data) {
    const Scene = this.scenes[name]
    this.setRenderRoot(new Scene(data));
  }

  initBase() {
    this.canvaser = new Canvas();
    this.controller = new Controller();
    this.goto('Loading')
    this.render();
  }

  loadResource() {
    this.loader.loadResource(() => {
      // this.goto('Title');
      this.goto('Map', { round: 1 });
    });
  }

  setRenderRoot(renderRoot) {
    this.renderRoot = renderRoot;
    renderRoot.setEngine(this)
    console.log(renderRoot)
  }

  render() {
    const render = () => {
      this.controller.calc();
      this.renderRoot.step(this.controller);
      this.controller.reset();
      this.canvaser.clear();
      this.renderRoot.draw(this.canvaser.ctx);
      requestAnimationFrame(render);
    };

    render();
  }
}

new Game();
