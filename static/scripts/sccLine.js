let mysccDlg;
let sccNodeJson;
let sccLineJson;

function initSccDigram(sccData, $, diagram, dWidth, dHeight){
  var barJson = [];
  var linkedJson =[];
  var cbSize = 20;
  var transformerSize = 40;
  var poleSize = 15;
  
  mysccDlg = diagram;

  diagram.addDiagramListener("ObjectSingleClicked",
            function(e) {
                var part = e.subject.part;
                if (!(part instanceof go.Link))
                {  showMessage("Clicked on " + part.data.key + ", Position : " + part.location); 
                
                routeWay= linkedJson.slice();
                nodes = barJson.slice();
                mysccDlg.nodeTemplateMap = templeMap;                        
                mysccDlg.model.linkDataArray = linkedJson;
                mysccDlg.model.nodeDataArray = barJson;
                var from = "a3-4";
                var to = "tr2";
                   
                // searching(mysccDlg, 'tr2','a3-4')
                searching(mysccDlg, 'a3-4','tr2')
                }    
            }
        );

    var tableItemTemplate = new go.Map('string', go.Panel);
    tableItemTemplate.add('myCol',
      $(go.Panel, new go.Binding('column', 'col'),new go.Binding('row','row'), 

        $(go.Shape,  {strokeWidth: .1}, {margin : 0},
          new go.Binding('width','colW'), new go.Binding('height','colH'),
          new go.Binding('fill','colColor'), new go.Binding('portId','portId'), 
        ),
        $(go.TextBlock, new go.Binding('text','text'), { font: '9pt sans-serif', margin : 0})
      )
    );
    var tableTemplate = 
        $(go.Node, new go.Binding('key','key'), new go.Binding('position','loc'),"Auto",
        new go.Binding('toSpot','toSpot'), new go.Binding('fromSpot','fromSpot'), 
          $(go.Shape, new go.Binding('width','w'),new go.Binding('height','h'),"Rectangle", {strokeWidth: 1}),
          $(go.Panel, "Table",    
          {
            itemCategoryProperty: "type",  // this property controls the template used
            itemTemplateMap: tableItemTemplate // map was defined above
          } ,
          new go.Binding("itemArray", "cols"))
        );

    var poleTemplate = 
      $(go.Node, "Position" ,new go.Binding('position','loc'),
      $(go.Panel, "Auto", 
        $(go.Shape, "Circle", {margin : 0}, 
          new go.Binding("fill", "color"), new go.Binding('width', "w"), 
          new go.Binding('height', "h"))  
      ) 
    ); 
    var cbTemplate = 
      $(go.Node, "Position" ,new go.Binding('position','loc'),
      $(go.Panel, "Auto", 
        $(go.Shape, "Circle", {margin : 0}, 
          new go.Binding("fill", "color"), new go.Binding('width', "w"), 
          new go.Binding('height', "h")) ,
          $(go.TextBlock, new go.Binding('text','text'))
      ) 
    ); 
    
    var rectPortTemplate = new go.Map("string", go.Panel);
      rectPortTemplate.add("rectPort",
        $(go.Panel, "Auto",           new go.Binding("fill", "color"), new go.Binding('isOpen','isOpen'),
          $(go.Shape,  
                new go.Binding("portId","portId"),
                new go.Binding('width','portW'), new go.Binding('height','portH'),
                new go.Binding('toSpot', 'toSpot'),new go.Binding('fromSpot', 'fromSpot')
            )
            // new go.Binding('toPort','toPort'), new go.Binding('fromPort','fromPort')
          // )
        )
      )

      var transTemplate = 
        $(go.Node, "Position" ,new go.Binding('position','loc'),
        $(go.Panel, "Auto", 
          $(go.Shape, "Circle", {margin : 0},{strokeWidth: 3},
            new go.Binding("fill", "color"), new go.Binding('width', "w"), 
            new go.Binding('height', "h"))
            // $(go.Panel, "Auto",
            // {  
            //   itemCategoryProperty: "type",  // this property controls the template used
            //   itemTemplateMap: rectPortTemplate  // map was defined above
            // },
            // new go.Binding("itemArray", "ports"))
        ) 
      ); 
      var trans1Template = 
      $(go.Node, "Position" ,new go.Binding('position','loc'),
      $(go.Panel, "Auto", 
        $(go.Shape, "Circle", {margin : 0},{strokeWidth: 3},
          new go.Binding("fill", "color"), new go.Binding('width', "w"), 
          new go.Binding('height', "h")) 
      ) 
    ); 

  //////////////////transformer///////////////////
  
  
  var cbJson, cb;
  var cbX = Number(dWidth * 0.1);
  var cbY = 0;
  var poleJson, poleList, pole;
  var spaceBwtCBX;
  var spaceBwtCBY = Number(dHeight / sccData.sccGroup[0].cbList.length);
  var tempCBX = dWidth - 250; 
  var barWidth = (tempCBX - 20 );
  var maxPoleCnt = 0; 
  var valJson;
  

  for(var i =0; i < sccData.sccGroup[0].cbList.length; i++){
    cb =sccData.sccGroup[0].cbList[i];
    maxPoleCnt = maxPoleCnt < cb.poleList.length ? cb.poleList.length : maxPoleCnt ;
  }
  spaceBwtCBX = Number(barWidth / maxPoleCnt)-30;
  
  // var transformerY = Number(spaceBwtCBY/2) * (sccData.sccGroup[0].cbList.length-1);
  var transformerY = (mysccDlg.viewportBounds.height/3) * 1; 
  var transformerX = -70;
  var transformerPort = [{ type: "rectPort", portId : "port", 
      toSpot : go.Spot.None, fromSpot : go.Spot.MiddleRight ,
       portW : 1, portH : 1, color : 'transparent'
  }]

  var transformer = {category : "trans1Template", key : "tr1", w : transformerSize, 
    loc : new go.Point(transformerX, transformerY), color : "transparent"};
    transformer.ports = transformerPort;
  barJson.push(transformer);

 
  transformer = {category : "transTemplate", key : "tr2", w : transformerSize, h : transformerSize, 
    loc : new go.Point(transformerX * .75, transformerY), color : "transparent"};
    transformer.ports = transformerPort;
  barJson.push(transformer);

  //CB JSON
  for(var i=0; i< sccData.sccGroup[0].cbList.length; i++){
    cb =sccData.sccGroup[0].cbList[i];
    cbY = (spaceBwtCBY * i);
    cbJson = {
      category : 'cbTemplate', key : cb.cbID, isOpen : cb.isOpen, 
      w : cbSize, h : cbSize, loc : new go.Point(cbX, cbY), color : 'lightgreen', text : 'CB' 
    };
    barJson.push(cbJson);
    linkedJson.push({ from : 'tr2', to : cb.cbID,    routing: go.Link.Orthogonal, corner: 5  
    })
 
    for(var j=0; j< cb.poleList.length ; j++)
    {
      pole = cb.poleList[j];      
      
      if((cb.poleList.length-1) == (j)){
        poleJson = {
          category : 'poleTemplate', key : pole.poleID, isOpen : false, w : poleSize, 
          loc : new go.Point(( (cbX + spaceBwtCBX * (maxPoleCnt))), cbY)
        };
      }else{
        poleJson = {
          category : 'poleTemplate', key : pole.poleID, isOpen : false, w : poleSize, 
          loc : new go.Point(( (cbX + spaceBwtCBX * (j+1))), cbY)
        };
      }      
      
      if( j == 0){
        linkedJson.push({ from : cb.cbID, to : pole.poleID })
      } else if(j == (cb.poleList.length -1)){
        
        linkedJson.push({from : cb.poleList[j-1].poleID, to : pole.poleID}) 
      }else{
        linkedJson.push({from : cb.poleList[j-1].poleID, to : pole.poleID})
      }  
      
      barJson.push(poleJson); 

      if(pole.dr.includes(',')){
        var valLbId = 'val-'+pole.poleID;
        valJson = {category : 'tableTemplate', key : valLbId, 
          fromSpot : go.Node.Left, toSpot : go.Node.Top }
        if(j == (cb.poleList.length - 1)){
            valJson.loc =   new go.Point(((cbX + spaceBwtCBX * (maxPoleCnt))), cbY-45)            
        }else{
            valJson.loc =   new go.Point(((cbX + spaceBwtCBX * (j+1))), cbY-45)
        }
        
        var valLb = [
            {type : "myCol", text : "MV", col : 0, row : 0, colW : 50, colH : 15, colColor : 'white'},
            {type : "myCol", text : "MVar", col :1, row : 0, colW : 50,  colH : 15, colColor : 'white'} ,
            {type : "myCol", text : "SoC", col : 0, row : 1, colW : 50,  colH : 15, colColor : 'white'},
            {type : "myCol", text : "V", col : 1, row : 1, colW : 50,  colH : 15, colColor : 'white'}]
        valJson.cols = valLb;
        barJson.push(valJson);
        // linkedJson.push({from :  pole.poleID, to :valLbId ,   routing: go.Link.Orthogonal, corner: 3 ,         })  
      }       

    }             
  }    

  barJson.forEach(function(d){
    if(d.key.includes("tr") != true){
        d.isOpen = false; 
    }
    
    
    if( (d.key.includes("tr")!=true)  ){
        d.color = getStatusColor(d.isOpen);
    }      
    
  })




   
  diagram.model =
    $(go.GraphLinksModel,
      { linkFromPortIdProperty: "fromPort",  // required information:
        linkToPortIdProperty: "toPort",      // identifies data property names
      });
    
    diagram.model.linkDataArray = linkedJson;
    diagram.model.nodeDataArray = barJson;
    diagram.linkTemplate =
      $(go.Link,
        // {selectionAdorned: true, fromPortId: "from", toPortId: "to"},
        new go.Binding("routing","routing"), new go.Binding('corner','corner'),
        new go.Binding('curve','curve'),
        $(go.Shape, { isPanelMain: true, stroke: "black", strokeWidth: 1 }),
        $(go.Shape, { isPanelMain: true, stroke: "gray", strokeWidth: 1 }),
        $(go.Shape,   new go.Binding('name', 'name'),new go.Binding('strokeWidth', 'strokeWidth'),
          { isPanelMain: true, stroke: "white",   strokeDashArray: [10, 10] }),
        // $(go.Shape, { toArrow: "Standard" }
        // )
      );

    // var linkTemplate = 
    //  $(go.Link,
    //       // {selectionAdorned: true, fromPortId: "from", toPortId: "to"},
    //       new go.Binding("routing","routing"), new go.Binding('corner','corner'),
    //       new go.Binding('curve','curve'),
    //       $(go.Shape, { isPanelMain: true, stroke: "black", strokeWidth: 1 }),
    //       $(go.Shape, { isPanelMain: true, stroke: "gray", strokeWidth: 1 }),
    //       $(go.Shape,   new go.Binding('name', 'name'),new go.Binding('strokeWidth', 'strokeWidth'),
    //         { isPanelMain: true, stroke: "white",   strokeDashArray: [10, 10] }),
    //       $(go.Shape,  {name : 'toArrow', visible : true, toArrow: "BigEndArrow", fill: "black", stroke: null }),
    //       $(go.Shape, {name : 'fromArrow', visible : true, fromArrow: "BigEndArrow", fill: "black", stroke: null })
    //     );

    var templeMap = new go.Map("string", go.Node);
    templeMap.add('poleTemplate', poleTemplate);
    templeMap.add('cbTemplate', cbTemplate);
    templeMap.add('transTemplate',transTemplate);
    templeMap.add('trans1Template', trans1Template);
    templeMap.add('tableTemplate',tableTemplate); // 
    diagram.nodeTemplateMap = templeMap;

    // var linkTempMap = new go.Map('string', go.Node);
    // linkTempMap.add('linkTemplate',linkTemplate);
    // diagram.linkTemplateMap = linkTempMap;

}
 
function showMessage(text) {   
  document.getElementById("sccDiagramMsg").textContent = text;
}


function setArrow(from, to, type){
  if(type == 'RCC'){
    //RCC인 경우 from extNode쪽 2개, to extNodes 쪽 2개
    if(from.includes('ext') == true)
    {
      var toNode = fromNodeMap.get(from);
     
    }
  }else{
    //SCC인 경우  From쪽 2개, to쪽 1개
    var toNode = fromNodeMap.get(from);
    console.log(toNode);
  }
}