// engine
import Controller from "../lib/Controller.js";
import Canvas from "../lib/Canvas.js";
import Loader from "../lib/Loader.js";
import { Group, Text } from "../lib/Base.js";

// scene
import Loading from "../ui/Loading.js";
import Map from "../ui/Map.js";
import Title from "../ui/Title.js";
import Level from "../ui/Level.js";

class Game {
  constructor() {
    this.loader = new Loader();
    this.loader.init(() => {
      this.initBase();
      this.initGame();
    });
    console.log(this)
  }

  gotoTitle(args) {
    this.setRenderRoot(
      new Title(() => {
        this.gotoMap(args);
      })
    );
  }

  gotoLevel() {
    this.setRenderRoot(
      new Level(() => {
        this.gotoMap();
      })
    );
  }

  gotoMap(args) {
    this.setRenderRoot(new Map(args, this.loader));
  }

  initBase() {
    this.canvaser = new Canvas();
    this.controller = new Controller();
    this.setRenderRoot(new Loading());
    this.render();
  }

  initGame() {
    this.loader.loadResource(() => this.gotoTitle());
  }

  setRenderRoot(renderRoot) {
    this.renderRoot = renderRoot;
    renderRoot.setEngine(this)
    console.log(renderRoot)
  }

  render() {
    const render = () => {
      // this.renderRoot.emit();
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
