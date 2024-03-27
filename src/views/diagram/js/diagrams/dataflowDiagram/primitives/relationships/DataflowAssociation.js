import { Segment } from "../../../../primitives/segment.js";


class DataflowAssociation extends Segment {
    
    constructor(id, p1, p2) {
        super(p1, p2);
        this.id = id;
    }

    draw(ctx, width = 2, color = "black"){
       // Calculate the angle of the line
        const dx = this.p2.x + (this.p2.width / 2) - (this.p1.x + (this.p1.width / 2));
        const dy = this.p2.y + (this.p2.height / 2) - (this.p1.y + (this.p1.height / 2));
        const angle = Math.atan2(dy, dx);

        // Calculate the intersection point on the first box
        const box1EdgeX = this.p1.x + (this.p1.width / 2) + (this.p1.width / 2) * Math.cos(angle);
        const box1EdgeY = this.p1.y + (this.p1.height / 2) + (this.p1.height / 2) * Math.sin(angle);

        // Calculate the intersection point on the second box
        const box2EdgeX = this.p2.x + (this.p2.width / 2) - (this.p2.width / 2) * Math.cos(angle);
        const box2EdgeY = this.p2.y + (this.p2.height / 2) - (this.p2.height / 2) * Math.sin(angle);

        // Draw the line
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(box1EdgeX, box1EdgeY);
        ctx.lineTo(box2EdgeX, box2EdgeY);
        ctx.stroke();

        // Calculate the coordinates for the arrowhead
        const arrowLength = 20; // Length of the arrowhead
        const arrowAngle = Math.PI / 6; // Angle of the arrowhead

        // Calculate the coordinates for the first side of the arrowhead
        const arrowX1 = box2EdgeX - arrowLength * Math.cos(angle + arrowAngle);
        const arrowY1 = box2EdgeY - arrowLength * Math.sin(angle + arrowAngle);

        // Draw the first side of the arrowhead
        ctx.beginPath();
        ctx.moveTo(box2EdgeX, box2EdgeY);
        ctx.lineTo(arrowX1, arrowY1);
        ctx.stroke();

        // Calculate the coordinates for the second side of the arrowhead
        const arrowX2 = box2EdgeX - arrowLength * Math.cos(angle - arrowAngle);
        const arrowY2 = box2EdgeY - arrowLength * Math.sin(angle - arrowAngle);

        // Draw the second side of the arrowhead
        ctx.beginPath();
        ctx.moveTo(box2EdgeX, box2EdgeY);
        ctx.lineTo(arrowX2, arrowY2);
        ctx.stroke();
   }
}

export {
    DataflowAssociation
}