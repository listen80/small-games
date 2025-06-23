import { BOX_SIZE } from "Data/size.js"
import { Spirit } from "Engine";
export class Grass extends Spirit {
    constructor(x, y) {
        super({ x: x * BOX_SIZE, y: y * BOX_SIZE, w: BOX_SIZE, h: BOX_SIZE });
    }
    onAppear($engine) {
        const imgs = $engine.loader.imgs
        this.src(imgs.grass)
    }
}

export class Water extends Spirit {
    constructor(x, y) {
        super({ x: x * BOX_SIZE, y: y * BOX_SIZE, w: BOX_SIZE, h: BOX_SIZE });

    }
    onAppear($engine) {
        const imgs = $engine.loader.imgs
        this.src(imgs.water)
    }

}

export class Wall extends Spirit {
    constructor(x, y) {
        super({ x: x * BOX_SIZE, y: y * BOX_SIZE, w: BOX_SIZE, h: BOX_SIZE });
        this.canBeDestoried = true;
    }

    onAppear($engine) {
        const imgs = $engine.loader.imgs
        this.src(imgs.wall)
    }
}

export class Steel extends Spirit {
    constructor(x, y) {
        super({ x: x * BOX_SIZE, y: y * BOX_SIZE, w: BOX_SIZE, h: BOX_SIZE });

    }
    onAppear($engine) {
        const imgs = $engine.loader.imgs
        this.src(imgs.steel)
    }

}

export class Home extends Spirit {
    constructor(x, y) {
        super({ x: x * BOX_SIZE, y: y * BOX_SIZE, w: BOX_SIZE * 2, h: BOX_SIZE * 2 });
    }
    onAppear($engine) {
        const imgs = $engine.loader.imgs
        this.src(imgs.home)
    }

}