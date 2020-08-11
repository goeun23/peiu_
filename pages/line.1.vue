<template>
  <div class="diagram">
    <div id="myDiagramDiv"
     style="width:960px; height:540px; background-color: #DAE4E4;"></div>
     <div id='Message1' style = "width : 960px; height : 100px;background-Color : white">

     </div>
  </div>
</template>
<script> 
  import * as mLib from '~/assets/gMap'
  // import { cube } from '~/assets/my-module';

  export default {
    layout: "oneline",

    components: { 
    },
    head: {
      link: [
      ],
      script: [
        {src : 'https://cdnjs.cloudflare.com/ajax/libs/gojs/1.8.25/go.js'}
      ]
    },
    methods :{
      
    },
    mounted() 
    {
      var $ = go.GraphObject.make;
      var diagram = $(go.Diagram, "myDiagramDiv",
      {
        // layout: $(go.ForceDirectedLayout)
      }
      );
        diagram.scrollMode = go.Diagram.DocumentScroll;
       
            // The "simple" template just shows the key string and the color in the background.
        var simpletemplate =
          $(go.Node, "Position",new go.Binding('position','loc'),
            $(go.Panel, "Auto", 
              $(go.Shape, "Rectangle",
                new go.Binding("fill", "color"), new go.Binding('width', "w"), new go.Binding('height', "h"))
            )
          ); 

        //  diagram.layout = $(go.ForceDirectedLayout);
diagram.initialContentAlignment = go.Spot.Center;
        diagram.model.nodeDataArray = [
          { key: "Beta",  color: "lightblue", w : 500 , h : 10, loc : new go.Point(0,300)},
          { key: "Gamma", color: "pink" , w : 500, h : 10 ,loc : new go.Point(0,500)},
          { key: "Delta", color: "cyan" , w : 500, h : 10,loc : new go.Point(200,550)}
        ];
        diagram.model.linkDataArray = [
          { from: "Beta", to: "Gamma" },
          { from: "Gamma", to: "Delta" }
        ];

        // initially use the detailed templates
        diagram.nodeTemplate = simpletemplate;

        // diagram.addDiagramListener("ViewportBoundsChanged",
        //   function (e) {
        //     diagram.nodeTemplate = simpletemplate;
        //   });

        // myDiagram = diagram;  // make accessible to the HTML buttons

    }  
  } 
</script>

<style>

  .col-xs-12,
  .main {
    margin: 0px;
    padding: 0px;
  }

</style>
