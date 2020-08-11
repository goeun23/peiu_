let routeWay =[];
let nodes = [];
let myRccDlg;   
let routedList = [];
let fromNodeMap = new HashMap();
let toNodeMap = new HashMap();


let checkedNode = [];
let linkedLine = [];
let linkedNode = [];

     
function oneLineInit(data, $, diagram, diagramDivName){
    let lastSingleBarX;
    myRccDlg = diagram;
    try{
        diagram.addDiagramListener("ObjectSingleClicked",
            function(e) {
                var part = e.subject.part;
                if (!(part instanceof go.Link))
                {
                    
                    showMessage("Clicked on " + part.data.key + ", Position : " + part.location);

                    routeWay= linkedJson.slice();
                    nodes = barJson.slice();
                    myRccDlg.nodeTemplateMap = templeMap;                        
                    myRccDlg.model.linkDataArray = linkedJson;
                    myRccDlg.model.nodeDataArray = barJson;

                    searching(myRccDlg, 'extDS-1-1', 'extDS-1-0');
                }    
            }
        );
        

      var dWidth = document.getElementById(diagramDivName).clientWidth; // the width of diagram
      var dHeight = document.getElementById(diagramDivName).clientHeight; // the height of diagram
      var barWidth = parseInt(dWidth * .99);
      var barHeight = 4;
      
      var bar1Y = (dHeight/10).toFixed(0)*1;
      var bar2Y = (dHeight/10).toFixed(0)*4;
      var singleBarW = parseInt((barWidth * .4));  
 

      var topNodeTemplate =
      $(go.Node,  "Position",new go.Binding('position','loc'),       
      $(go.Panel, "Table", new go.Binding('key','key'),
        { defaultAlignment: go.Spot.None },
        $(go.TextBlock, { row: 0, column: 0, columnSpan: 2, font: "bold 10pt sans-serif" },
          new go.Binding("text", "title")),
        $(go.TextBlock, { row: 1, column: 0 }, "이벤트 : "),
        $(go.TextBlock, { row: 2, column: 0 }, "MVar : "),
        $(go.TextBlock, { row: 1, column: 1 }, new go.Binding("text", "evtCnt")),
        $(go.TextBlock, { row: 2, column: 1 }, new go.Binding("text", "mvar"))
      )
    );

    var textTemplate =
      $(go.Node,  "Position",new go.Binding('position','loc'),       
      $(go.Panel, "Table", new go.Binding('key','key'),
        { defaultAlignment: go.Spot.None },
        $(go.TextBlock, { row: 0, column: 0, columnSpan: 2, font: "bold 10pt sans-serif" },
          new go.Binding("text", "title")),
        $(go.TextBlock, { row: 3, column: 0 }, "이벤트 :  ", {textAlign: "right", font: "7pt sans-serif",  alignment: go.Spot.Right }),
        $(go.TextBlock, { row: 2, column: 0 }, "MVar :  ", {textAlign: "right", font: "7pt sans-serif",  alignment: go.Spot.Right}),
        $(go.TextBlock, { row: 1, column: 0 }, "MV :  ", {textAlign: "right", font: "7pt sans-serif",  alignment: go.Spot.Right}),
        $(go.TextBlock, { row: 4, column: 0 }, "SoC(%) :  ", {textAlign: "right", font: "7pt sans-serif",  alignment: go.Spot.Right}),
        $(go.TextBlock, { row: 3, column: 1 }, new go.Binding("text", "evtCnt"), {textAlign: "left", font: "7pt sans-serif",  alignment: go.Spot.Left}),
        $(go.TextBlock, { row: 2, column: 1 }, new go.Binding("text", "mvar"), {textAlign: "left", font: "7pt sans-serif",  alignment: go.Spot.Left}),
        $(go.TextBlock, { row: 1, column: 1 }, new go.Binding("text", "mw"), {textAlign: "left", font: "7pt sans-serif",  alignment: go.Spot.Left}),
        $(go.TextBlock, { row: 4, column: 1 }, new go.Binding("text", "soc"), {textAlign: "left", font: "7pt sans-serif",  alignment: go.Spot.Left})
      )
    );

      var tableItemTemplate = new go.Map('string', go.Panel);
      tableItemTemplate.add('myCol',
        $(go.Panel, new go.Binding('column', 'col'),new go.Binding('row','row'), 
            new go.Binding('toPort','toPort'), new go.Binding('fromPort','fromPort'), 
          $(go.Shape,  {strokeWidth: .1}, {margin : 0}, 
            new go.Binding('width','w'), new go.Binding('height','h'),
            new go.Binding('fill','color'), new go.Binding('portId','portId'), 
          )
        )
      );
      var tableTemplate = 
         $(go.Node, new go.Binding('key','key'), new go.Binding('position','loc'),"Auto",
            $(go.Shape, new go.Binding('width','w'),"Rectangle", { fill: "lightgray" }, {strokeWidth: 0}),
            $(go.Panel, "Table",    
            {
              itemCategoryProperty: "type",  // this property controls the template used
              itemTemplateMap: tableItemTemplate // map was defined above
            } ,
            new go.Binding("itemArray", "cols"))
          );


      var circlePortTempalte = new go.Map("string", go.Panel);
      circlePortTempalte.add("circlePort",
        $(go.Panel, "Auto",           new go.Binding("fill", "color"),
            $(go.Shape,  
                new go.Binding("portId","portId"),
                new go.Binding('width','w'), new go.Binding('height','h'), 
                new go.Binding('toSpot','toSpot'), new go.Binding('fromSpot','fromSpot')  
            ) 
        )
    )

      var circleTemplate =
      $(go.Node, "Position",new go.Binding('position','loc'), 
        new go.Binding('fromPort','fromPort'),  new go.Binding('toPort','toPort'), new go.Binding('isOpen','isOpen'),
        $(go.Panel, "Auto", 
          $(go.Shape, "Circle", 
            new go.Binding("fill", "color"), new go.Binding('width', "w"), 
            new go.Binding('height', "h"),{strokeWidth: 0}),
            // $(go.Panel, "Auto",
            // {  
            //     itemCategoryProperty: "type",  // this property controls the template used
            //     itemTemplateMap: circlePortTempalte  // map was defined above
            // },
            // new go.Binding("itemArray", "ports"))
        )
      ); 

      var rectPortTemplate = new go.Map("string", go.Panel);
      rectPortTemplate.add("rectPort",
        $(go.Panel, "Auto",           new go.Binding("fill", "color"), new go.Binding('isOpen','isOpen'),
          $(go.Shape,  
                new go.Binding("portId","portId"),
                new go.Binding('width','w'), new go.Binding('height','h'),
                new go.Binding('toSpot', 'toSpot'),new go.Binding('fromSpot', 'fromSpot')
            ),
            $(go.TextBlock, new go.Binding('text','text'))
            // new go.Binding('toPort','toPort'), new go.Binding('fromPort','fromPort')
          // )
        )
      )

      var rectTemplate = 
        $(go.Node, "Position" ,new go.Binding('position','loc'),
        $(go.Panel, "Auto", 
          $(go.Shape, "Rectangle", {margin : 0},{strokeWidth: 0},
            new go.Binding("fill", "color"), new go.Binding('width', "w"), 
            new go.Binding('height', "h")),
            $(go.Panel, "Auto",
            {  
              itemCategoryProperty: "type",  // this property controls the template used
              itemTemplateMap: rectPortTemplate  // map was defined above
            },
            new go.Binding("itemArray", "ports"))
        ) 
      ); 

      var barJson = [];
      var linkedJson =[];
      var barX = 0, barY = bar1Y;

      var vBarCnt = 2;//각 그룹당 3개 라고 생각하자
      var rccTopCnt  = data.length ;  
      var rccData = data;
      
      //draw Horizen bar 
      var obj = drawHVarNode(barWidth ,singleBarW, data, vBarCnt, barX, barY, bar2Y, barHeight);
      lastSingleBarX = obj.lastSingleBarX;
      obj.barJson.forEach(function (d){
        barJson.push(d);
      }); 
       
       obj.linkedJson.forEach(function (d){
         linkedJson.push(d);
      }); 

      //draw VBar Node
      obj = drawVBarNode(barWidth, singleBarW, rccData,  bar1Y, bar2Y, lastSingleBarX, obj.portXList);
      obj.barJson.forEach(function (d){
        barJson.push(d);
      }); 
       obj.linkedJson.forEach(function (d){
         linkedJson.push(d);
      });  

     diagram.model =
      $(go.GraphLinksModel,
        { linkFromPortIdProperty: "fromPort",  // required information:
          linkToPortIdProperty: "toPort",      // identifies data property names
        });
      
      
    diagram.linkTemplate =
        $(go.Link,
            // { routing: go.Link.Normal,}, 
            new go.Binding("routing","routing"), new go.Binding('corner','corner'), 
            // mark each Shape to get the link geometry with isPanelMain: true
            $(go.Shape, { isPanelMain: true, stroke: "black", strokeWidth: 3 }),
            $(go.Shape, { isPanelMain: true, stroke: "gray", strokeWidth: 6 }),
            // $(go.Shape, { isPanelMain: true, stroke: "white", strokeWidth: 2, strokeDashArray: [10, 10] }),
            $(go.Shape,   "Arrow", new go.Binding('name', 'name'),

                { isPanelMain: true, stroke: "black", strokeWidth : 6, strokeDashArray: [10, 10] }), 
            // $(go.Shape, "Arrow" , new go.Binding('name', 'name'), new go.Binding('segmentFraction', 'segmentFraction'),
            // new go.Binding('segmentOrientation', 'segmentOrientation'),new go.Binding('strokeWidth', 'strokeWidth'),
            //         {segmentIndex : 0, width:5, height : 4, strokeDashArray: [10, 10]})
        );



      var templeMap = new go.Map("string", go.Node);
      templeMap.add('rectTemplate', rectTemplate);
      templeMap.add('circleTemplate', circleTemplate); 
    //   templeMap.add('barTemplate', barTemplate);
      templeMap.add('tableTemplate',tableTemplate);
      templeMap.add('textTemplate',textTemplate);
      templeMap.add('topNodeTemplate',topNodeTemplate);

      linkedJson.forEach(function(d){
          d.strokeWidth = 0;
        //   if(d.key.includes("port") == true){
        //       d.isOpen = false;
        //   }
        //   if(d.key == 'vBarDS-0-0-0'){
        //       d.isOpen = true;
        //   }
      })
      barJson.forEach(function(d){
        if(d.key.includes("port") == true){
            d.isOpen = false;
        }else if(d.key.includes("ext") == true){
            d.isOpen = false;
        }else if(d.key.includes('vBarCB') == true){
            d.isOpen = false;
        }else if(d.key == 'vBarDS-0-0-0'){/////////Vertical Group 0-0
            d.isOpen = false;           
        }else if(d.key == 'vBarDS-1-1-0'){
            d.isOpen = false; 
        }else if(d.key == 'vBarDS-0-0-1'){////////////Vertical Group 0-1
            d.isOpen = false;           
        }else if(d.key == 'vBarDS-1-1-1'){
            d.isOpen = true; 
        }else if(d.key == 'vBarDS-0-0-2'){/////////Vertical Group 0-0
            d.isOpen = true;           
        }else if(d.key == 'vBarDS-1-1-2'){
            d.isOpen = false; 
        }else if(d.key == 'vBarDS-0-0-3'){/////////Vertical Group 0-0
            d.isOpen = false;           
        }else if(d.key == 'vBarDS-1-1-3'){
            d.isOpen = true; 
        }else if(d.key == 'vBarDS-0-0-4'){/////////Vertical Group 0-0
            d.isOpen = true;           
        }else if(d.key == 'vBarDS-1-1-4'){
            d.isOpen = false; 
        }else if(d.key == 'vBarDS-0-0-5'){/////////Vertical Group 0-0
            d.isOpen = false;           
        }else if(d.key == 'vBarDS-1-1-5'){
            d.isOpen = true; 
        }else if(d.key == 'vBarDS-0-0-2'){////////////Vertical Group 3
            d.isOpen = false;           
        }else if(d.key == 'vBarDS-1-1-2'){
            d.isOpen = false; 
        }else if(d.key == 'tieBar-DS-0-0-0'){//////////tieBar group 0
            d.isOpen = false;
        }else if(d.key == 'tieBar-CB-0-0-0'){
            d.isOpen = false;
        }else if(d.key == 'tieBar-DS-0-0-1'){
            d.isOpen = false;
        }else if(d.key == 'tieBar-DS-1-0-0'){//////////tieBar group 1
            d.isOpen = false;
        }else if(d.key == 'tieBar-CB-1-0-0'){
            d.isOpen = false;
        }else if(d.key == 'tieBar-DS-1-0-1'){
            d.isOpen = false;
        }else if(d.key == 'vBarDS-1-0-0'){/////////Vertical Group 1-0
            d.isOpen = true;           
        }else if(d.key == 'vBarDS-2-1-0'){
            d.isOpen = false; 
        }else if(d.key == 'vBarDS-1-0-1'){/////////Vertical Group 1-0
            d.isOpen = false;           
        }else if(d.key == 'vBarDS-2-1-1'){
            d.isOpen = true; 
        }else if(d.key == 'vBarDS-2-0-0'){/////////Vertical Group 1-0
            d.isOpen = true;           
        }else if(d.key == 'vBarDS-2-1-0'){
            d.isOpen = false; 
        }else if(d.key == 'vBarDS-1-0-2'){/////////Vertical Group 1-0
            d.isOpen = true;           
        }else if(d.key == 'vBarDS-2-1-2'){
            d.isOpen = false; 
        }else if(d.key == 'vBarDS-1-0-3'){/////////Vertical Group 1-0
            d.isOpen = false;           
        }else if(d.key == 'vBarDS-2-1-3'){
            d.isOpen = true; 
        }
        
        
        if((d.key.includes("port")!=true) && (d.key.includes("ext") != true)){
            d.color = getStatusColor(d.isOpen);
        }      
        
      })

      routeWay= linkedJson.slice();
      nodes = barJson.slice();


    diagram.nodeTemplateMap = templeMap;
      
    diagram.model.linkDataArray = linkedJson;
    diagram.model.nodeDataArray = barJson;

    }catch(error){
        alert(error);
    }
}



