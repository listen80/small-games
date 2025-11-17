// 场景
import * as config from "Data/size.js";
import * as resource from "Data/resource.js";

import Title from "Scene/Title.js";
import Level from "Scene/Level.js";
import Map from "Scene/Map.js";

import { Engine, Node } from "Engine";

Node.boxSize = config.BOX_SIZE;

export default class Game extends Engine {
  constructor() {
    super({
      scenes: {
        Title,
        Level,
        Map,
      },
      config,
      resource,
    });
  }
}

console.log(new Game());