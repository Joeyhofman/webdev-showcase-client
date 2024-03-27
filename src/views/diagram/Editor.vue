<template>
    <div class="body">
      <h1>UML editor</h1>
      <p>Mode: <span id="editor-mode">Selection</span></p>
      <CButton color="primary"  @click="this.downloadDiagram">downloaden</CButton>
      <canvas ref="myCanvas" id="myCanvas"></canvas>

      <div id="controls">
      </div>

      <CModal :backdrop="true" :keyboard="true" :visible="editModalVisible" @close="closeEditModal">
        <CModalHeader>
          <CModalTitle>Bewerken</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput
              type="text"
              id="node-name-input"
              label="Projectnaam"
              v-model="this.selectedNode.classname"
              aria-describedby="node-name-input"
            />
            
            <CFormInput
              type="text"
              id="node-color-input"
              label="Projectnaam"
              v-model="this.selectedNode.fillColor"
              aria-describedby="node-color-input"
            />
            
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" @click="closeEditModal">anuleren</CButton>
          <CButton color="primary" @click="this.updateNode()">bijwerken </CButton>
        </CModalFooter>
      </CModal>
    </div>
</template>
  
  <script>
import { CButton, CCardBody, CCardHeader, CFormTextarea } from '@coreui/vue';
import { GraphEditor } from "./js/graphEditor/graphEditor.js"
import { Graph } from "./js/math/graph.js"
import { Viewport } from "./js/viewport.js"
import { DataflowPoint } from "./js/diagrams/dataflowDiagram/primitives/DataflowPoint.js"
import { DataflowAssociation } from "./js/diagrams/dataflowDiagram/primitives/relationships/DataflowAssociation.js"

import * as signalR from '@microsoft/signalr';

  export default {
    name: "Editor",
    components: {
      CButton,
      CCardBody,
      CCardHeader
    },
    data() {
    return { 
      selectedNode: {
        className: "",
        color: "",
      },
      selectedIndex: null,
      editModalVisible: false,
      graphEditor: null,
      diagram: null,
      connection: null,
      groupName: "",
    }
  },

  async created(){
    const diagram  = await this.$store.dispatch("getDiagram", {projectId: this.$route.params.projectId, diagramId: this.$route.params.diagramId});
    this.diagram = diagram;
    
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7215/hubs/diagramediting', {
        accessTokenFactory: () => sessionStorage.getItem("token"),
    })
      .build();

      await this.connection.start();
      this.InitializeEditor();
      await this.connection.invoke("SetupEditing", this.$route.params.projectId, this.$route.params.diagramId);
  },
  
  methods: {
    InitializeEditor(){

      document.addEventListener("keydown", this.keyDown);
      const myCanvas = this.$refs["myCanvas"];
      myCanvas.width = window.innerWidth;
      myCanvas.height = window.innerHeight;

      const ctx = myCanvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

      
      
      this.groupName = `${this.$route.params.projectId}-${this.$route.params.diagramId}`;
      
      this.connection.on("DiagramSync", this.diagramSync);
      
      this.connection.on("RejectConnection", this.RejectConnection);
      this.connection.on("createStartingPoint", this.createStartingPoint);
      this.connection.on("createPoint", this.createPoint);
      this.connection.on("deletePoint", this.deletePoint);
      this.connection.on("updatePoint", this.updatePoint);
      
      
        const graph = new Graph([], []);

        const viewport = new Viewport(myCanvas);

        const graphEditor = new GraphEditor(myCanvas, ctx, graph, this.diagram, this.connection, this.groupName);
        this.graphEditor = graphEditor;
        this.editDialogItem = graphEditor.mode.selected;

        function animate(){
            ctx.restore();
            ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
            ctx.save();
            ctx.translate(viewport.center.x, viewport.center.y);
            ctx.scale(1 / viewport.zoom, 1 / viewport.zoom);
            const offset = viewport.getOffset();
            ctx.translate(offset.x, offset.y);
            graphEditor.display();
            requestAnimationFrame(animate);
        }

        animate();
    },

    RejectConnection(message){
      console.log(message);
    },

    closeEditModal(){
      this.editModalVisible = false;
    },
    async keyDown(event){
      if(event.key === "Enter" && this.graphEditor.editing){
        this.updateNode();
      }
      if(event.key === "e"){
        console.log("open edit modal");
        const {index, node} =  this.graphEditor.mode.getSelectedNode();
        this.selectedIndex = index;
        this.selectedNode = node;
        this.editModalVisible = true;
      }
    },

    updatePoint(index, updatedPoint){
      console.log("updating node");
      console.log(index);
      console.log(updatedPoint);
      this.graphEditor.updateNode(index, updatedPoint);
    },

    downloadDiagram(){
    const canvas = this.$refs["myCanvas"];
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, window.width, window.height);

    const imageDataURL = canvas.toDataURL();
    const link = document.createElement("a");


    link.href = imageDataURL;
    link.download = "diagram.png";
    link.click();
    },

    createPoint(point, association){
      console.log("callec creating point");
      console.log(point);
      console.log(association);

      const p1 = new DataflowPoint(association.p1.id, association.p1.x, association.p1.y, association.p1.classname, association.p1.fillColor)
      const p2 = new DataflowPoint(association.p2.id, association.p2.x, association.p2.y, association.p2.classname, association.p2.fillColor)
      console.log("points being added");
      console.log(p1);
      console.log(p2);
      console.log("association being added");
      
      const associationToAdd = new DataflowAssociation(association.id, p1, p2)
      console.log(associationToAdd);

      this.graphEditor.graph.addPoint(p2);
      this.graphEditor.graph.addSegment(associationToAdd);
      console.log("graph");
      console.log(this.graphEditor.graph);
    },

    deletePoint(index){
      console.log("deleting point");

      console.log(this.graphEditor.graph.points[index]);
      this.graphEditor.graph.removePoint(this.graphEditor.graph.points[index])
      this.graphEditor.mode.nextSelectedIndex();
      this.graphEditor.mode.selected = this.graphEditor.graph.points[this.graphEditor.mode.selectedIndex];
    },

    updateNode(){
      console.log( `groupname: ${this.groupName}, index: ${this.selectedIndex}, name: ${this.selectedNode.classname}, color: ${this.selectedNode.color}`);
      this.connection.invoke("UpdatePoint", this.groupName, this.selectedIndex, this.selectedNode.classname, this.selectedNode.color)
      this.closeEditModal();
    },

    async updateDiagram(){
      await this.$store.dispatch("updateDiagram", {projectId: this.$route.params.projectId, diagramId: this.$route.params.diagramId, diagram: this.graphEditor.getApiRepresentation()});
    },
    createStartingPoint(point) {
        console.log("adding creating point");
        this.graphEditor.graph.addPoint(new DataflowPoint(point.id, point.x, point.y))
        this.graphEditor.mode.selected = this.graph.points[-1];
      },

    diagramSync(diagram) {
          console.log("syncing diagram");
          this.diagram = diagram;
          console.log(this.diagram);
          this.graphEditor.loadDiagram(diagram);
      }
    }
  }
  </script>
  
<style scoped>

.body{
  width: 100vw;
  height: 100vh;
  background-color: black;
  text-align: center;
}

h1, p{
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}

#myCanvas {
  background-color: #eee;
}

</style>