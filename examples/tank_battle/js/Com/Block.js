import { Spirit } from "Engine";

// 草地图块 - 可以隐藏坦克
export class Grass extends Spirit {
    constructor(x, y) {
        super({ x, y });
    }
    
    onAppear($engine) {
        const imgs = $engine.loader.imgs;
        this.src(imgs.grass);
    }
}

// 水地图块 - 不可穿透
export class Water extends Spirit {
    constructor(x, y) {
        super({ x, y });
        this.isPenetrated = false; // 标记是否被穿透
    }
    
    onAppear($engine) {
        const imgs = $engine.loader.imgs;
        this.src(imgs.water);
    }
}

// 墙地图块 - 可以被炮弹摧毁
export class Wall extends Spirit {
    constructor(x, y) {
        super({ x, y });
        this.defense = 100; // 防御值
    }
    
    onAppear($engine) {
        const imgs = $engine.loader.imgs;
        this.src(imgs.wall);
    }
}

// 钢地图块 - 不可被摧毁
export class Steel extends Spirit {
    constructor(x, y) {
        super({ x, y });
        this.defense = 200; // 防御值
    }
    
    onAppear($engine) {
        const imgs = $engine.loader.imgs;
        this.src(imgs.steel);
    }
}

// 冰地图块 - 使坦克滑动
export class Ice extends Spirit {
    constructor(x, y) {
        super({ x, y, z: -1 });
    }
    
    onAppear($engine) {
        const imgs = $engine.loader.imgs;
        this.src(imgs.ice);
    }
}

// 基地地图块 - 游戏目标
export class Home extends Spirit {
    constructor(x, y) {
        super({ x, y, w: 2, h: 2 });
    }
    
    onAppear($engine) {
        const imgs = $engine.loader.imgs;
        this.src(imgs.home);
    }
}