//수직바 그리기1
function drawVBarNode(barWidth, singleBarW, rccGroup, bar1Y, bar2Y, lastSingleBarX, portXList){
    var vBarH = parseInt(bar2Y - bar1Y); 
    var vBarBwtH = parseInt(vBarH / 4 );
    var vBarTempW = 1;
     var vBarSimbolSize = 10;
    //drawing first, second Bar    
    var splitedBarCnt ;//= vBarCnt + 2;    
    var portBarW;// = parseInt(singleBarW/splitedBarCnt);
    let rccGroupCnt = rccGroup.length;
    var json = [];
    var extNodeX = 0, extNodeY = 0;
    let vBarCnt;
    // var vBarCnt = 3;
    var barJson = [], linkedJson = []; 
    var subTopCnt = 0;
    var subTopList = [];
    var rt;
    for(var vGroupIdx = 0; vGroupIdx < rccGroupCnt; vGroupIdx++){
        //분할된 개수 만큼의 splited bar 구하기
        if(vGroupIdx %2 == 0)
            splitedBarCnt =  rccGroup[vGroupIdx].subNode.length + rccGroup[vGroupIdx].topNode.length + 1 + 1;  // 시작Node - 수직TieBar - subNode list.. - topNode list...                    
        else
            splitedBarCnt =  rccGroup[vGroupIdx].subNode.length + rccGroup[vGroupIdx].topNode.length +1;//topNode 개수 + subNode 개수
            
        portBarW = parseInt(singleBarW / splitedBarCnt);
        vBarCnt = rccGroup[vGroupIdx].subNode.length + rccGroup[vGroupIdx].topNode.length ;

        subTopList = [];
        subTopCnt = 0;
        rccGroup[vGroupIdx].subNode.forEach(function(node){
            subTopList.push(node);    
        })
        rccGroup[vGroupIdx].topNode.forEach(function(node){
            subTopList.push(node);    
        })


        //수직 그리기 vBar 개수만큼 그리기
        for(var idx=0 ; idx<(vBarCnt); idx++)//idx = groupID
        {                    
            if(idx == 0 && (vGroupIdx %2 ==0)){
                rt = setvTieBar(vBarBwtH, vBarX, bar1Y, portBarW, idx, vGroupIdx, lastSingleBarX);
                rt.barJson.forEach(function (bar){
                    barJson.push(bar);
                })
                rt.linkedJson.forEach(function (linked){
                    linkedJson.push(linked);
                })                
                vBarCnt +=1;//vTieBar 를 그렸기 때문에 하나더 그리기 위해서 +1 해줌.
            }else{
                // var vBarX = parseInt( (portBarW*(idx + 2) ) ) - parseInt(portBarW /2) ;
                // var vBarX = parseInt( (portBarW*(idx +1) ) - parseInt(portBarW/2) );
                var portBarIdx  ;
                
                var vBarX = parseInt( (portBarW * (idx + 1) ));
                console.log('vBarX = '+ vBarX);
                if(vGroupIdx %2 ==1){
                    portBarIdx = idx;
                    vBarX += lastSingleBarX - portBarW ; 
                }else{
                    portBarIdx = idx + 1;
                }
                var vBarY = bar1Y;
            
                var dsName1 = "vBarDS-"+vGroupIdx+"-0-"+idx;
                var portBarName = "portBar-0-"+vGroupIdx+"-"+(portBarIdx);
                // var hBarName = "hBar-0-"+vGroupIdx;   
                // var hBarName =  "portBar-"+vGroupIdx+"-0-"+(idx-1); 
            
                linkedJson.push({from :portBarName, fromoPort : 'port', to: dsName1, 
                            routing : go.Link.Normal, zOrder : 1, key : portBarName+'-line'}); 
            
                //the DS-1 located on vertical bar  
                vBarY += vBarBwtH; 
                
                json = { category :"circleTemplate", key: dsName1,  color: "Chocolate",  
                        w : vBarSimbolSize , h : vBarSimbolSize,  loc : new go.Point(parseInt(vBarX), vBarY), 
                        fromPort : go.Spot.None, toSpot : go.Spot.None 
                        , locationSpot: go.Spot.None
                    };
                barJson.push(json); 
                
            
                //the CB located on vertical bar 
                vBarY += vBarBwtH;  
                var cbName1 = "vBarCB-"+vGroupIdx+"-"+idx;        
                json = { category :"rectTemplate", key: cbName1,  color: "black", zOrder : 999,
                        w :  1, h : 1  ,  loc : new go.Point(Number(vBarX+4)  , vBarY)   };               
                    
                if(subTopList[subTopCnt].type == 'Load' ||  subTopList[subTopCnt].type == 'Gen'){

                    extNodeX = vBarX - parseInt((portBarW/3 )) ;
                    var cPorts = [            
                    {type : "rectPort", portId : "bPort", toSpot : go.Spot.None, fromSpot : go.Spot.None, 
                        color : 'white', w : 1, h : 1, text : ""  , zOrder : -1         },
                    {type : "rectPort", portId : "rPort", toSpot : go.Spot.None, fromSpot : go.Spot.Left, 
                        color : 'white', w : 0, h : 0, text : ""
                    }
                    ];
                    json.ports = cPorts;
                    linkedJson.push({from: dsName1,  to : cbName1, toPort : "bPort", routing : go.Link.Normal , zOrder : 1});
                    barJson.push(json); 

                     //to Bottom
                     extNodeY = vBarH +  vBarY *.75;

                     var textName = 'value-'+vGroupIdx + "-" + idx;
                    json =  { category : 'textTemplate',key: textName, name : textName, title : "L", evtCnt  :"0",
                            mvar : "12,333", mw : "90,333",
                            soc : "90", loc : new go.Point(extNodeX -30, extNodeY + 20 )};
                    barJson.push(json);
                }else{

                    extNodeX = vBarX + parseInt((portBarW/4 )) - 8;
                    var cPorts = [            
                        {type : "rectPort", portId : "bPort", toSpot : go.Spot.None, fromSpot : go.Spot.None, 
                            color : 'tranparent', w : 0, h : 0, text : ""  , zOrder : 0         },
                        {type : "rectPort", portId : "rPort", toSpot : go.Spot.None, fromSpot : go.Spot.Right, 
                            color : 'tranparent', w : 0, h : 0, text : ""
                        }
                    ];
                    json.ports = cPorts;
                    linkedJson.push({from: dsName1,  to : cbName1, toPort : "bPort", routing : go.Link.Normal , zOrder : 1});
                    barJson.push(json); 


                     //to Up
                     extNodeY = vBarH - vBarY * 1.25;

                     var textName = 'value-'+vGroupIdx + "-" + idx;
                     json =  { key: textName, title : subTopList[subTopCnt].name, 
                        category: "topNodeTemplate" , loc : new go.Point(extNodeX - 30, extNodeY -50)};
                    
                    barJson.push(json);
                }
                subTopCnt++;         
                // extNodeX = vBarX + parseInt((portBarW / 3));
                var exDSName = "extDS-"+vGroupIdx+"-"+idx;
                json = { category :"circleTemplate", key: exDSName,  color: "pink",  
                        w : vBarSimbolSize , h : vBarSimbolSize, loc : new go.Point(extNodeX, extNodeY) ,
                        isOpen : true
                    };
                barJson.push(json);    
                linkedJson.push({from : cbName1, fromPort : "rPort",  to: exDSName, toPort : exDSName, 
                        routing: go.Link.Orthogonal, corner: 1});         
            
                //the DS-2 located on vertical bar 
                dsName2 = "vBarDS-"+(vGroupIdx+1)+"-1-"+idx;
                vBarY += vBarBwtH; 
                json = { category :"circleTemplate", key:dsName2 ,  color: "blue", locationSpot: go.Spot.None  ,
                        w : vBarSimbolSize , h : vBarSimbolSize,   loc : new go.Point(parseInt(vBarX), vBarY),
                        isOpen  : true
                    };
                barJson.push(json);          
                
                // var bottomPortName = "portBar-1-"+(vGroupIdx)+"-"+(idx+1);
                var bottomPortName = "portBar-1-"+(vGroupIdx) + "-" + (portBarIdx);
                hBarName = "hBar-1-"+(vGroupIdx);        
                linkedJson.push({from : cbName1, fromPort : "bPort", to: dsName2 , routing : go.Link.Normal, zOrder : 1});
                linkedJson.push({from : dsName2,  to : bottomPortName, toPort : "port", routing : go.Link.Normal, zOrder : 1});
                // linkedJson.push({from: "hBar-0-"+vGroupIdx, fromPort :portBarName ,  to : hBarName, toPort: bottomPortName, routing : go.Link.Normal , zOrder : 1});
            }
            
        }  
    }
    
    return {barJson : barJson, linkedJson : linkedJson};
}   
//내부 수직바 그리기2
function setvTieBar(vBarBwtH, vBarX, bar1Y, portBarW, idx, vGroupIdx, lastSingleBarX){
    var barJson = [], linkedJson = [];
    // var vBarX = parseInt( (portBarW*(idx+1) ) - parseInt(portBarW/2) );
    var vBarX = parseInt( (portBarW*(idx+1) )  );
    var vBarSimbolSize = 10;
    var portBarSize = 8;
    console.log('vBarX = '+ vBarX);
    if(vGroupIdx > 0)
        vBarX += lastSingleBarX ;

    var vBarY = bar1Y;

    var dsName1 = "vBarDS-"+vGroupIdx+"-0-"+idx;
    var portBarName = "portBar-0-"+vGroupIdx+"-"+(idx +1);
    var hBarName = "hBar-0-"+vGroupIdx;    

    
    //the DS-1 located on vertical bar  
    vBarY += vBarBwtH; 
    vBarX = Number(vBarX);
    var circlePort = [            
        // {type : "rectPort", portId : "bPort", toSpot : go.Spot.Top, fromSpot : go.Spot.None, 
        //     color : 'yello', w : 0, h : 0, text : ""  , zOrder : 0         },
        {type : "circlePort", portId : "rPort", toSpot : go.Spot.None, fromSpot : go.Spot.None, 
            color : 'transparent', w : portBarSize, h : portBarSize, text : "",  zOrder : 0
        }
    ];  
    json = { category :"circleTemplate", key: dsName1,  color: "Chocolate",  
            w : vBarSimbolSize , h : vBarSimbolSize,  loc : new go.Point(vBarX, vBarY), 
              zOrder : 0
        };
    // json.ports = circlePort;
    barJson.push(json); 
    linkedJson.push({from :portBarName, fromPort : "port",  fromSpot : go.Spot.None,
            to: dsName1, toPort : "port",tpSpot : go.Spot.None, routing : go.Link.Normal,  zOrder : 0}); 

    

    //the CB located on vertical bar 
    vBarY += vBarBwtH;  
    var cbName1 = "vBarCB-"+vGroupIdx+"-"+idx;        
    json = { category :"rectTemplate", key: cbName1,  color: "yellow", 
            w :vBarSimbolSize  , h : vBarSimbolSize ,  loc : new go.Point((vBarX), vBarY) ,
          locationSpot: go.Spot.None,  zOrder : 999 };
    var cPorts = [            
        // {type : "rectPort", portId : "bPort", toSpot : go.Spot.Top, fromSpot : go.Spot.None, 
        //     color : 'yello', w : 0, h : 0, text : ""  , zOrder : 0         },
        {type : "rectPort", portId : "port", toSpot : go.Spot.None, fromSpot : go.Spot.None, 
            color : 'yellow', w : 0, h : 0, text : "",  zOrder : 0
        }
    ];  
    json.ports = cPorts;
    linkedJson.push({from: dsName1,  to : cbName1, toPort : "port", routing : go.Link.Normal,  zOrder : 0});
    barJson.push(json);     
    

    //the DS-2 located on vertical bar 
    dsName2 = "vBarDS-"+(vGroupIdx+1)+"-1-"+idx;
    vBarY += vBarBwtH; 
    json = { category :"circleTemplate", key:dsName2 ,  color: "blue",
            w : vBarSimbolSize , h : vBarSimbolSize,   loc : new go.Point(vBarX , vBarY) ,
             locationSpot: go.Spot.None };
    barJson.push(json);          
    
    var bottomPortName = "portBar-1-"+(vGroupIdx)+"-"+(idx +1);
    hBarName = "hBar-1-"+(vGroupIdx);        
    linkedJson.push({from : cbName1, fromPort : "port", to: dsName2 , routing : go.Link.Normal,  zOrder : 0});
    linkedJson.push({from : dsName2,  to : bottomPortName, toPort : "port", toSpot : go.Spot.None,
        routing : go.Link.Normal,  zOrder : 0});

    return {barJson : barJson, linkedJson : linkedJson };
} 

