import {cfg} from "./config.js";

export function resizeCanvas(c) {
    if (!c) throw new Error('canvas is undefined')

    c.width = window.innerWidth;
    c.height = window.innerHeight;

    window.addEventListener('resize', () => {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
    })

    return {cw: c.width, ch: c.height, cx: c.width / 2, cy: c.height / 2};
}

export function drawRect({ctx, color, x, y, w, h, shadowColor, shadowBlur}) {
    ctx.shadowColor = shadowColor || 'black';
    ctx.shadowBlur = shadowBlur || '1';

    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

export function createDirs() {
    let dirsList = [];

    for (let i = 0; i !== 360; i += 360 / cfg.dirsCount) {
        let x = Math.cos(i * Math.PI / 180);
        let y = Math.sin(i * Math.PI / 180);

        dirsList = [...dirsList, {x, y}]
    }

    return dirsList;
}

export function loop(cb) {
    if (typeof cb === 'function')
        cb();

    requestAnimationFrame(() => {
        loop(cb)
    })
}
