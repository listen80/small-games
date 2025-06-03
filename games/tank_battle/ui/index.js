// scene
import Loading from "./Scene/Loading.js";
import Map from "./Scene/Map.js";
import Title from "./Scene/Title.js";
import Level from "./Scene/Level.js";

import { Game } from "../lib/index.js";

export default class TANK_SSSS extends Game {
  constructor() {
    super();
    this.registryScenes({
      Loading,
      Title,
      Map,
      Level,
    })
  }
}