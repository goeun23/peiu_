
let lineColor = 'black';
let fromList = [];
let toList = [];
let rccSvg;

let lineFunction = d3.line()
    .x(function (d) {  return d.x + 80; })
    .y(function (d) { return d.y; }) 

function drawRcc(rccData, diagramDivName) 
{
  var w = document.getElementById(diagramDivName).style.width,
    h = document.getElementById(diagramDivName).style.height,
    margin = {
      top: 20,
      right: 10,
      bottom: 20,
      left: 10
    },
    radius = 5;
  var eleTotalCnt = 0;
  for(var i =0 ; i < rccData.rccGroup.length; i++){
    eleTotalCnt +=rccData.rccGroup[i].subNode.length;
    // eleTotalCnt +=rccData.rccGroup[i].topNode.length;
  }

  var dWidth = document.getElementById(diagramDivName).clientWidth - 0; // the width of diagram
  var dHeight = document.getElementById(diagramDivName).clientHeight; // the height of diagram
  
  // var barWidth = parseInt(dWidth/(eleTotalCnt * .25));
  var barWidth = parseInt(dWidth/(eleTotalCnt));
  var barHeight = 4;
  var bar1Y = (dHeight / 3).toFixed(0) * 1
  var bar2Y = (dHeight / 3).toFixed(0) * 2;
  var singleBarW = parseInt((barWidth * 1));
  var rccGroup = rccData.rccGroup;
  //전체 bar 길이 / rcc그룹 개수 + 각 bar에서 나눠야 하는 그룹 개수
  // var singleBarW = parseInt((barWidth / (rccGroupCnt)));
  let rccGroupCnt = rccGroup.length;

  //drawing first, second Bar    
  var splitedBarCnt; // = barCnt + 2;   
  // var singleBarW = parseInt((barWidth * .2));    
  var portBarW; // = parseInt(singleBarW/splitedBarCnt); 
  var portBarSize = 10;
  var barName;
  var cnt = 0;
  let space = 0;
  var barJson = [];
  var linkedJson = [];
  var barX = 50,
  barY = bar1Y;
  barX = parseInt(barX);


  rccSvg = d3.select("#"+diagramDivName)
    .append("svg")
    .attr("class","svgLineDlg")
      .attr( 'width', dWidth  )
      .attr( 'height', dHeight )
      .attr('margin-right', 100)
      .attr('margin-left', 100)
      .attr("fill", "black");
 
  // rccSvg.on("contextmenu", function(data, index) {
  //   rccContextMenu(this, 'svg', data, index);
  //   d3.event.preventDefault();
  // });
////////////////////수평 데이터 세팅//////////////////////////////
  _drawHVarNode2(barWidth, rccGroup, barX, barY, bar2Y);

  var obj = _drawHVarNode(barWidth, rccGroup, barX, barY, bar2Y);
  let lastSingleBarX = obj.lastSingleBarX;
  var barObj;
  var topLinePath = [];
  var bottomLinePath = [];
  var hBarJson = obj.barJson;
  var hLinkedJson = obj.linkedJson;
  var portXList = obj.portXList;
  var extLineJson;




  ////////////////////수직 데이터 세팅//////////////////////////////
  obj = _drawVBarNode(singleBarW, rccGroup, bar1Y, bar2Y, lastSingleBarX, portXList);
  var vLinkedJson = obj.linkedJson;
  var vBarJson = obj.barJson;
  extLineJson = obj.extPath;

  hBarJson.forEach(function (json) {
    barJson.push(json);
  })
  vBarJson.forEach(function (json) {
    barJson.push(json);
  }) 

  /////////////////// 수평CB, DS 데이터 세팅//////////
  barJson = setStatus(barJson);
  ///////////////////////////////////////////   
  var json;
  var rt;
  var drawXY;
  var linkPath = [];
  var rccInterval1, rccInterval2;

  //수평선 데이터 설정
  hLinkedJson.forEach(function (json) {
    linkedJson.push(json);
  })

  //수직선 데이터 설정
  vLinkedJson.forEach(function (json){
    linkedJson.push(json);
  })

  for(var i=0; i<linkedJson.length; i++){ 
    json = linkedJson[i];
    rt = _fromToXY(barJson, json.from, json.to); 
    linkPath.push({x : rt.fromXY.x, y : rt.fromXY.y})
    linkPath.push({x : rt.toXY.x, y : rt.toXY.y})
    // rccSvg.append("path")
    //   .attr("d", lineFunction(linkPath))
    //   .attr("stroke", "#7F9FFF")
    //   .attr("stroke-width", 2)
      
      linkPath = [];
  } 
  
  /////////////////////수평 CB, DS 그리기/////////////////////
  for (var i = 0; i < hBarJson.length; i++) {
    barObj = hBarJson[i];
    if (barObj.category == "circleTemplate") {
      drawRccCircle(barObj.loc.barX, barObj.loc.barY, 5, 5, getStatusColor(barObj.isOpen), barObj.key);
    } else { 
      if((barObj.key.indexOf('port') >= 0))
      {
        drawRccRect(barObj.loc.barX, barObj.loc.barY-3, .5, .5, 'transparent', barObj.key);
      } 
      else if(barObj.key.indexOf('tieBar-CB') >= 0)
      {
        drawRccRect(barObj.loc.barX, barObj.loc.barY-2, 4, 4, getStatusColor(barObj.isOpen),barObj.key);
      }     
      else 
      {
        drawRccRect(barObj.loc.barX, barObj.loc.barY, 5, 5, getStatusColor(barObj.isOpen), barObj.key);
      }
    }
  }  
  
  //////////////////////////////////수직 선 그리기////////////////////////////   
  for (var i = 0; i < vBarJson.length; i++) {
    barObj = vBarJson[i];
    if (barObj.category == "circleTemplate") { 
      
      drawRccCircle(barObj.loc.barX, barObj.loc.barY, 4, 4, getStatusColor(barObj.isOpen), barObj.key);

    }
     else
    {
      if(barObj.key.indexOf("conn") >= 0 || barObj.key.indexOf("vBarCB") >= 0)
      {
        drawRccRect(barObj.loc.barX, barObj.loc.barY, 10, 10, barObj.color, barObj.key);
      } 
      else if(barObj.key.indexOf("extNode-0") >= 0)
      {
        var _rect = drawRccRect(barObj.loc.barX-2, barObj.loc.barY, 4, 4, getStatusColor(barObj.isOpen),barObj.key);
        _drawUpText(_rect, barObj.name, barObj.key);
      }
      else if(barObj.key.indexOf("extNode-1") >= 0)
      {
        var _rect = drawRccRect(barObj.loc.barX-2, barObj.loc.barY, 4, 4, getStatusColor(barObj.isOpen),barObj.key);
        _drawDnText(_rect, barObj.name, barObj.key);
      }
      else
      {
        drawRccRect(barObj.loc.barX, barObj.loc.barY, 4, 4, getStatusColor(barObj.isOpen),barObj.key);
      } 
    }
  }  

 


  //////////////////////////////routing
  linkedJson = [];
  hLinkedJson.forEach(function (json) {
    linkedJson.push(json);
  })
  vLinkedJson.forEach(function (json) {
    linkedJson.push(json);
  })

  /////////////////////////////////////temp
  var topRccList=['extNode-0-0-0','extNode-0-1-0','extNode-0-2-0','extNode-0-3-0','extNode-0-4-0'];
  var btnRccList=['extNode-1-0-0','extNode-1-0-1',
            'extNode-1-1-0','extNode-1-1-1',
            'extNode-1-2-0','extNode-1-2-1','extNode-1-2-2',
            'extNode-1-3-0','extNode-1-3-1',
            'extNode-1-4-0', 'extNode-1-4-1', 'extNode-1-4-2'
  ];
  //  searchingRcc(barJson, linkedJson, 'extNode-0-1-0', 'extNode-1-4-1'); 
  clearInterval(rccInterval1);
  clearInterval(rccInterval2);

  // rccInterval1 = setInterval(() => {
  //   var valueMVAR, varlueMW, valueA; 
  //   var topIdx = Math.floor(Math.random() * (topRccList.length - 1)) + 0;
  //   var bottomIdx = Math.floor(Math.random() * (btnRccList.length - 1))+0;
  //   var start = topRccList[topIdx];
  //   var dest = btnRccList[bottomIdx];
  //   searchingRcc(barJson, linkedJson, start, dest);
  //   // console.log(start + '->' + dest);

  //   valueMVAR = getRandomArbitrary(300.5, 120.4).toFixed(2);
  //   varlueMW = getRandomArbitrary(300.5, 120.4).toFixed(2);
  //   valueA = getRandomArbitrary(300.5,-120.4).toFixed(2);

  //   topRccList.forEach((nodeId) => {
  //     d3.select("text#MVAR-"+nodeId).text("0 MVAR");
  //     d3.select("text#MW-"+nodeId).text("0 MW");
  //     d3.select("text#A-"+nodeId).text("0 V");
  //   });
  //   btnRccList.forEach((nodeId) =>{
  //     d3.select("text#MVAR-"+nodeId).text("0 MVAR");
  //     d3.select("text#MW-"+nodeId).text("0 MW");
  //     d3.select("text#A-"+nodeId).text("0 V");
  //   })

  //   d3.select("text#MVAR-"+start).text(valueMVAR + " MVAR");
  //   d3.select("text#MW-"+start).text(varlueMW + " MW");
  //   d3.select("text#A-"+start).text(valueA + " V");

  //   d3.select("text#MVAR-"+dest).text(valueMVAR + " MVAR");
  //   d3.select("text#MW-"+dest).text(varlueMW + " MW");
  //   d3.select("text#A-"+dest).text(valueA + " V");    

  //   rccInterval2 = setTimeout(() => {
  //     rccSvg.selectAll("path#aniPath").remove();
  //     rccSvg.selectAll("g#aniLineGroup").remove();
  //   },1500) 
  // },3000);  

  
}




