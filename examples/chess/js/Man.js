import values from "./values.js";
import { bylaw } from "./bylaw.js";

export function Man({ y, x, my, type, img, key }) {
  this.x = x;
  this.y = y;
  this.my = my;
  this.type = type;
  this.img = img;
  this.key = key;
  this.checked = false;
  this.values = this.my ? values[this.type] : values[this.type].slice().reverse();

  this.val = function () {
    return this.values[this.y][this.x];
  };
  this.pace = function () {
    return bylaw[this.type](map, this.y, this.x, this.my);
  };
  this.goto = function (y, x, fn) {
    delete map[this.y][this.x];
    var eat = map[y][x];
    map[y][x] = this.key;

    this.checked = false;
    this.y = y;
    this.x = x;
    fn && fn(eat);
    return eat;
  };
  this.check = function () {
    if (preman) {
      preman.checked = false;
    }
    pace = this.pace(this.y, this.x);
    this.paces = pace;
    preman = this;
    this.checked = true;
  };
  this.ablego = function (y, x) {
    var v;
    for (var i in this.paces) {
      v = this.paces[i];
      if (v.y === y && v.x === x) {
        return true;
      }
    }
    return false;
  };
}