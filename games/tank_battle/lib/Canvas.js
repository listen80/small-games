import { GAME_WIDTH, GAME_HEIGHT, BOX_SIZE } from "../data/size.js";
const width = BOX_SIZE * GAME_WIDTH;
const height = BOX_SIZE * GAME_HEIGHT;
export default class Canvas {
  constructor() {
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    this.ctx = ctx;

    canvas.width = width;
    canvas.height = height;
    ctx.font = "bold 30px Arial";
    ctx.textAlign = "center";
    this.canvas = canvas;
  }
  clear() {
    const { ctx } = this;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
