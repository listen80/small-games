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

    }
    onAppear($engine) {
        const imgs = $engine.loader.imgs
        this.src(imgs.water)
    }

}

export class Wall extends Spirit {
    constructor(x, y) {
        super({ x: x, y: y });
        this.canBeDestoried = true;
    }

    onAppear($engine) {
        const imgs = $engine.loader.imgs
        this.src(imgs.wall)
    }
}

export class Steel extends Spirit {
    constructor(x, y) {
        super({ x: x, y: y });

    }
    onAppear($engine) {
        const imgs = $engine.loader.imgs
        this.src(imgs.steel)
    }

}

export class Home extends Spirit {
    constructor(x, y) {
        super({ x: x, y: y });
    }
    onAppear($engine) {
        const imgs = $engine.loader.imgs
        this.src(imgs.home)
    }

}