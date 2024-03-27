import { Point } from "../../../primitives/point.js";

class DataflowPoint extends Point {

    constructor(id, x, y, classname = "flow point", fillColor = "rgb(63,83,217)"){
        super(x, y);
        this.classname = classname;
        this.color = "rgb(122,207,245)";
        this.fillColor  = fillColor;
        this.id = id;

        this.width = 180;
        this.height = 120;

        this.width =  Math.max(this.width, classname.length * 9);

        this.isEditing = false;
        this.inputValue = classname;
    }

    equals(point){
        return this.x == point.x && this.y == point.y;
    }

    setClassName(name){
        this.classname = name;
    }

    editName() {
        this.isEditing = true;
    }
    saveName() {
        this.isEditing = false;
        this.classname = this.inputValue;
    }

    drawName(ctx){
        ctx.fillStyle = "white";
        ctx.font = '25px Arial'

        const textWidth = ctx.measureText(this.classname).width;

        ctx.fillText(this.classname, this.x + (this.width - textWidth) / 2, this.y + this.height / 2);
    }

    drawSelected(ctx){
        this.color = "orange";
    }

    draw(ctx, {outline = false} = {}){
        if(outline){
            this.drawSelected(ctx)
        }else{
            this.color = this.fillColor;
        }
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeStyle = "white"
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width + 2, this.height + 2)
        ctx.fill();
        
        this.drawName(ctx);

        // Render input field if editing is enabled
        if (this.isEditing) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillRect(this.x, this.y, this.width, this.height);

            ctx.fillStyle = "black";
            ctx.font = '25px Arial'
            ctx.fillText(this.inputValue, this.x + 10, this.y + this.height / 2);
        }
    }

    // Method to handle input value change
    handleInputChange(event) {
        this.inputValue = event.target.value;
    }

}

export {
    DataflowPoint
}