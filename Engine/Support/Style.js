const style = `
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  background-color: #eee;
}

canvas {
  box-shadow: 7px 7px 7px 0 #bbb;
}
`

export default class Style {
  constructor() {
    // 创建并注入样式
    const styleEl = document.createElement('style');
    styleEl.textContent = style;
    document.head.appendChild(styleEl);
  }
}