//수평바 그리기
function _drawHVarNode(singleBarW, rccGroup, barX, barY, bar2Y) {
  // barY = barY-2;
  let lastSingleBarX;
  var barJson = [];
  var linkedJson = [];
  var json;

  var portXList = []; //portX 만 가지고 있는 리스트, drawVbar에서 그릴때 사용

  //전체 bar 길이 / rcc그룹 개수 + 각 bar에서 나눠야 하는 그룹 개수
  // var singleBarW = parseInt((barWidth / (rccGroupCnt)));
  // let rccGroupCnt = rccGroup.length %2 ==0 ? (rccGroup.length+1) : (rccGroup.length+2);
  let rccGroupCnt = rccGroup.length + (rccGroup.length-1);

  //drawing first, second Bar    
  var splitedBarCnt; // = barCnt + 2;  
  var portBarW; // = parseInt(singleBarW/splitedBarCnt); 
  var portBarSize = 2;
  var barName;
  var cnt = 0;
  let space = 0;
  barX = parseInt(barX);
  var portIdx=0;
  var isTempBar = true;
  //bar-rowIdx-colIdx 
  //j = 0 -> 위 Bar, j = 1 -> 아래 Bar
  for (var j = 0; j < 2; j++) {
    isTempBar = true;
    //각 그룹별 barCnt개수 별로 나누기
    //i 는 하나에서 나워진 Bar 
    for (var i = 0; i < (rccGroupCnt ); i++) {

      //일반 Bar 인 경우(짝수 인 경우, 맨 앞, 맨 뒤 버스 혹은 중간, bus - tie - bus)
     
      if (i % 2 == 0) 
      {
        if (isTempBar == true && (i == 0))
        {
          // console.log(j +", " + i);
          splitedBarCnt = Number(rccGroup[cnt].subNode.length + rccGroup[cnt].topNode.length + 1 + 1); // 시작Node - 수직TieBar - subNode list.. - topNode list...                    
          isTempBar = false;
        }else if(isTempBar == true && (i +1) != rccGroupCnt)
        {
          isTempBar = false;
          splitedBarCnt = Number(rccGroup[cnt].subNode.length + rccGroup[cnt].topNode.length +1); // sunNode list ... - topNode list ....
        }
        else if(isTempBar == true && (i +1) == rccGroupCnt)
        {
          isTempBar = false;
          splitedBarCnt = Number(rccGroup[cnt].subNode.length + rccGroup[cnt].topNode.length +1+1); // sunNode list ... - topNode list ....
        }
        else if((i +1) == rccGroupCnt)
        {
          isTempBar = false;
          splitedBarCnt = Number(rccGroup[cnt].subNode.length + rccGroup[cnt].topNode.length +1); // sunNode list ... - topNode list ....
        }
         else {
          isTempBar = true;
          splitedBarCnt = Number(rccGroup[cnt].subNode.length + rccGroup[cnt].topNode.length ); // sunNode list ... - topNode list ....
        }
        portBarW = Number(singleBarW / splitedBarCnt) * .5;
        // portBarW = portBarW / 3;
        barName = "hBar-" + j + '-' + parseInt(cnt);

        var portBarName;
        var portBarList = [];
        for (var portId = 0; portId < splitedBarCnt; portId++) {
          var ports = [];
          portBarName = 'portBar-' + j + '-' + cnt + '-' + portId;

          ports.push({
            type: "rectPort", "portId": 'port', color: getRandomColor(),
            w: 1, h: 1
          });

          //draw HBar & portBar & singleBar Node
          var json = {
            category: "rectTemplate", key: portBarName, color: 'black', 
            w: portBarSize,  h: portBarSize, loc: { barX, barY }, isOpen: false
          };

          portXList.push(barX);
          portBarList.push(json);
          
          json.ports = ports;
          barJson.push(json);
          barX += parseInt(portBarW);
          space = parseInt(portBarW);
        }
        for (var pId = 0; pId < portBarList.length - 1; pId++) {
          linkedJson.push({  from: portBarList[pId].key,  to: portBarList[pId + 1].key  });
        }
       
        // barX += singleBarW ;//singlebar 길이 만큼 x위치 이동
        

      } 
      else 
      {
        //tie bar 인경우(홀수인 경우, 무조건 가운데 있기 때문)
        //tie section template 
        // tieDSW = Number(portBarW /2);
        tieDSW = 30;

        // console.log('tieDSW width = ('+ i +')' + tieDSW);

        var dsName1 = 'tieBar-DS-' + j + '-' + (i - 1) + '-0'; //단순 인덱싱 위해서 (i-1)수행
        var cbName1 = 'tieBar-CB-' + j + '-' + (i - 1) + '-0';
        var dsName2 = 'tieBar-DS-' + j + '-' + (i - 1) + '-1';
        var hBar1 = "hBar-" + j + "-" + (i - 1);
        var hBar2 = "hBar-" + (j) + "-" + (i);
        // var pBar1 = "portBar-" + j + "-" + (i - 1) + "-" + (cnt - 1);
        var pBar2 = "portBar-" + j + "-" + (cnt+1) + "-0";
        var x, y;
        // var pBarCenterPos = node.findObject(pBar1).getDocumentPoint(go.Spot.None)
        //the DS located on tieBar 
        // barX -= parseInt(space / 2); //왼쪽 bar의 마지막 portBarX 위치 + tieBar 공간
        barX -= parseInt(space/4); //왼쪽 bar의 마지막 portBarX 위치 + tieBar 공간
        

        linkedJson.push({  from: portBarList[portBarList.length - 1].key,  to: dsName1  }); 


        //the DS located on tieBar
        json = {
          category: "circleTemplate", key: dsName1, color: "green",
          w: portBarSize, h: portBarSize, loc: { barX, barY }
        }; 
        barJson.push(json);
        barX += tieDSW;


        //the CB located on tieBar
        json = {
          category: "rectTemplate", key: cbName1,  color: "red",
          w: portBarSize, h: portBarSize,
          loc: { barX, barY }
        }; //DS 
        
        barJson.push(json);
        linkedJson.push({ from: dsName1, to: cbName1 });
        barX += tieDSW;


        //the DS located on tieBar
        json = { category: "circleTemplate", key: dsName2, color: "yellow", 
          w: portBarSize, h: portBarSize,
          loc: {  barX, barY }
        };
        // portXList.push(barX);
        
        linkedJson.push({
          from: cbName1,
          to: dsName2
        });
        barJson.push(json);
        lastSingleBarX = barX + tieDSW;
        // barX += tieDSW;
        barX += parseInt(space / 2); //tieBar 공간 + 오른쪽 bar의 마지막 portBarX 위치

        linkedJson.push({
          from: dsName2,
          to: pBar2
        });
        cnt++;
      }
    }

    cnt = 0;
    barY = bar2Y;
    barX = 50;
    
  }

  return {
    barJson: barJson,
    linkedJson,
    linkedJson,
    lastSingleBarX: lastSingleBarX,
    portXList: portXList
  };
}