//수평바 그리기
function drawHVarNode(barWidth, singleBarW, rccGroup,  barCnt, barX, barY, bar2Y, h){
    let lastSingleBarX;
    var barJson = [];
    var linkedJson = []; 
    var json; 
    
    var portXList = []; //portX 만 가지고 있는 리스트, drawVbar에서 그릴때 사용
     
    //전체 bar 길이 / rcc그룹 개수 + 각 bar에서 나눠야 하는 그룹 개수
    // var singleBarW = parseInt((barWidth / (rccGroupCnt)));
    let rccGroupCnt = rccGroup.length;

    //drawing first, second Bar    
    var splitedBarCnt;// = barCnt + 2;   
    // var singleBarW = parseInt((barWidth * .2));    
    var portBarW;// = parseInt(singleBarW/splitedBarCnt); 
    var portBarSize = 10;
    var barName;
    var cnt = 0;
    let space = 0;
    barX = parseInt(barX);
    //bar-rowIdx-colIdx 
    //j = 0 -> 위 Bar, j = 1 -> 아래 Bar
    for(var j = 0; j < 2; j++)
    {

        //각 그룹별 barCnt개수 별로 나누기
        //i 는 하나에서 나워진 Bar 
        for(var i=0; i < (rccGroupCnt+1); i++ )
        {                 
            
            //일반 Bar 인 경우(짝수 인 경우, 맨 앞, 맨 뒤 버스 혹은 중간, bus - tie - bus)
            if(i % 2 == 0)
            {             
                if(i == 0){
                    splitedBarCnt =  Number(rccGroup[i].subNode.length + rccGroup[i].topNode.length + 1 + 1  ); // 시작Node - 수직TieBar - subNode list.. - topNode list...                    
                }else{
                    splitedBarCnt =  Number(rccGroup[i-1].subNode.length + rccGroup[i-1].topNode.length + 1); // sunNode list ... - topNode list ....
                }
                portBarW = Number(singleBarW / splitedBarCnt); 
                
                barName = "hBar-"+j+'-'+parseInt(cnt); 
               
                var portBarName ;
                var portBarList = [];
                for(var portId = 0; portId < splitedBarCnt; portId++){
                    var ports = [];
                    portBarName = 'portBar-'+j+'-'+cnt+'-'+portId;
                    
                    ports.push({type : "rectPort", "portId" : 'port', color : getRandomColor(), 
                                toSpot : go.Spot.None, fromSpot : go.Spot.None, w : 1, h : 1});  
                                
                    console.log('hBar : '+ barName + ', portBarName : ' + portBarName)
                    //draw HBar & portBar & singleBar Node
                    var json = { category :"rectTemplate", key: portBarName, color : 'black',    
                        w : portBarSize  , h : portBarSize,  loc : new go.Point(barX, barY) ,
                        isOpen : false        
                    }; 
                    portBarList.push(json);
                    console.log(barName +' X,Y = '+barX +','+barY); 
                    json.ports = ports;
                    barJson.push(json);  
                    barX += parseInt(portBarW);
                    space = parseInt(portBarW);
                } 
                for(var pId = 0; pId < portBarList.length -1; pId++){
                    linkedJson.push({from : portBarList[pId].key, fromPort : 'port', fromSpot : go.Spot.Left,
                                     to : portBarList[pId+1].key, toPort : 'port', toSpot : go.Spot.Right
                                    });
                }                
                 
                // barX += singleBarW ;//singlebar 길이 만큼 x위치 이동
                cnt++;
                
            }
            else    
            {
                //tie bar 인경우(홀수인 경우, 무조건 가운데 있기 때문)
                //tie section template 
                tieDSW = Number(portBarW/2);
                var dsName1 = 'tieBar-DS-'+j+'-'+(i-1)+'-0';//단순 인덱싱 위해서 (i-1)수행
                var cbName1 = 'tieBar-CB-'+j+'-'+(i-1)+'-0';
                var dsName2 = 'tieBar-DS-'+j+'-'+(i-1)+'-1';
                var hBar1 = "hBar-"+j+"-"+(i-1);
                var hBar2 = "hBar-"+(j)+"-"+(i);
                var pBar1 = "portBar-"+j+"-"+(i-1)+"-"+(cnt-1);
                var pBar2 = "portBar-"+j+"-"+(i)+"-0";
                // var pBarCenterPos = node.findObject(pBar1).getDocumentPoint(go.Spot.None)
                //the DS located on tieBar
                
                barX -= parseInt(space/2);//왼쪽 bar의 마지막 portBarX 위치 + tieBar 공간
                
                linkedJson.push({from : portBarList[portBarList.length-1].key, fromPort : 'port', to : dsName1});
                //the DS located on tieBar
                json = { category :"rectTemplate", key: dsName1,  color: "green",  w : portBarSize , h : portBarSize, 
                        loc : new go.Point(barX, barY) ,fromPort : go.Spot.Right, toSpot : go.Spot.None  
                };               
                portXList.push(barX);
                console.log(dsName1 +"'s X,y : "+barX + ', '+ barY)
                barJson.push(json);                   
                barX += tieDSW;
                 

                //the CB located on tieBar
                json ={ category :"circleTemplate", key: cbName1,  color: "red", w : portBarSize , h : portBarSize, 
                        loc : new go.Point(barX, barY), fromPort : go.Spot.None, toSpot : go.Spot.None
                };//DS
                portXList.push(barX);
                console.log(cbName1 +"'s X,y : "+barX + ', '+ barY)
                barJson.push(json);
                linkedJson.push({from : dsName1, to : cbName1});
                barX +=  tieDSW;

                 
                //the DS located on tieBar
                json = { category :"rectTemplate", key: dsName2,  color: "yellow",  w : portBarSize , h : portBarSize, 
                        loc : new go.Point(barX, barY) ,fromPort : go.Spot.Right, toSpot : go.Spot.None 
                };
                portXList.push(barX);
                console.log(dsName2 +"'s X,y : "+barX + ', '+ barY)
                linkedJson.push({from : cbName1, to : dsName2});
                barJson.push(json);  
                lastSingleBarX = barX + tieDSW;
                // barX += tieDSW;
                barX += parseInt(space/2);//tieBar 공간 + 오른쪽 bar의 마지막 portBarX 위치
                                
                linkedJson.push({from : dsName2, to : pBar2, toPort : 'port'});
            }
            
        }
        cnt = 0;
        barY = bar2Y;
        barX = 0;
      }  
      
      return {barJson : barJson, linkedJson, linkedJson, lastSingleBarX : lastSingleBarX, portXList : portXList};
}




