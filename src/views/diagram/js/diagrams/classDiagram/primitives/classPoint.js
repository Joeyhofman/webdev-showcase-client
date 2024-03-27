class ClassPoint extends Point {

    constructor(x, y, classname = "class", properties = [], operations = []){
        super(x, y);
        this.classname = classname;
        this.properties = properties;
        this.operations = operations;
        this.color = "rgb(122,207,245)";

        this.width = 150;
        this.height = this.width * 1.2;

        this.width =  Math.max(this.width, classname.length * 9)

        // this.addProperty("+", "myproperty", "DateTime");
        // this.addProperty("+", "myproperty", "DateTime");

        // this.addOperation("+" , "makeSound(sound: int)", "void");
    }

    equals(point){
        return this.x == point.x && this.y == point.y;
    }

    setClassName(name){
        this.classname = name;
        this.width =  Math.max(this.width, this.classname.length * 20)
    }

    addOperation(accessmodifier, operationName, returnType){
        const operation = `${accessmodifier} ${operationName}: ${returnType}`;
        this.operations.push(operation)
        this.width =  Math.max(this.width, operation.length * 9)
        this.height = Math.max(this.height, this.operations.length * 27)
    }

    addProperty(accessmodifier, proeprtyName, proeprtyType){
        const property = `${accessmodifier} ${proeprtyName}: ${proeprtyType}`;
        this.properties.push(property)
        this.width =  Math.max(this.width, property.length * 9)
        this.height = Math.max(this.height, this.properties.length * 27)
    }

    drawClassName(ctx){
        ctx.fillStyle = "black";
        ctx.font = '20px Arial'
        ctx.fillText(this.classname, this.x + this.width * 0.3, this.y + this.height * 0.15);
    }

    drawSelected(ctx){
        this.color = "orange";
    }

    draw(ctx, {outline = false} = {}){
        if(outline){
            this.drawSelected(ctx)
        }else{
            this.color = "rgb(122,207,245)";
        }
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeStyle = "black"
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width + 2, this.height + 2)
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.x - 2, this.y + this.height * 0.2);
        ctx.lineTo(this.x + this.width, this.y + this.height * 0.2);
        ctx.stroke();

        
        this.drawClassName(ctx);

        if(this.operations.length > 0){
            ctx.beginPath();
            ctx.moveTo(this.x - 2, this.y + this.height * 0.5);
            ctx.lineTo(this.x + this.width, this.y + this.height * 0.5);
            ctx.stroke();
        }
        
        
        ctx.font = '14px Arial';
        for(let i = 0; i < this.properties.length; i++){
            ctx.fillText(this.properties[i], this.x + this.width * 0.05, this.y + this.height * 0.3 + (20 * i));
        }
        
        for(let i = 0; i < this.operations.length; i++){
            ctx.fillText(this.operations[i], this.x + this.width * 0.05, this.y + this.height * 0.6 + (20 * i));
        }
    }

}