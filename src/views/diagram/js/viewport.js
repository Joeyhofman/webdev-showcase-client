import { Point } from "./primitives/point";
import { scale, add, subtract } from "./math/utils";

class Viewport {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.zoom = 1;
        this.center = new Point(this.canvas.width / 2, this.canvas.height / 2);
        this.offset =  scale(this.center, -1);
        this.drag = {
            start: new Point(0, 0),
            offset: new Point(0, 0),
            end: new Point(0, 0),
            active: false
        };
        this.#addEventListeners();
    }

    reset(){
        this.ctx.restore();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.center.x, this.center.y);
        this.ctx.scale(1 / this.zoom, 1 / this.zoom);
        const offset = this.getOffset();
        this.ctx.translate(offset.x, offset.y);
    }

    getMouse(evt){
        return new Point(evt.offsetX * this.zoom, evt.offsetY * this.zoom)
    }

    getOffset(){
        return add(this.offset, this.drag.offset);
    }

    #addEventListeners(){
        this.canvas.addEventListener("wheel", (evt) => {
            const direction = Math.sign(evt.deltaY);
            const setpSize = 0.1;
            this.zoom += direction * setpSize;
            this.zoom = Math.max(1, Math.min(5, this.zoom));
        });
        
        this.canvas.addEventListener("mousedown", (evt) => {
            if(evt.button == 0){
                this.drag.start = this.getMouse(evt)
                this.drag.active = true;
            }
        });
        
        this.canvas.addEventListener("mousemove", (evt) => {
            if(this.drag.active){
                this.drag.end = this.getMouse(evt);
                this.drag.offset = subtract(this.drag.end, this.drag.start);
            }
        });
        
        this.canvas.addEventListener("mouseup", (evt) => {
            if(this.drag.active){
                this.offset = add(this.offset, this.drag.offset);
                this.drag = {
                    start: new Point(0, 0),
                    offset: new Point(0, 0),
                    end: new Point(0, 0),
                    active: false
                };
            }
        });
    }
}

export {
    Viewport
}