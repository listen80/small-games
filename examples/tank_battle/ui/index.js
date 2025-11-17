// 场景
import Loading from "./Scene/Loading.js";
import Title from "./Scene/Title.js";
import Level from "./Scene/Level.js";
import Map from "./Scene/Map.js";

import { Engine } from "Engine";

export default class Game extends Engine {
  constructor() {
    super({
      scenes: {
        Loading,
        Title,
        Level,
        Map,
      }
    });
  }
}