function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    // return color;
    // return 'black';
    return 'tranparent';
  }
  
  function getStatusColor(isOpen){
      return isOpen == true ? 'green' : 'red'
  }

//현재노드의 Open Close 를 체크 하는 함수
//open = true, close = false
function checkStatus(key){
    
        for(var i =0; i<nodes.length; i++){
            if(key == nodes[i].key){
                return nodes[i].isOpen;
            }
        }
    }

    
function showMessage(text) {   
    document.getElementById("diagramEventsMsg").textContent = text;
}


function animiate(diagram) { 
    setInterval(function() {
        var oldskips = diagram.skipsUndoManager;
        diagram.skipsUndoManager = true;
        diagram.links.each(function(link) {
            var segment = 0.03;
            // shape.visible = true;
            var shape = link.findObject("UP");
            if(shape !=null){ 
                var offDash = shape.strokeDashOffset + 2;
                shape.strokeDashOffset = (offDash <= 0) ? 20 : offDash;
            }
            shape = link.findObject("DOWN");
            if(shape !=null){ 
                var offDash = shape.strokeDashOffset - 2;
                shape.strokeDashOffset = (offDash <= 0) ? 20 : offDash;
            } 
            shape = link.findObject("LEFT");
            if(shape !=null){ 
                var offDash = shape.strokeDashOffset + 2;
                shape.strokeDashOffset = (offDash <= 0) ? 20 : offDash;
            }
            shape = link.findObject("RIGHT");
            if(shape !=null){ 
                var offDash = shape.strokeDashOffset - 2;
                shape.strokeDashOffset = (offDash <= 0) ? 20 : offDash;
            } 
            shape = link.findObject("myTemp");
            if(shape !=null){ 
            //    shape.visible = true;
               shape.stroke = 'red';
            } else{
                shape.stroke = shape.stroke;
            }
          });
        diagram.skipsUndoManager = oldskips;
        // animiate(diagram);
      }, 50);
}  


