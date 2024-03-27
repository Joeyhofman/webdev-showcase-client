class ClassAssociation extends Segment {
    
    constructor(c1, c2, associationRole1 = "", associationDescription = "", associationRole2 = "") {
        super(c1, c2);
        this.c1 = c1;
        this.c2 = c2;
        this.associationRole1 = associationRole1;
        this.associationRole2 = associationRole2;
        this.associationDescription = associationDescription;

        this.p1 = new Point(this.c1.x + this.c1.width / 2, this.c1.y + this.c1.height / 2)
        this.p2 = new Point(this.c2.x + this.c1.width / 2, this.c2.y + this.c2.height / 2)
    }
    
    equals(segment){
        return this.includes(segment.c1) && this.includes(segment.c2);
    }

    includes(point){
        return this.c1.equals(point) || this.c2.equals(point);
    }


    getAssociationPoint1(){
        if(this.p1.y === this.p2.y){
            return new Point((this.c1.width) + (7.5 * this.associationDescription.length), (this.c2.y + this.c1.y) / 2 - 10 + this.c2.height / 2)
        }else if(this.p1.x === this.p2.x){
            console.log("adfasdf");
            return new Point(this.p1.x + (this.associationRole1.length * 3), this.p1.x + (this.c1.height / 2) + ((this.p2.y - this.p1.y) * 0.26))
        }
    }
    
    getAssociationPoint2(){
        if(this.p1.y === this.p2.y){
            return new Point((this.p2.x) * 0.8, (this.c2.y + this.c1.y) / 2 - 10 + this.c2.height / 2)
        }else if(this.p1.x === this.p2.x){
            return new Point(this.p1.x + (this.associationRole1.length * 3), (this.p2.y + this.p1.y) - 390)
        }
    }
    
    getAssociationDescriptionPoint(){
        if(this.p1.y === this.p2.y){
            return new Point((this.p2.x) * 0.6 - (2 * this.associationDescription.length), (this.c2.y + this.c1.y) / 2 - 10 + this.c2.height / 2)
        }else if(this.p2.x === this.p2.x){
            return new Point(this.p1.x + (this.associationRole1.length * 3), (this.p2.y + this.p1.y) / 2)
        }
    }

    draw(ctx, width = 2, color = "black"){
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.font = '16px Arial'
        ctx.fillText(this.associationRole1, this.getAssociationPoint1().x, this.getAssociationPoint1().y);
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.getAssociationPoint1().x, this.getAssociationPoint1().y, 100, 100)

        ctx.fillStyle = "black";
        ctx.font = '16px Arial'
        ctx.fillText(this.associationDescription, this.getAssociationDescriptionPoint().x, this.getAssociationDescriptionPoint().y);

        ctx.fillStyle = "black";
        ctx.font = '16px Arial'
        ctx.fillText(this.associationRole2, this.getAssociationPoint2().x, this.getAssociationPoint2().y);
   }


}