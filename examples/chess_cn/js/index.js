// 导入象棋逻辑模块
import Chess from "./Chess/index.js";
import GUI from "./GUI/index.js";

// 创建一个象棋实例，并开启 AI 日志功能
const chess = new Chess({
  AIlog: true,
});
const gui = new GUI(chess);
console.log(gui)