function _drawHVarNode2(singleBarW, rccGroup, barX, barY, bar2Y){

  // ---
  //   |   부분 그리기
  //   |   이 영역을 temp라 칭함
  //   |
  // ---

  var tempWidthLength = 100;
  var tempHeighLength = 30;
  var tempPath = [];

  //윗줄 ---
  tempPath.push({x : barX, y : barY});
  tempPath.push({x : barX + tempWidthLength, y : barY});  

  rccSvg.append('path')
    .attr('d', lineFunction(tempPath))
    .attr('stroke', '#7F9FFF')
    .attr('stroke-width', 5);

  //아랫줄 ----
  tempPath = [];
  tempPath.push({x : barX, y : bar2Y});
  tempPath.push({x : barX + tempWidthLength, y : bar2Y});  

  rccSvg.append('path')
    .attr('d', lineFunction(tempPath))
    .attr('stroke', '#7F9FFF')
    .attr('stroke-width', 5);
  
  // 중간 줄1 | 
  tempPath = [];
  tempPath.push({x : barX + tempWidthLength, y : barY});
  tempPath.push({x : barX + tempWidthLength + (tempHeighLength * 1), y : barY});   
  rccSvg.append('path')
    .attr('d', lineFunction(tempPath))
    .attr('stroke', '#7F9FFF')
    .attr('stroke-width', 5);

  // 중간 줄2 | 
  tempPath = [];
  tempPath.push({x : barX + tempWidthLength, y : barY});
  tempPath.push({x : barX + tempWidthLength + (tempHeighLength * 2), y : barY});   
  rccSvg.append('path')
    .attr('d', lineFunction(tempPath))
    .attr('stroke', '#7F9FFF')
    .attr('stroke-width', 5);

  // 중간 줄3 | 
  tempPath = [];
  tempPath.push({x : barX + tempWidthLength, y : barY});
  tempPath.push({x : barX + tempWidthLength + (tempHeighLength * 3), y : barY});   
  rccSvg.append('path')
    .attr('d', lineFunction(tempPath))
    .attr('stroke', '#7F9FFF')
    .attr('stroke-width', 5);
}

