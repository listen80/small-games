// scene
import Loading from "./Scene/Loading.js";
import Map from "./Scene/Map.js";
import Title from "./Scene/Title.js";
import Level from "./Scene/Level.js";

import { Engine } from "Engine";

export default class Game extends Engine {
  constructor() {
    super();
    this.init()
  }
  init() {
    this.registryScenes({
      Loading,
      Title,
      Map,
      Level,
    })
  }
}