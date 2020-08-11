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
        var nodetemplate =
          $(go.Node, "Position",new go.Binding('position','loc'), new go.Binding('fromSpot','fromSpot'),new go.Binding('toSpot','toSpot'),
            $(go.Panel, "Auto", 
              $(go.Shape, "Circle", 
                new go.Binding("fill", "color"), new go.Binding('width', "w"), new go.Binding('height', "h")),
               
            )
          ); 
        var valuetemplate =
          $(go.Node, "Position",new go.Binding('position','loc'), new go.Binding('fromSpot','fromSpot'),new go.Binding('toSpot','toSpot'),
            $(go.Panel, "Vertical",
              $(go.Panel, "Auto",  
              $(go.Shape, "RoundedRectangle",
                new go.Binding("fill", "color"), new go.Binding('width', "w"), new go.Binding('height', "h")),   
              $(go.TextBlock, new go.Binding('text', 'lb'))               
              ),
              $(go.Panel, "Auto",  
              $(go.Shape, "RoundedRectangle",
                new go.Binding("fill", "color"), new go.Binding('width', "w"), new go.Binding('height', "h")),   
              $(go.TextBlock, new go.Binding('text', 'value1'))               
              ) ,
               $(go.Panel, "Auto",  
              $(go.Shape, "RoundedRectangle",
                new go.Binding("fill", "color"), new go.Binding('width', "w"), new go.Binding('height', "h")),   
              $(go.TextBlock, new go.Binding('text', 'value2'))               
              ) 
            )
            
          ); 

        //  diagram.layout = $(go.ForceDirectedLayout);
        diagram.initialContentAlignment = go.Spot.Center;
        
        diagram.model.nodeDataArray = [
          { category :"simpletemplate", key: "bar1",  color: "black", w : 800 , h : 5, loc : new go.Point(0,300)  },
          { category :"simpletemplate", key: "bar2", color: "black" , w : 800, h : 5 ,loc : new go.Point(0,500) },

          { category :"nodetemplate", key: "myPort1F", color: "pink" , w : 10, h : 1 ,loc : new go.Point(30,300) , fromSpot : go.Spot.None, toSpot : go.Spot.None},
          { category :"nodetemplate", key: "myPort1T", color: "Green" , w : 10, h : 10 ,loc : new go.Point(30,380), fromSpot : go.Spot.None, toSpot : go.Spot.None },
          { category :"nodetemplate", key: "myPort2T", color: "Red" , w : 10, h : 10 ,loc : new go.Point(30,420), fromSpot : go.Spot.None, toSpot : go.Spot.None },
          { category :"nodetemplate", key: "myPort2F", color: "pink" , w : 10, h : 1 ,loc : new go.Point(30,500), fromSpot : go.Spot.None, toSpot : go.Spot.None },

          { category :"nodetemplate", key: "myPort3F", color: "pink" , w : 1, h : 1 ,loc : new go.Point(30,405) , fromSpot : go.Spot.Left, toSpot : go.Spot.None},   

          { category :"valuetemplate", key: "myPort4F", color: "pink" , w : 100, h : 30,subH : 10,loc : new go.Point(-80,550), fromSpot : go.Spot.Right, toSpot : go.Spot.Top,
                lb : 'CB', value1 : 'SoC : 100%', value2 : '10,123 MW' },
        ];

        diagram.model.linkDataArray = [
          
          { from: "myPort1F", to: "myPort1T" ,  routing: go.Link.Normal},
          { from: "myPort2F", to: "myPort2T",  routing: go.Link.Normal },
          { from: "myPort3F", to: "myPort4F", routing: go.Link.Orthogonal, corner: 1}  ,      
          // { from: "myPort3T", to: "myPort4F"}        
          // { from: "Gamma", to: "Delta" }
        ];

        diagram.linkTemplate =
            $(go.Link,
              new go.Binding("routing","routing"), new go.Binding('corner','corner'),
              $(go.Shape),
              $(go.Shape, { toArrow: "Standard" })
            );
        // initially use the detailed templates
        // diagram.nodeTemplate = simpletemplate;
        var templeMap = new go.Map("string", go.Node);
        templeMap.add('simpletemplate', simpletemplate);
        templeMap.add('nodetemplate', nodetemplate);
        templeMap.add('valuetemplate',valuetemplate);        
        diagram.nodeTemplateMap = templeMap;

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
