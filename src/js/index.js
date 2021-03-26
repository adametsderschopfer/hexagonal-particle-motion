import Dot from './components/Dot.js';
import {createDirs, drawRect, loop, resizeCanvas} from "./functions.js";
import {cfg} from "./config.js";

function bootstrap() {
    const canva = document.getElementById('particle-motion');
    const ctx = canva.getContext('2d');

    const {cw, ch, cx, cy} = resizeCanvas(canva);

    let dirsList = createDirs();
    let dotsList = [];

    function dotsFactory() {
        if (dotsList.length < cfg.dotsCount && Math.random() > .8) {
            dotsList = [...dotsList, new Dot({ctx, x: cx, y: cy, dirsList})]
        }
    }

    function refreshDots() {
        dotsList.forEach((_dot, idx) => {
            _dot.move();
            _dot.redraw();
            _dot.changeDir();

            dotsList = _dot.destroy(dotsList, idx);
        })
    }

    loop(() => {
        drawRect({ctx, color: cfg.bgFillColor, x: 0, y: 0, w: cw, h: ch});

        dotsFactory();
        refreshDots();
    });
}

window.addEventListener('DOMContentLoaded', bootstrap);
