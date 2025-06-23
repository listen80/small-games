import { Group, Base } from "Engine";

import { maps } from "Data/maps.js";

import { Grass, Water, Steel, Home, Wall } from "Com/MapBlock.js";
import { Enemy } from "Com/Enemy.js";
import { Player } from "Com/Player.js";

export default class Map extends Group {
  constructor({ round = 12 } = {}) {
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
  calcColxss(block, dist) {
    const rect = block.rect()
    const { x, y } = dist
    const { w, h } = rect
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        const row = this.xxxxArray.map[y + j]
        if (!row) {
          return true
        }
        const b = row[x + i]
        if (!b) {
          return true
        }
        if (b.size()) {
          b.find(() => true).remove()
          return true
        }
      }
    }
  }
  createManyLayer() {
    // 创建游戏层级 草 墙 水 玩家 敌人 爆炸 子弹 钢板
    class Array2 extends Base {
      constructor(map) {
        super()
        this.map = JSON.parse(JSON.stringify(map))
      }
      draw(ctx) {
        for (let i = 0; i < this.map.length; i++) {
          for (let j = 0; j < this.map[i].length; j++) {
            this.map[i][j].draw(ctx)
          }
        }
      }
      setEngine(engine) {
        super.setEngine(engine);
        for (let i = 0; i < this.map.length; i++) {
          for (let j = 0; j < this.map[i].length; j++) {
            this.map[i][j].setEngine(engine)
          }
        }
      }
    }
    this.wallArray = new Group();
    this.steelArray = new Group();
    this.grassArray = new Group();
    this.waterArray = new Group();
    this.iceArray = new Group();
    this.playerArray = new Group();
    this.enemyArray = new Group();
    this.boomArray = new Group();
    this.bulletArray = new Group();
    this.xxxxArray = new Array2(this.map);

    this.add(
      this.wallArray,
      this.steelArray,
      this.waterArray,
      this.iceArray,
      this.xxxxArray,
      this.playerArray,
      this.enemyArray,
      this.boomArray,
      this.bulletArray,

      this.grassArray,
    );
  }
  createBoard() {
    const map = this.map;
    for (var y = 0; y < map.length; y++) {
      for (var x = 0; x < map[y].length; x++) {
        const current = new Group()
        current.rect({ y, x })
        current.name = 'fuck' + y + x
        this.xxxxArray.map[y][x] = current
        switch (map[y][x]) {
          case 1:
            current.add(new Wall());
            break;
          case 2:
            current.add(new Steel());
            break;
          case 3:
            this.grassArray.add(new Grass({ x, y }));
            break;
          case 4:
            current.add(new Water());
            break;
          case 5:
            // todo ice 冰
            current.add(new Grass());
            break;
          case 9:
            current.add(new Home());
            break;
          default:
            break;
        }
      }
    }
  }
  createFire(player) {
    // console.log("createFire", player);
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