// function animiate(diagram) { 
//     setInterval(function() {
//         var oldskips = diagram.skipsUndoManager;
//         diagram.skipsUndoManager = true;
//         diagram.links.each(function(link) {
//             var segment = 0.03;
//             // shape.visible = true;
//             var shape = link.findObject("UP");
//             if(shape !=null){
//                 var off = shape.segmentFraction - segment;
//                 shape.segmentFraction = (off <= 0) ? 1 : off; 
//                 shape.angle = 270;

                
//                 // shape.segmentOrientation = go.Link.OrientOpposite;
                
//                 var offDash = shape.strokeDashOffset - 2;
//                 shape.strokeDashOffset = (offDash <= 0) ? 20 : offDash;
//             }
//             shape = link.findObject("DOWN");
//             if(shape !=null){
//                 var off = shape.segmentFraction + segment;
//                 shape.segmentFraction = (off >= 1) ? 0 : off; 
//                 shape.angle = 90; 

//                 var offDash = shape.strokeDashOffset + 2;
//                 shape.strokeDashOffset = (offDash <= 0) ? 20 : offDash;
//             }
//             shape = link.findObject("RIGHTDOWN");
//             if(shape !=null){
//                 var off = shape.segmentFraction + segment;
//                 shape.segmentFraction = (off >= 1) ? 0 : off; 
//                 shape.segmentIndex = 3;                
//                 shape.angle = 180;  
                
