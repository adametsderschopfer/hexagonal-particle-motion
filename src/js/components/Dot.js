import {drawRect} from "../functions.js";
import {cfg} from "../config.js";

class Dot {
    constructor({x, y, ctx, dirsList}) {
        this.pos = {x, y};
        this.initialPos = {x, y}
        this.ctx = ctx;
        this.dir = cfg.dirsCount === 6 ? (Math.floor(Math.random() * 3)) * 2 : Math.random() * cfg.dirsCount | 0;
        this.dirsList = dirsList;
        this.step = 0;
    }

    redraw() {
        let xy = Math.abs(this.pos.x - this.initialPos.x) + Math.abs(this.pos.y - this.initialPos.y);
        let makeHue = (cfg.hue + xy / cfg.gradientLength) % 360;
        let color = `hsl(${ makeHue }, 100%, 50%)`;
        let size = cfg.dotSizeDynamic ? cfg.dotSize - Math.sin(xy / 9) * 2 - Math.sin(xy / 2) : cfg.dotSize;
        let shadowBlur = cfg.dotSize - Math.sin(xy / 8) * 2;
        let x = this.pos.x - size / 2;
        let y = this.pos.y - size / 2;

        drawRect({ctx: this.ctx, color, x, y, w: size, h: size, shadowBlur, gco: 'lighter'});
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
