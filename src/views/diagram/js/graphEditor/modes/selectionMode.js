import {DataflowPoint } from "../../diagrams/dataflowDiagram/primitives/DataflowPoint";
import { DataflowAssociation } from "../../diagrams/dataflowDiagram/primitives/relationships/DataflowAssociation";

class SelectionMode {
    constructor(canvas, graph, graphEditor, selected, selectedIndex, connection, groupName) {
        this.canvas = canvas;
        this.graph = graph;
        this.graphEditor = graphEditor;
        this.selected = selected;
        this.connection = connection;
        this.groupName = groupName;

        this.DEFAULT_GRID_SPACE_IN_PIXELS = 200;

        this.ctx = canvas.getContext("2d");

        this.selectedIndex = selectedIndex;
        this.selected = this.graph.points[this.selectedIndex];

        this.shiftKeyPressed = false;
    }

    generateGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    getSelectedNode(){
        this.graphEditor.editing = true;
        return {index: this.selectedIndex, node:  this.selected};
    }


    
    handleKeyDownEvent(event){
        if(this.graphEditor.editing) return;
        if (event.key === "Shift") {
            this.shiftKeyPressed = true;
        }

        if(event.key === "i"){
            this.graphEditor.switchToMode(new EditMode(this.canvas, this.graph, this.graphEditor, this.graphEditor.mode.selected, this.graphEditor.mode.selectedIndex));
        }
        
        if(event.key === "d" && this.graphEditor.mode instanceof SelectionMode){
            // this.graphEditor.graph.removePoint(this.selected)
            // this.nextSelectedIndex();
            // this.selected = this.graph.points[this.selectedIndex];
            this.connection.invoke("DeletePoint", this.groupName, this.selectedIndex)
        }

        if(event.key === "c"){
            this.connection.invoke("CreateStartingPoint", this.groupName);
            this.selected = this.graph.points[-1];

        }

        if(event.key === "ArrowDown"){
            const pointToAdd = new DataflowPoint(this.generateGUID(), this.selected.x, this.selected.y + this.DEFAULT_GRID_SPACE_IN_PIXELS);
            const associationToAdd = new DataflowAssociation(this.generateGUID(), this.selected, pointToAdd);
            this.connection.invoke("CreatePoint", this.groupName, pointToAdd, associationToAdd);
        }

        if(event.key === "ArrowUp"){
            const pointToAdd = new DataflowPoint(this.generateGUID(), this.selected.x, this.selected.y - this.DEFAULT_GRID_SPACE_IN_PIXELS);
            const associationToAdd = new DataflowAssociation(this.generateGUID(), this.selected, pointToAdd);
            this.connection.invoke("CreatePoint", this.groupName, pointToAdd, associationToAdd);

        }
        
        if(event.key === "ArrowLeft"){
            const pointToAdd = new DataflowPoint(this.generateGUID(), this.selected.x - (this.DEFAULT_GRID_SPACE_IN_PIXELS + (this.selected.width / 2)), this.selected.y);
            const associationToAdd = new DataflowAssociation(this.generateGUID(), this.selected, pointToAdd);
            this.connection.invoke("CreatePoint", this.groupName, pointToAdd, associationToAdd);
        }
        
        if(event.key === "ArrowRight"){
            const pointToAdd = new DataflowPoint(this.generateGUID(), this.selected.x + (this.DEFAULT_GRID_SPACE_IN_PIXELS + (this.selected.width / 2)), this.selected.y);
            const associationToAdd = new DataflowAssociation(this.generateGUID(), this.selected, pointToAdd);
            this.connection.invoke("CreatePoint", this.groupName, pointToAdd, associationToAdd);
        }
        
        if (event.key === "Tab") {
            event.preventDefault();
            if(this.shiftKeyPressed){
                this.previousSelectedIndex();
            }else{
                this.nextSelectedIndex();
            }
            this.selected = this.graph.points[this.selectedIndex];
        }
    }
    
    handleKeyUpEvent(event){
        if (event.key === "Shift") {
            this.shiftKeyPressed = false;
        }
    }
    
    
    nextSelectedIndex(){
        this.selectedIndex = this.selectedIndex + 1;
        if(this.selectedIndex >= this.graph.points.length){
            this.selectedIndex = 0;
        }else if(this.selectedIndex < 0){
            this.selectedIndex = 0;
        }
    }
    
    previousSelectedIndex(){
        this.selectedIndex = this.selectedIndex - 1;
        if(this.selectedIndex >= this.graph.points.length){
            this.selectedIndex = 0;
        }else if(this.selectedIndex < 0){
            this.selectedIndex = this.graph.points.length - 1;
        }
    }


    display(){
        document.getElementById("editor-mode").innerHTML = "selection"; 
    
        if(this.selected){
            this.selected.draw(this.ctx, { outline: true });
        }
    }
}

export {
    SelectionMode
}