//수직바 그리기1
function _drawVBarNode(singleBarW, rccGroup, bar1Y, bar2Y, lastSingleBarX, portXList) 
{
  var vBarH = parseInt(bar2Y - bar1Y);
  var vBarBwtH = parseInt(vBarH / 4);
  var json = [];
  let vBarCnt;
  // var vBarCnt = 3;
  var barJson = [],
    linkedJson = [];
  var link = [];
  var tempY = bar1Y;
  var loc;
  var subTopList = [];
  var hBarBwtW = Math.abs(portXList[0] - portXList[1]);
  var extPath = [];

  var barIdx = 0;
  var portIdx = (1);
  var subNode = [];
  var topNode = [];
  var topIdx = 0;
  var subIdx = 0;
  var extName;
  var isTempBar = true;
  for (var i = 0; i < rccGroup.length; i++,portIdx++) 
  {
    subTopList = [];
    subNode = [];
    topNode = [];
    rccGroup[i].subNode.forEach(function (node) {
      subTopList.push(node);
      subNode.push(node);
    })
    rccGroup[i].topNode.forEach(function (node) {
      subTopList.push(node);
      topNode.push(node);
    })
    barIdx = 1;
    if (i == 0 ) 
    // if(isTempBar == true)
    {
      //2쌍 그룹의 첫번째 수직 Bar
      loc = {
        barX: portXList[portIdx],
        barY: bar1Y
      };
      tempY += vBarBwtH;

      //vBarDS-RowIdx-vBarCnt-PortIdx
      loc = {
        barX: portXList[portIdx],
        barY: tempY
      };
      var dsName1 = 'vBarDS-0-' + i + '-' + barIdx;
      json = { category: "circleTemplate",  key: dsName1,  width: 5,   loc: loc , color : 'red' }; 
      tempY += vBarBwtH;
      linkedJson.push({ from: 'portBar-0-' + i + '-' + (barIdx),  to: dsName1 });
      barJson.push(json);

      loc = { barX: portXList[portIdx], barY: tempY };
      var cbName1 = 'vBarCB-' + i + '-' + barIdx;
      json = { category: "rectTemplate", key: cbName1, width: 5, loc: loc, color:'red' } 
      tempY += vBarBwtH;
      linkedJson.push({  from: dsName1, to: cbName1 });
      barJson.push(json);
 
      var dsName2 = 'vBarDS-1-' + i + '-' + barIdx;
      
      loc = { barX: portXList[portIdx],  barY: tempY };
      json = { category: "circleTemplate", key: dsName2,  width: 5,  loc: loc , color:'red'} 
      tempY = bar1Y;

      linkedJson.push({  from: cbName1,  to: dsName2 });
      barJson.push(json);

      loc = { barX: portXList[portIdx], barY: bar2Y };
      linkedJson.push({  from: dsName2,  to: 'portBar-1-' + i + '-' + (barIdx)  });
     // barIdx++;
      // portIdx++;
      isTempBar = false;
    }
    else if (i != 0 && i %2 == 0) 
    // if(isTempBar == true)
    {
      barIdx--;
      portIdx--;
      //2쌍 그룹의 첫번째 수직 Bar
      loc = {
        barX: portXList[portIdx],
        barY: bar1Y
      };
      tempY += vBarBwtH;

      //vBarDS-RowIdx-vBarCnt-PortIdx
      loc = {
        barX: portXList[portIdx],
        barY: tempY
      };
      var dsName1 = 'vBarDS-0-' + i + '-' + barIdx;
      json = { category: "circleTemplate",  key: dsName1,  width: 5,   loc: loc, color:'red'  }; 
      tempY += vBarBwtH;
      linkedJson.push({ from: 'portBar-0-' + i + '-' + (barIdx),  to: dsName1 });
      barJson.push(json);

      loc = { barX: portXList[portIdx], barY: tempY };
      var cbName1 = 'vBarCB-' + i + '-' + barIdx;
      json = { category: "rectTemplate", key: cbName1, width: 5, loc: loc ,color:'transparent'},  
      tempY += vBarBwtH;
      linkedJson.push({  from: dsName1, to: cbName1 });
      barJson.push(json);
 
      var dsName2 = 'vBarDS-1-' + i + '-' + barIdx;
      
      loc = { barX: portXList[portIdx],  barY: tempY };
      json = { category: "circleTemplate", key: dsName2,  width: 5,  loc: loc , color:'red'} 
      tempY = bar1Y;

      linkedJson.push({  from: cbName1,  to: dsName2 });
      barJson.push(json);

      loc = { barX: portXList[portIdx], barY: bar2Y };
      linkedJson.push({  from: dsName2,  to: 'portBar-1-' + i + '-' + (barIdx)  });
     // barIdx++;
    //   portIdx++;
      isTempBar = false;
    }

    if (i % 2 != 0) {
      barIdx--;
      portIdx--;
    }else{
      barIdx++;
      portIdx++;
    }
    // portIdx=0;
    // for(var tt = 0; tt < i; tt++){
    //   portIdx += rccGroup[tt].subNode.length;
    //   portIdx += rccGroup[tt].topNode.length;
    // }

    topIdx = 0;
    subIdx = 0;
    
    for (var subTopIdx = 0; subTopIdx < subTopList.length; subTopIdx++, portIdx++, barIdx++) 
    {
      loc = { barX: portXList[portIdx], barY: bar1Y };
      tempY += vBarBwtH;

      //vBarDS-RowIdx-vBarCnt-PortIdx
      var dsName1 = 'vBarDS-0-' + i + '-' + barIdx;
      loc = { barX: portXList[portIdx], barY: tempY };
      json = { category: "circleTemplate", key: dsName1, width: 5, loc: loc , color:'transparent'} 
      linkedJson.push({ from: 'portBar-0-' + i + '-' + barIdx, to: dsName1 });
      barJson.push(json);
      tempY += vBarBwtH;

      var cbName1 = 'vBarCB-' + i + '-' + barIdx;
      loc = { barX: portXList[portIdx], barY: tempY };
      json = { category: "rectTemplate", key: cbName1, width: 5, loc: loc, color:'transparent' } 
      linkedJson.push({ from: dsName1,  to: cbName1 });
      barJson.push(json);
      tempY += vBarBwtH;
       
      if (subTopList[subTopIdx].type.toLocaleLowerCase().indexOf('rcc')!= -1) 
      {
        extName = 'extNode-0-' +i+'-'+ (topIdx++); 
        var extConnName = extName +'-conn';
        //연결용 노드
        loc = { barX: (portXList[portIdx] + (hBarBwtW / 2.5)), barY: (tempY-vBarBwtH)};
        json = { category: "rectTemplate",  key: extConnName, width: 5, 
                  loc: loc, color:'transparent' }
        barJson.push(json);
        linkedJson.push({from : cbName1, to : extConnName}) 
        //마지막 노드 
        loc = { barX: (portXList[portIdx] + (hBarBwtW / 2.5)), barY: (tempY - vBarBwtH * 4)};
        json = { category: "rectTemplate",  key: extName, width: 5,  loc: loc, 
                color:'yellow', name : subTopList[subTopIdx].name }
        barJson.push(json);
        linkedJson.push({ from : extConnName, to : extName})    
      } 
      else 
      {       
        extName = 'extNode-1-'+i+'-'+ (subIdx++); 
        var extConnName = extName+'-conn';
         //연결용 노드
        loc = { barX: (portXList[portIdx] - (hBarBwtW / 2.5)),  barY: (tempY -vBarBwtH) };
        json = {  category: "rectTemplate", key: extConnName,  width: 5, loc: loc , color:'transparent'}
        barJson.push(json);
        linkedJson.push({ from : cbName1, to : extConnName})  
        //마지막 노드         
        loc = { barX: (portXList[portIdx] - (hBarBwtW / 2.5)),  barY: (tempY + vBarBwtH * 2) };
        json = {  category: "rectTemplate", key: extName,  width: 5, loc: loc ,color:'red'
                  , name : subTopList[subTopIdx].name }
        //   extPath.push(loc);
        barJson.push(json);
        linkedJson.push({ from : extConnName, to : extName})    
      } 

      var dsName2 = 'vBarDS-1-' + i + '-' + barIdx;
      loc = { barX: portXList[portIdx],  barY: tempY };
      json = { category: "circleTemplate", key: dsName2, width: 5, loc: loc  ,color:'transparent' } 
      tempY = bar1Y;
      linkedJson.push({ from: cbName1, to: dsName2 });

      barJson.push(json);

      loc = { barX: portXList[portIdx],  barY: bar2Y};
      linkedJson.push({  from: dsName2,  to: 'portBar-1-' + i + '-' + barIdx  });
    }
    isTempBar = true;
    // portIdx++;
  }

  return {
    barJson: barJson,
    linkedJson: linkedJson,
    extPath: extPath
  };
}