//                 var offDash = shape.strokeDashOffset + 2;
//                 shape.strokeDashOffset = (offDash <= 0) ? 20 : offDash;
//             }
//             shape = link.findObject("LEFT");
//             if(shape !=null){
//                 var off = shape.segmentFraction - segment;
//                 shape.segmentFraction = (off <= 0) ? 1 : off; 
//                 shape.angle = 180;  

//                 var offDash = shape.strokeDashOffset - 2;
//                 shape.strokeDashOffset = (offDash <= 0) ? 20 : offDash;
//                 // var offDash = shape.strokeDashOffset - 2;
//                 // shape.strokeDashOffset = (offDash <= 0) ? 20 : offDash;
//             }

//             shape = link.findObject("RIGHT");
//             if(shape !=null){
//                 var off = shape.segmentFraction + segment;
//                 shape.segmentFraction = (off >= 1) ? 0 : off;                 
//                // shape.angle = 0;

//                var offDash = shape.strokeDashOffset - 2;
//                 shape.strokeDashOffset = (offDash <= 0) ? 20 : offDash;
//                 // shape.segmentOrientation = go.Link.OrientOpposite;
//                 // shape.segmentOffset = new go.Point(0,0);
//                 // var offDash = shape.strokeDashOffset - 2;
//                 // shape.strokeDashOffset = (offDash <= 0) ? 20 : offDash;                
//             }
            
