import { DataflowPoint } from "../diagrams/dataflowDiagram/primitives/DataflowPoint";
import { DataflowAssociation } from "../diagrams/dataflowDiagram/primitives/relationships/DataflowAssociation";
import  { SelectionMode } from "./modes/selectionMode";

class GraphEditor {



    constructor(canvas, ctx, graph, diagram, connection, groupName){
        this.canvas = canvas;
        this.graph = graph;
        this.diagram = diagram;
        this.connection = connection;
        this.groupName = groupName;

        this.editing = false;
        
        this.ctx = ctx;
        this.mode = new SelectionMode(canvas, graph, this, this.graph.points[0], 0, this.connection, this.groupName);

        this.registerEventListeners();
    }

    loadDiagram(diagram = this.diagram){
        this.graph.clear();
        for(let i = 0; i < diagram.points.length; i++){
            this.graph.addPoint(new DataflowPoint(diagram.points[i].id, diagram.points[i].x, diagram.points[i].y, diagram.points[i].classname));
        }
        
        for(let x = 0; x < diagram.associations.length; x++){
            const p1 = new DataflowPoint(diagram.associations[x].p1.id, diagram.associations[x].p1.x, diagram.associations[x].p1.y, diagram.associations[x].p1.classname, diagram.associations[x].p1.fillColor)
            const p2 = new DataflowPoint(diagram.associations[x].p2.id, diagram.associations[x].p2.x, diagram.associations[x].p2.y, diagram.associations[x].p2.classname, diagram.associations[x].p2.fillColor)
            const associationToAdd = new DataflowAssociation(diagram.associations[x].id, p1, p2)
            this.graph.tryAddPoint(p2);
            this.graph.addSegment(associationToAdd);
        }
    }

    updateNode(index, node){
        this.graph.points[index].classname = node.classname;
        this.graph.points[index].fillColor = node.color;
        this.editing = false;
    }

    setEditing(status){
        this.editing = status;
    }

    registerEventListeners(){
        document.addEventListener('keydown', this.mode.handleKeyDownEvent.bind(this.mode));
        document.addEventListener('keyup', this.mode.handleKeyUpEvent.bind(this.mode));
    }

    getApiRepresentation(){
        return {
            id: this.diagram.id,
            name: this.diagram.name,
            points: this.graph.points,
            associations: this.graph.segments
        }
    }

    switchToMode(mode){
        this.mode = mode;
        this.registerEventListeners();
    }

    display(){
        this.graph.draw(this.ctx);
        this.mode.display();
    }
}

export {
    GraphEditor
}