let fromNodeMap = new HashMap();
let toNodeMap = new HashMap();

function searchingRcc(barJson, linkedJson, from, dest)
{

  // var nodeMap = new HashMap();
  fromNodeMap.clear();
  toNodeMap.clear();

  for(var i=0; i< linkedJson.length; i++)
  {
      var link = linkedJson[i];
       
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
  // linkedNode = [];
  linkedLine = [];
  routeWay = [];
  _routing(barJson, from, dest);
  var linkPath = [];
  var fromName;
  var toName;
  let aniPath = [];

  // d3.select("g#aniLineGroup").remove();
  rccSvg.selectAll("g#rccAnimation").remove();  
  
  var aniLineGroup = rccSvg.append('g').attr('id','aniLineGroup'); 
  
  // aniLineGroup.append('marker')
  //   .attr('id', 'triangle')
  //   .attr('refX', 0)
  //   .attr('refY', 5)
  //   .attr('markerUnits','strokeWidth')
  //   .attr('markerWidth','10')
  //   .attr('markerHeight','15')
  //   .attr('orient', 'auto')
  //   .append('path')
  //   .attr('d', 'M 0 0 L 10 5 L 0 10 z')

  

  for(var i=0; i<linkedLine.length-1; i++)
  {
    linkPath = [];       
    fromName = linkedLine[i];
    toName = linkedLine[i+1];
    rt = _fromToXY(barJson, fromName, toName);
    fromX = rt.fromXY.x;
    fromY = rt.fromXY.y;
    toX = rt.toXY.x;
    toY = rt.toXY.y;
    linkPath.push({x : fromX, y : fromY})
    linkPath.push({x : toX, y : toY})

    
    
    // aniPath.push({x : fromX, y : fromY});

    aniLineGroup.append("path").attr('id','aniPath')
      .attr("d", lineFunction(linkPath))
       .attr("stroke", 'black')
      // .attr("stroke-width", 4)
      .attr("fill", "red")
      .attr('class','line')
      // .attr('marker-end','url(#triangle)')
      // .attr('marker-mid','url(#triangle)')
      // .attr('stroke-dasharray',5)
    
      
      if(i == 0)      
      { 
        aniPath.push({x : fromX, y : fromY});
      }
      else
      {
        // aniPath.push({x : toX, y : toY});
      }

      if(i+2 < linkedLine.length)
      {
        var nextName = linkedLine[i+2];
        rt = _fromToXY(barJson, nextName, null);
        var nextX = rt.fromXY.x;
        var nextY = rt.fromXY.y;
        if(fromX != nextX && fromY != nextY)
        {
          aniPath.push({x : toX, y : toY})
        }
      }else
      {
        aniPath.push({x : toX, y : toY})
      }
  }
  rccSvg.append('g').attr('id','rccAnimation');
  var _angle;
  var _fontSize = 15;
  var _start, _end;
  var _x, _y;
  // for(var _i =0; _i < aniPath.length; _i++)
  { 
    
    _start = aniPath[0];
    _end = aniPath[1];
    _angle = _getAngle(_start.x, _start.y, _end.x, _end.y);
    rccSvg.select('g#rccAnimation')    
    .attr('x', _start.x).attr('y', _start.y)
    .attr("class", "line-arrow")      
    .append('text')
    .text('◀') 
    // .attr('id','text-'+ _i)
    .attr('transform', 'translate('+(_start.x + 80 - (_fontSize/2))+ ' ' + (_start.y + (0))+') rotate(' + _angle + ')')
    // .attr('fill','yellow')
    .attr("text-anchor", "middle")
    .attr("font-size", _fontSize+"px");

    _start = aniPath[aniPath.length - 1];    
    rccSvg.select('g#rccAnimation')    
    .attr('x', _start.x).attr('y', _start.y)
    .attr("class", "line-arrow")      
    .append('text')
    .text('◀') 
    // .attr('id','text-'+ _i)
    .attr('transform', 'translate('+(_start.x + 80 - (_fontSize/2))+ ' ' + (_start.y + (0))+') rotate(-90)')
    // .attr('fill','yellow')
    .attr("text-anchor", "middle")
    .attr("font-size", _fontSize+"px");
   } 
 
}
 
 

function _getAngle( x1, y1, x2, y2 ) {
	
	var	dx = x1 - x2,
		dy = y1 - y2;
  var _rt = Math.atan2(dy, dx);
  _rt = _rt * 180 / Math.PI;
	return _rt;
};
let interSec = 2000;
var basicLength =0;
let aniX, aniY;
let fromX,fromY,toX,toY
let myDist = 0;
let mySeg = 0;
let aniIdx = 0;
let routeWay=[];

function pytha(x1, y1, x2, y2) {
  var width = Math.abs(x1 - x2),
      height = Math.abs(y1 - y2);
  lineLength = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  return lineLength;
}

function _routing(barJson,  from ,to){
  var node;
  var isOpen = true;
    for(var i=0; i< checkedNode.length; i++){
        if(checkedNode[i] == from)
        {  
            return ;
        }
    } 
    checkedNode.push(from);

    if(from == to){
      // routeWay.pop();
       
      routeWay.push(to);
      linkedLine = routeWay.slice();
      return true;
    }  
    //openClose 체크
    //true == 더이상 탐색할 필요 없음.(open 된 상태이기 때문에)
    isOpen = checkStatus(barJson, from);
    if(isOpen == true){
      return false;
    }
   
    routeWay.push(from);     

    //to 에 있는지 조회
    node = toNodeMap.get(from);
   
    if(from == 'portBar-1-0-2' ){
      console.log('');
    }
    if(node != undefined && node instanceof Array){
        //to이랑 연결된 것들 조회
        for(var i=0; i < node.length; i++){
          _routing(barJson, node[i], to)  ;
          
        }
    }else if(node != undefined){
        //to랑 연결된것 조회
        _routing(barJson, node, to)
        
    }else if(node ==undefined){
     
      node = fromNodeMap.get(from);
      if(node == undefined)
      {  
        routeWay.pop();
        return ;
      }
    }
     
    //from 이 있는지 조회
    node = fromNodeMap.get(from);
    
    if(from == 'portBar-1-0-2' ){
      console.log('');
    }
    if(node != undefined && node instanceof Array){
        //from이랑 연결된 것들 조회
        for(var i=0; i < node.length; i++){
            _routing(barJson, node[i], to)
        }
    }else if(node != undefined){
        //from이랑 연결된것 조회
        _routing(barJson, node, to) 
        
    }else if(node ==undefined){
      routeWay.pop();     
      return; 
    }
    routeWay.pop();
}

//현재노드의 Open Close 를 체크 하는 함수
//open = true, close = false
function checkStatus(barJson, key){
    
  for(var i =0; i<barJson.length; i++){
      if(key == barJson[i].key){
          return barJson[i].isOpen;
      }
  }
  console.log(key +' is none');
}


function showMessage(x, y) {
  document.getElementById("diagramEventsMsg").textContent = 'x : ' + x + ', y : ' + y;
}


function setStatus(barJson){
   barJson.forEach(function(d){
     d.isOpen = false;
   })
  barJson.forEach(function(d){
    if (d.key.includes("port") == true) {
      d.isOpen = false;
    } else if (d.key.includes("ext") == true) {
      d.isOpen = false;
    } else if (d.key.includes('vBarCB') == true) {
      d.isOpen = false;      
    }else if(d.key.indexOf('tieBar') >=0){
        d.isOpen = false;
    }else if (d.key == 'tieBar-DS-0-0-0') { //////////tieBar group 0
      d.isOpen = false;
    } else if (d.key == 'tieBar-CB-0-0-0') {
      d.isOpen = false;
    } else if (d.key == 'tieBar-DS-0-0-1') {
      d.isOpen = false;
    } else if (d.key == 'tieBar-DS-1-0-0') { //////////tieBar group 1
      d.isOpen = false;
    } else if (d.key == 'tieBar-CB-1-0-0') {
      d.isOpen = false;
    } else if (d.key == 'tieBar-DS-1-0-1') {
      d.isOpen = false;
    }else if (d.key.includes('vBarCB') == true) {
      d.isOpen = false;
    } else if (d.key == 'vBarDS-0-0-0') { /////////Vertical Group 0-0
      d.isOpen = false;
    } else if (d.key == 'vBarDS-1-1-0') {
      d.isOpen = false;
    } else if (d.key == 'vBarDS-0-0-1') { ////////////Vertical Group 0-1
      d.isOpen = false;
    } else if (d.key == 'vBarDS-1-1-1') {
      d.isOpen = true;
    } else if (d.key == 'vBarDS-0-0-2') { /////////Vertical Group 0-0
      d.isOpen = true;
    } else if (d.key == 'vBarDS-1-1-2') {
      d.isOpen = false;
    } else if (d.key == 'vBarDS-0-0-3') { /////////Vertical Group 0-0
      d.isOpen = false;
    } else if (d.key == 'vBarDS-0-1-3') { /////////Vertical Group 0-0
      d.isOpen = false;
    } else if (d.key == 'vBarDS-1-1-3') {
      d.isOpen = true;
    } else if (d.key == 'vBarDS-0-0-4') { /////////Vertical Group 0-0
      d.isOpen = true;
    } else if (d.key == 'vBarDS-1-1-4') {
      d.isOpen = false;
    } else if (d.key == 'vBarDS-0-0-5') { /////////Vertical Group 0-0
      d.isOpen = false;
    } else if (d.key == 'vBarDS-1-1-5') {
      d.isOpen = true;
    } else if (d.key == 'vBarDS-0-0-2') { ////////////Vertical Group 3
      d.isOpen = false;
    } else if (d.key == 'vBarDS-1-1-2') {
      d.isOpen = false;
    } else if (d.key == 'vBarDS-1-0-0') { /////////Vertical Group 1-0
      d.isOpen = true;
    } else if (d.key == 'vBarDS-2-1-0') {
      d.isOpen = false;
    } else if (d.key == 'vBarDS-1-0-1') { /////////Vertical Group 1-0
      d.isOpen = false;
    } else if (d.key == 'vBarDS-2-1-1') {
      d.isOpen = true;
    } else if (d.key == 'vBarDS-2-0-0') { /////////Vertical Group 1-0
      d.isOpen = true;
    } else if (d.key == 'vBarDS-2-1-0') {
      d.isOpen = false;
    } else if (d.key == 'vBarDS-1-0-2') { /////////Vertical Group 1-0
      d.isOpen = false;
    } else if (d.key == 'vBarDS-2-1-2') {
      d.isOpen = false;
    } else if (d.key == 'vBarDS-1-0-3') { /////////Vertical Group 1-0
      d.isOpen = true;
    } else if (d.key == 'vBarDS-1-0-4') { /////////Vertical Group 1-0
      d.isOpen = false;
    } else if (d.key == 'vBarDS-0-1-1') { /////////Vertical Group 1-0
      d.isOpen = false;
    }  else if (d.key == 'vBarDS-2-1-3') {
      d.isOpen = true;
    } else if(d.key =='vBarDS-0-2-0' || d.key == 'vBarDS-1-2-1' || d.key == 'vBarDS-0-2-2' || d.key == 'vBarDS-1-2-3'|| d.key == 'vBarDS-0-2-4') {
      d.isOpen = false;
    } else if(d.key == 'vBarDS-1-3-0' || d.key == 'vBarDS-1-3-1' || d.key == 'vBarDS-0-3-2'){
      d.isOpen = false;
    }else if(d.key == 'vBarDS-0-4-0' || d.key =='vBarDS-1-4-1' || d.key =='vBarDS-0-4-2' || d.key =='vBarDS-1-4-2' || d.key == 'vBarDS-0-4-3' || d.key == 'vBarDS-1-4-4')
    {
      d.isOpen = false;
    }
    else{
      d.isOpen = true;
    }
  })
  return barJson;
}

function _fromToXY(barJson, from, to){
  var fromXY;
  var toXY;
  // if(from =='tieBar-DS-0-2-1'){
  //   console.log('');
  // }
  for (var i = 0; i < barJson.length; i++) {
    if (from == barJson[i].key) {
      fromXY = { x: barJson[i].loc.barX, y: barJson[i].loc.barY };
      break;
    }
  }
  for (var i = 0; i < barJson.length; i++) {
    if (to == barJson[i].key) {        
      toXY = { x: barJson[i].loc.barX, y: barJson[i].loc.barY };
      break;
    }
  }
  return {fromXY : fromXY, toXY : toXY};
}

function drawRccRect(x1, y1, width, height, color,key) {

  var _rect = rccSvg.append('rect').attr('x', x1+80 -(width/2)).attr('y', y1-(width/2)).attr("width", width+5)
    .attr("height", height+5).attr('stroke', color).attr('fill', color).attr("data-key", key)
    .on("contextmenu", function(data, index) {

      $('#rccContext-rccMenu-subMenu')
        .append('<a id="rcc-a-control">제어하기</a>')
        .on('click', function(){
          location.href = "areaControl?id="+key
        });

      $('#clicked-Rcc-Id').text('ESS.'+key);
              
      rccContextMenu(this, 'rect',  key);
      d3.event.preventDefault();   })
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);
    return _rect;
}
 