//           });
//         diagram.skipsUndoManager = oldskips;
//         // animiate(diagram);
//       }, 50);
// }  




function searching(myDlg, from, dest){

    // var nodeMap = new HashMap();
    fromNodeMap.clear();
    toNodeMap.clear();
    let nodeList = myDlg.model.nodeDataArray;

    for(var i=0; i< myDlg.model.linkDataArray.length; i++){
        var link = myDlg.model.linkDataArray[i];
        if(link.from == 'tr2'){
            console.log('1');
        }
        if(fromNodeMap.get(link.from) == null){
            fromNodeMap.set(link.from, link.to);
        }else{
            var tmp = [];
            var f = fromNodeMap.get(link.from);
            if(f instanceof Array){
                for(var childIdx = 0; childIdx < f.length; childIdx++){
                    tmp.push(f[childIdx]);
                }
                tmp.push(link.to);
            }else{
                tmp.push(f);
                tmp.push(link.to);  
            }
            
            fromNodeMap.set(link.from, tmp);
        }

        if(toNodeMap.get(link.to) == null){
            toNodeMap.set(link.to, link.from);
        }else{
            var tmp = [];
            var f = toNodeMap.get(link.to);
            tmp.push(f);
            tmp.push(link.from);
            toNodeMap.set(link.to, tmp);
        }
    }

    checkedNode = [];
    linkedNode = [];
    linkedLine = [];
    routing111(myDlg, from, dest);
    animiate(myDlg);
        
}






