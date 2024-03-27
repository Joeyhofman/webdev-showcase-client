class EditMode {
    constructor(canvas, graph, graphEditor, selected, selectedIndex) {
        this.canvas = canvas;
        this.graph = graph;
        this.graphEditor = graphEditor;
        this.selected = selected;

        this.ctx = canvas.getContext("2d");

        this.selectedIndex = selectedIndex;
        this.selected = this.graph.points[this.selectedIndex];
    }

    handleKeyDownEvent(event){
        
        if(event.key === "Escape"){
            this.graphEditor.switchToMode(new SelectionMode(this.canvas, this.graph, this.graphEditor, this.selected, this.selectedIndex));
        }
    }

    handleKeyUpEvent(event){
        console.log(`key up(${event.key})event in edit mode`);
    }


    display(){
        document.getElementById("editor-mode").innerHTML = "Edit"; 

        if(this.selected){
            this.selected.draw(this.ctx, { outline: true });
        }
    }
}