function _drawUpText(_rect, value, key) {

  var _fontSize = 15;
  var _valFontSize = 10;
  var _margin = 15;
  var _x = Number(_rect.attr("x"));
  var _y = Number(_rect.attr("y")) - 10;

  rccSvg.append('text')
  .attr("fill", "#FFF")
  .attr('id','id-'+key)
  .text(value) 
  .attr("transform", "translate(" + _x + " " + _y + ")")
  .attr("text-anchor", "middle")
  .attr("font-size", "15px");

  var _g = rccSvg.append('g')
  .attr("fill", "#FFF");

  _g.append('text')
  .text('-78.1 MW')
  .attr('id','MW-'+ key)  
  .attr("transform", "translate(" + (_x - _margin) + " " + (_y - _valFontSize * 1.5 )+ ")")
  .attr("text-anchor", "right")
  
  .attr("font-size", _valFontSize + "px");
  _g.append('text')
  .text('14.7 MVAR')
  .attr('id','MVAR-'+ key)
  .attr("transform",  "translate(" + (_x - _margin) + " " + (_y - _valFontSize * 2.5 ) + ")")
  .attr("text-anchor", "right")
  
  .attr("font-size", _valFontSize + "px");
  _g.append('text')
  .text('280.2 A')
  .attr('id','A-'+ key)
  .attr("transform",  "translate(" + (_x - _margin) + " " +( _y - _valFontSize * 3.5 )+ ")")
  .attr("text-anchor", "right")
  .attr("font-size", _valFontSize + "px");
}
function _drawDnText(_rect, value, key) {

  var _fontSize = 15;
  var _valFontSize = 10;
  var _margin = 15;
  var _x = Number(_rect.attr("x"));
  var _y = Number(_rect.attr("y")) + 60;

  rccSvg.append('text')
  .attr("fill", "#FFF")
  .attr('id','id-'+key)
  .text(value) 
  .attr("transform", "translate(" + _x + " " + _y + ")")
  .attr("text-anchor", "middle")
  .attr("font-size", "15px");

  var _g = rccSvg.append('g')
  .attr("fill", "#FFF");

  _g.append('text')
  .text('-78.1 MW')
  .attr('id','MW-'+ key)  
  .attr("transform", "translate(" + (_x - _margin) + " " + (_y - _valFontSize * 1.5 )+ ")")
  .attr("text-anchor", "right")
  
  .attr("font-size", _valFontSize + "px");
  _g.append('text')
  .text('14.7 MVAR')
  .attr('id','MVAR-'+ key)
  .attr("transform",  "translate(" + (_x - _margin) + " " + (_y - _valFontSize * 2.5 ) + ")")
  .attr("text-anchor", "right")
  
  .attr("font-size", _valFontSize + "px");
  _g.append('text')
  .text('280.2 A')
  .attr('id','A-'+ key)
  .attr("transform",  "translate(" + (_x - _margin) + " " +( _y - _valFontSize * 3.5 )+ ")")
  .attr("text-anchor", "right")
  .attr("font-size", _valFontSize + "px");
}


let rccContext = null;

function drawRccCircle(x1, y1, width, height, color,key) {
  rccSvg.append('circle').attr('cx', x1+80).attr('cy', y1).attr("r", width)
    .attr('stroke', color).attr('fill', color).attr("data-key", key)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);
}

var rccContextMenu = function(that, newContext, key) {
  console.log('clicked node id(key) : '+ key)
  if(key != undefined){
    if (rccContext) {
      if (rccContext !== newContext) {
        console.log('rccContextmenu: cannot execute for rccContext: ' + newContext + ' while in current rccContext: ' + rccContext);
        return;
      }
    }
    rccContext = newContext;
    console.log('contextmenu:' + rccContext);
    d3.event.preventDefault();
  
    var position = d3.mouse(that);
    d3.select('#rccContext-rccMenu')
            .style('position', 'absolute')
            .style('left', position[0] + "px")
            .style('top', (position[1]+115) + "px")
            .style('display', 'inline-block')
            .on('mouseleave', function() {
              //  d3.select('#rccContext-rccMenu').style('display', 'none');
              rccContext = null; 
            }
              );
    d3.select('#rccContext-rccMenu').attr('class', 'rccMenu ' + rccContext);
  }
  
}