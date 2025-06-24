import { Spirit } from "Engine";
export class Grass extends Spirit {
    constructor(x, y) {
        super({ x: x, y: y });
    }
    onAppear($engine) {
        const imgs = $engine.loader.imgs
        this.src(imgs.grass)
    }
}

export class Water extends Spirit {
    constructor(x, y) {
        super({ x: x, y: y });
        this.isPenetrated = false; // 标记是否被穿透，初始值为未被穿透
    }
    onAppear($engine) {
        const imgs = $engine.loader.imgs
        this.src(imgs.water)
    }

}

export class Wall extends Spirit {
    constructor(x, y) {
        super({ x: x, y: y });
        this.defense = 100;
    }

    onAppear($engine) {
        const imgs = $engine.loader.imgs
        this.src(imgs.wall)
    }
}

export class Steel extends Spirit {
    constructor(x, y) {
        super({ x: x, y: y });
        this.defense = 200;
    }
    onAppear($engine) {
        const imgs = $engine.loader.imgs
        this.src(imgs.steel)
    }
}


export class Ice extends Spirit {
    constructor(x, y) {
        super({ x: x, y: y, z: -1 });
    }
    onAppear($engine) {
        const imgs = $engine.loader.imgs
        this.src(imgs.ice)
    }
}


export class Home extends Spirit {
    constructor(x, y) {
        super({ x: x, y: y, w: 2, h: 2 });
    }
    onAppear($engine) {
        const imgs = $engine.loader.imgs
        this.src(imgs.home)
    }

}