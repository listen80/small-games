import { Group, Text, Array2, Color } from "Engine";

import { maps } from "Data/maps.js";

import { Grass, Water, Steel, Home, Wall, Ice } from "Com/Block.js";
import { Enemy } from "Com/Enemy.js";
import { Player } from "Com/Player.js";

import { Bullet } from "Com/Tank.js";

export class MapBlack extends Group {
  constructor({ round = 0 } = {}) {
    super();
    this.rect({ x: 2, y: 1 });
    this.round = round;
    this.map = maps[this.round];
  }
  
  onAppear($engine) {
    this.imgs = $engine.loader.imgs;
    this.createLayers();
    this.createBoard();
    this.createPlayer1P();
    // this.createPlayer2P();
    // this.createEnemy();
  }
  
  calcCollisions(block, dist) {
    const rect = block.rect();
    const { x, y } = dist;
    const { w, h } = rect;
    const result = new Set(); // Use Set to avoid duplicate collisions
    
    // Get the map dimensions
    const mapHeight = this.map2Array.map.length;
    const mapWidth = mapHeight > 0 ? this.map2Array.map[0].length : 0;
    
    // Check each corner of the tank's new position
    const checkPoints = [
      { x: x, y: y },
      { x: x + w - 1, y: y },
      { x: x, y: y + h - 1 },
      { x: x + w - 1, y: y + h - 1 }
    ];
    
    for (const point of checkPoints) {
      // Skip if point is out of bounds
      if (point.x < 0 || point.x >= mapWidth || point.y < 0 || point.y >= mapHeight) {
        continue;
      }
      
      const row = this.map2Array.map[point.y];
      const cell = row[point.x];
      
      if (cell && cell.size()) {
        const obstacle = cell.find(() => true);
        result.add(obstacle);
      }
    }
    
    // Convert Set back to Array
    return Array.from(result);
  }
  
  createFire(player) {
    const bullet = new Bullet({
      x: player.x,
      y: player.y,
      face: player.face,
      keys: player.keys,
      baseSpeed: player.speed,
      isMy: player.isMy,
      img: {
        bullet: this.imgs.bullet,
        blast: this.imgs.blast
      }
    });
    this.bulletArray.add(bullet);
    // $engine.audio.play('attack');
  }
  
  createLayers() {
    // Create game layers: grass, wall, water, player, enemy, explosion, bullet, steel
    this.playerArray = new Group();
    this.enemyArray = new Group();
    this.boomArray = new Group();
    this.bulletArray = new Group();
    this.grassArray = new Group();
    this.info = new Group();
    
    this.info.rect({ x: 28, y: 26 });
    this.info.add(new Text({}, this.round + 1));
    this.map2Array = new Array2(this.map);

    this.add(
      this.map2Array,
      this.playerArray,
      this.enemyArray,
      this.boomArray,
      this.bulletArray,
      this.grassArray,
      this.info
    );
  }
  createBoard() {
    const map = this.map;
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const current = new Group();
        current.rect({ y, x });
        this.map2Array.map[y][x] = current;
        
        switch (map[y][x]) {
          case 1:
            current.add(new Wall());
            break;
          case 2:
            current.add(new Steel());
            break;
          case 3:
            this.grassArray.add(new Grass(x, y));
            break;
          case 4:
            current.add(new Water());
            break;
          case 5:
            current.add(new Ice());
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
      }
    );
    this.playerArray.add(player);
  }
  
  createPlayer2P() {
    const player = new Player(
      "2p",
      8,
      24,
      this.imgs.p2,
      {
        up: "up",
        right: "right",
        down: "down",
        left: "left",
        fire: "shift",
      }
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

export default class Map extends Group {
  constructor({ round = 1 } = {}) {
    super();
    this.rect({ x: 0, y: 0 });
    this.round = round;
    this.map = maps[this.round];
  }
  
  onAppear($engine) {
    this.grayBg = new Color({}, "gray");
    this.grayBg.rect({ x: 0, y: 0, w: 32, h: 28 });
    
    this.blackBg = new Color({}, "black");
    this.blackBg.rect({ x: 2, y: 1, w: 26, h: 26 });

    this.mapBlack = new MapBlack({ round: this.round });
    this.add(this.grayBg, this.blackBg, this.mapBlack);
  }
}