function routing111(myDlg, from ,to){
    var node;
    for(var i=0; i< checkedNode.length; i++){
        if(checkedNode[i] == from)
        { 
            return;
        }
    }
    
    checkedNode.push(from);
    //////////////////////test///////////////////////////
    i
    if(from == to){
        console.log('!!!!!!!!!');
        var currentNode, nextNode;
        var l;
        linkedNode.push(to); 
        var it;
        var tempLink = [];

        linkedNode.forEach(function(name){
            console.log(name);
        })
        for(var i=0; i < linkedNode.length -1; i++){
            for(j = 0; j < routeWay.length ; j++){
                if(routeWay[j].from == linkedNode[i] && routeWay[j].to == linkedNode[i+1])
                {   
                    if(routeWay[j].from.includes('port') == true && routeWay[j].to.includes('vBarDS') == true){
                        routeWay[j].name = "DOWN";    
                    }
                    else if(routeWay[j].from.includes('vBarDS') == true && routeWay[j].to.includes('vBarCB') == true){
                        routeWay[j].name = "DOWN";    
                    }else if(routeWay[j].from.includes('vBarDS') == true && routeWay[j].to.includes('port') == true){
                        routeWay[j].name = "DOWN";    
                    } else if(routeWay[j].from.includes('vBarCB') == true && routeWay[j].to.includes('ext') == true){
                        routeWay[j].name = "RIGHTDOWN";
                    }
                    else{
                        routeWay[j].name = "RIGHT";
                    } 
                    
                     routeWay[j].strokeWidth = 5; 
                }else if(routeWay[j].to == linkedNode[i] && routeWay[j].from == linkedNode[i+1]){
                    if(routeWay[j].from.includes('vBarDS') == true && routeWay[j].to.includes('port') == true){
                        if(routeWay[j].to.split('-')[1] == '0')//portBar가 상단일때 portBar-0-*-*
                        {
                            routeWay[j].name = "DOWN";
                        }else//portBar가 하단일때  portBar-1-*-*
                        {
                            routeWay[j].name = "UP";
                        } 
                    }
                    else if(routeWay[j].from.includes('vBarCB') == true && routeWay[j].to.includes('vBarDS') == true){
                        routeWay[j].name = "UP";
                    }else if(routeWay[j].from.includes('vBarDS') == true && routeWay[j].to.includes('vBarCB') == true){
                        routeWay[j].name = "UP";
                    }else if(routeWay[j].from.includes('port') == true && routeWay[j].to.includes('vBarDS') == true){
                        routeWay[j].name = "UP";
                    }else if(routeWay[j].from.includes('vBarCB') == true && routeWay[j].to.includes('ext') == true){
                        routeWay[j].name = "LEFT";
                    }
                    else{
                        routeWay[j].name = "LEFT";
                    } 
                    routeWay[j].strokeWidth = 5;
                }
            }
            tempLink.push({from : linkedNode[i], to : linkedNode[i+1] , color : 'red', name : 'myTemp'})
            
        }
        // routeWay.concat(tempLink);
        tempLink.concat(routeWay);

         myDlg.model.linkDataArray = tempLink;

        console.log('!!!!!!!!!');
        return;
    }
    //openClose 체크
    //true == 더이상 탐색할 필요 없음.(open 된 상태이기 때문에)
    if(checkStatus(from) == true){
        return ;
    }
    else{
        linkedNode.push(from);    
    }    


    
    //to 에 있는지 조회
    node = toNodeMap.get(from);
    if(node != undefined && node instanceof Array){
        //to이랑 연결된 것들 조회
        for(var i=0; i < node.length; i++){
            routing111(myDlg, node[i], to);
        }
    }else if(node != undefined){
        //to랑 연결된것 조회
        routing111(myDlg, node, to);
    }
    if(node == undefined){
        if(node = fromNodeMap.get(from) == null)
        {linkedNode.pop();
        return;
        }
        // linkedLine.remove(from);
    }




    //from 이 있는지 조회
    node = fromNodeMap.get(from);
    if(node != undefined && node instanceof Array){
        //from이랑 연결된 것들 조회
        for(var i=0; i < node.length; i++){
            routing111(myDlg, node[i], to);
        }
    }else if(node != undefined){
        //from이랑 연결된것 조회
        routing111(myDlg, node, to);
    }

    if(node == undefined){
        linkedNode.pop();
        return;
        // linkedLine.remove(from);
    }
    


    linkedNode.pop();
 
}