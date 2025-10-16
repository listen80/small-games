import { createSpriteImage } from '../utils.js'

const alienImages = ["img/planplay_1.png", "img/planplay_2.png", "img/planplay_3.png", "img/planplay_4.png", "img/planplay_5.png", "img/planplay_6.png", "img/planplay_7.png", "img/planplay_8.png", "img/planplay_9.png", "img/planplay_10.png", "img/planplay_11.png"];

function init(plane) {
    // 初始化摇杆
    const options = {
        zone: document.getElementById('joystick'),
        mode: 'dynamic',       // 动态模式，摇杆根据方向移动
        position: { left: '50%', top: '50%' }, // 居中显示
        // color: 'blue',        // 摇杆颜色
        size: 50,            // 摇杆区域大小
        threshold: 0.1,       // 触发事件的阈值
        fadeTime: 200         // 摇杆消失的过渡时间
    };

    // 创建摇杆实例
    const manager = nipplejs.create(options);
    // 监听摇杆事件
    manager.on('move', (evt, data) => {
        const direction = data.vector;
        // 根据方向移动飞机
        console.log(direction)
        const { x, y } = direction
        if (x === 0 || y === 0) {
            return
        }
        const speed = 3
        plane.x += x / Math.abs(x) * speed;
        plane.y -= y / Math.abs(y) * speed;
        // plane.play();
        console.log(plane.x, plane.y)
        if (plane.x >= 450) {
            plane.x = 450
        } else if (plane.x <= 50) {
            plane.x = 50
        }
        if (plane.y >= 650) {
            plane.y = 650
        }
    });
}
export function createPlane({ app, container, bg, grade, score, onDie, xue2 }) {
    const plane = PIXI.extras.AnimatedSprite.fromImages(alienImages);
    plane.visible = !true;
    plane.x = 200
    plane.y = 400
    plane.animationSpeed = 0.2;
    let playerLevel = 1;
    const max = 20;
    const bs = new Array(max).fill(0).map((v, index) => max - index)
    let scores = 0;
    let count = 0
    plane.name = 'plane'

    let shanscount = 0;
    let hp = 100;

    function setHp(v) {
        hp = v
        xue2.setset(v)
    }
    setHp(hp)

    function blingbling() {
        shanscount++;
        const rate = 4;
        const x = 0.1;
        plane.alpha = (shanscount % rate * x + (1 - x)) / rate
        if (shanscount === 60) {
            plane.alpha = 1;
            shanscount = 0
        }
    }

    function planeMove(event) {
        // debugger
        // if (gameStatus == 0) {
        //     return;
        // }
        var pos = event.data.getLocalPosition(app.stage);
        plane.x = pos.x;
        plane.y = pos.y;

        plane.anchor.set(0.5, 0.5);

        // plane.play();
        if (plane.x >= 450) {
            plane.x = 450
        } else if (plane.x <= 50) {
            plane.x = 50
        }
        if (plane.y >= 650) {
            plane.y = 650
        }
    }

    function createBbbb(plane, speed = {}) {
        var bullet = createSpriteImage("img/bullet_5.png", plane.x, plane.y - 30);
        bullet.anchor.set(0.5, 0.5);
        bullet.onUpdate = function () {
            bullet.y += speed.y || -6
            bullet.x += speed.x || 0
        }

        bullet.onCrash = (item) => {
            bullet.parent.removeChild(bullet)
            if (item.name === 'enemy') {
                scores++
                score.setTextsetText(scores)
            }
        }
        return bullet
    }
    function fire(plane) {
        return [createBbbb(plane), createBbbb(plane, { x: 1, y: -5 }), createBbbb(plane, { x: -1, y: -5 }),]
    }
    plane.onUpdate = () => {
        //发射子弹速度
        if (count >= (bs[playerLevel - 1] || 1)) {
            const bullets = fire(plane)
            //将生成的子弹都存储到数组中。
            // bulletlist.push(bullet);
            container.addChild(...bullets);
            count = 0;
        } else {
            count += 1;
        }
        if (shanscount) {
            blingbling()
        }
    }

    plane.onCrash = function (item) {
        if (item.name === 'item') {
            if (playerLevel < bs.length) {
                playerLevel += 1
            }
            grade.setTextsetText(playerLevel)

        } else {
            setHp(hp - 5)
            if (hp <= 0) {
                onDie()
            } else {
                shanscount = 1
            }
        }
    }

    grade.setTextsetText(playerLevel)
    score.setTextsetText(scores)

    if (gameStatus === 1) {
        init(plane)
    } else {
        bg.on("mousemove", planeMove);
    }

    return plane;
}
