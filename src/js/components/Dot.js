import {drawRect} from "../functions.js";
import {cfg} from "../config.js";

class Dot {
    constructor({x, y, ctx, dirsList}) {
        this.pos = {x, y};
        this.ctx = ctx;
        this.dir = (Math.floor(Math.random() * 3)) * 2 ;
        this.dirsList = dirsList;
        this.step = 0;
    }

    redraw() {
        let shadowBlur = 4;
        let color = 'red';
        let size = cfg.dotSize;
        let x = this.pos.x - size / 2;
        let y = this.pos.y - size / 2;

        drawRect({ctx: this.ctx, color, x, y, w: size, h: size, shadowBlur});
    }

    changeDir() {
        if (this.step % cfg.stepsToTurn === 0) {
            this.dir = Math.random() > 0.5 ? (this.dir + 1) % cfg.dirsCount : (this.dir + cfg.dirsCount - 1) % cfg.dirsCount;
        }
    }

    move() {
        this.pos.x += this.dirsList[this.dir].x * cfg.dotVelocity;
        this.pos.y += this.dirsList[this.dir].y * cfg.dotVelocity;
        this.step += 1;
    }

    destroy(dotsList, idx) {
        let _dotsList = dotsList;
        let percent = Math.random() * Math.exp(this.step / cfg.distance);

        if (percent > 100) {
            _dotsList.splice(idx, 1);
        }

        return _dotsList
    }
}

export default Dot;
