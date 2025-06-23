import { Group } from "Engine";

import { maps } from "Data/maps.js";

import { Grass, Water, Steel, Home, Wall } from "Com/MapBlock.js";
import { Enemy } from "Com/Enemy.js";
import { Player } from "Com/Player.js";

export default class Map extends Group {
  constructor({ round = 1 } = {}) {
    super();
    this.round = round;
    this.map = maps[this.round];
  }
  onAppear($engine) {
    this.imgs = $engine.loader.imgs;
    this.createManyLayer();
    this.createBoard();
    this.createPlayer1P();
    // this.createPlayer2P();
    // this.createEnemy();
  }
  createManyLayer() {
    // 创建游戏层级 草 墙 水 玩家 敌人 爆炸 子弹 钢板
    this.wallArray = new Group();
    this.steelArray = new Group();
    this.grassArray = new Group();
    this.waterArray = new Group();
    this.iceArray = new Group();
    this.playerArray = new Group();
    this.enemyArray = new Group();
    this.boomArray = new Group();
    this.bulletArray = new Group();

    this.add(
      this.wallArray,
      this.steelArray,
      this.grassArray,
      this.waterArray,
      this.iceArray,

      this.playerArray,
      this.enemyArray,
      this.boomArray,
      this.bulletArray,
    );
  }
  createBoard() {
    const map = this.map;
    for (var y = 0; y < map.length; y++) {
      for (var x = 0; x < map[y].length; x++) {
        switch (map[y][x]) {
          case 1:
            this.wallArray.add(new Wall(x, y));
            break;
          case 2:
            this.steelArray.add(new Steel(x, y));
            break;
          case 3:
            this.grassArray.add(new Grass(x, y));
            break;
          case 4:
            this.waterArray.add(new Water(x, y));
            break;
          case 5:
            // todo ice 冰
            this.grassArray.add(new Grass(x, y));
            break;
          case 9:
            this.wallArray.add(new Home(x, y));
            break;
          default:
            break;
        }
      }
    }
  }
  createFire(player) {
    console.log("createFire", player);
    // this.bulletArray.add(new Bullet(player));
  }
  createPlayer1P() {
    const player = new Player(
      "1p",
      8,
      24,
      this.imgs.p1,
      {
        up: "w",
        right: "d",
        down: "s",
        left: "a",
        fire: " ",
      },
    );
    this.playerArray.add(player);
  }
  createPlayer2P() {
    const player = new Player(
      "2p",
      8,
      24,
      this.imgs.p1,
      {
        up: "up",
        right: "right",
        down: "down",
        left: "left",
        fire: "shift",
      },
    );
    this.playerArray.add(player);
  }
  createEnemy() {
    const { imgs } = this;
    this.enemyArray.add(
      new Enemy(0, 0, imgs),
      new Enemy(12, 0, imgs),
      new Enemy(24, 0, imgs)
    );
  }
}
