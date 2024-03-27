

class Graph {
    constructor(points = [], segments = []){
        this.points = points;
        this.segments = segments;
    }

    clear(){
        this.points = [];
        this.segments = [];
    }

    addPoint(point){
        this.points.push(point);
    }

    containsPoint(point){
        return this.points.find((p) => p.equals(point));
    }

    tryAddPoint(point){
        if(!this.containsPoint(point)){
            this.addPoint(point);
            return true;
        }else{
            return false;
        }
    }

    addSegment(segment){
        this.segments.push(segment);
    }

    removePointAt(index){
        const point = this.points[index];
        this.removePoint(point);
    }
    removePoint(point){
        const connectedSegments = this.getSegmentsWithPoints(point);
        for(const seg of connectedSegments){
            this.removeSegment(seg);
        }
        this.points.splice(this.points.indexOf(point), 1);
    }

    containsSegment(segment){
        return this.segments.find((s) => s.equals(segment));
    }

    tryAddSegment(segment){
        if(!this.containsSegment(segment) && !segment.p1.equals(segment.p2)){
            this.addSegment(segment);
            return true;
        }else{
            return false;
        }
    }

    removeSegment(segment){
        this.segments.splice(this.segments.indexOf(segment), 1);
    }

    getSegmentsWithPoints(point){
        const segs = [];
        for(const seg of this.segments){
            if(seg.includes(point)){
                segs.push(point);
            }
        }

        return segs;
    }

    dispose(){
        this.segments = [];
        this.points = [];
    }

    draw(ctx){
        for(const point of this.points){
            point.draw(ctx);
        }
        for(const seg of this.segments){
            seg.draw(ctx);
        }
        
    }
}

export {
    Graph,
}