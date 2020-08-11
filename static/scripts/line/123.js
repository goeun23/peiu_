let lineColor = "black";
let fromList = [];
let toList = [];
let rccSvg;

let lineFunction = d3
  .line()
  .x(function(d) {
    return d.x + 80;
  })
  .y(function(d) {
    return d.y;
  });

function drawRcc(rccData, diagramDivName) {
  var w = document.getElementById(diagramDivName).style.width,
    h = document.getElementById(diagramDivName).style.height,
    margin = {
      top: 20,
      right: 10,
      bottom: 20,
      left: 10
    },
    radius = 5;

  var dWidth = document.getElementById(diagramDivName).clientWidth - 00; // the width of diagram
  var dHeight = document.getElementById(diagramDivName).clientHeight; // the height of diagram
  var barWidth = parseInt(dWidth * 0.9);
  var barHeight = 4;
  var bar1Y = (dHeight / 3).toFixed(0) * 1;
  var bar2Y = (dHeight / 3).toFixed(0) * 2;
  var singleBarW = parseInt(barWidth * 0.2);
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
  var barX = 0,
    barY = bar1Y;
  barX = parseInt(barX);

  rccSvg = d3
    .select("#" + diagramDivName)
    .append("svg")
    .attr("width", dWidth)
    .attr("height", dHeight);

  var obj = drawHVarNode(barWidth, rccGroup, barX, barY, bar2Y);
  let lastSingleBarX = obj.lastSingleBarX;
  var barObj;
  var topLinePath = [];
  var bottomLinePath = [];
  var hBarJson = obj.barJson;
  var hLinkedJson = obj.linkedJson;
  var portXList = obj.portXList;
  var extLineJson;

  ////////////////////수직 데이터 세팅//////////////////////////////
  obj = drawVBarNode(
    singleBarW,
    rccGroup,
    bar1Y,
    bar2Y,
    lastSingleBarX,
    portXList
  );
  var vLinkedJson = obj.linkedJson;
  var vBarJson = obj.barJson;
  extLineJson = obj.extPath;

  hBarJson.forEach(function(json) {
    barJson.push(json);
  });
  vBarJson.forEach(function(json) {
    barJson.push(json);
  });

  /////////////////// 수평CB, DS 데이터 세팅//////////
  barJson = setStatus(barJson);
  ///////////////////////////////////////////

  hLinkedJson.forEach(function(json) {
    linkedJson.push(json);
  });
  vLinkedJson.forEach(function(json) {
    linkedJson.push(json);
  });

  var json;
  var rt;
  var drawXY;
  var linkPath = [];

  for (var i = 0; i < linkedJson.length; i++) {
    json = linkedJson[i];
    rt = fromToXY(barJson, json.from, json.to);
    console.log(json.from + "->" + json.to);
    linkPath.push({ x: rt.fromXY.x, y: rt.fromXY.y });
    linkPath.push({ x: rt.toXY.x, y: rt.toXY.y });
    rccSvg
      .append("path")
      .attr("d", lineFunction(linkPath))
      .attr("stroke", lineColor)
      .attr("stroke-width", 4)
      .attr("fill", "none");
    linkPath = [];
  }

  /////////////////////수평 CB, DS 그리기/////////////////////
  for (var i = 0; i < hBarJson.length; i++) {
    barObj = hBarJson[i];
    if (barObj.category == "circleTemplate") {
      drawRccCircle(
        barObj.loc.barX,
        barObj.loc.barY,
        5,
        5,
        getStatusColor(barObj.isOpen),
        barObj.key
      );
    } else {
      if (barObj.key.includes("port"))
        drawRccRect(
          barObj.loc.barX,
          barObj.loc.barY,
          10,
          10,
          "black",
          barObj.key
        );
      else
        drawRccRect(
          barObj.loc.barX,
          barObj.loc.barY,
          10,
          10,
          getStatusColor(barObj.isOpen),
          barObj.key
        );
    }
  }

  //////////////////////////////////수직 선 그리기////////////////////////////
  for (var i = 0; i < vBarJson.length; i++) {
    barObj = vBarJson[i];
    if (barObj.category == "circleTemplate") {
      drawRccCircle(
        barObj.loc.barX,
        barObj.loc.barY,
        4,
        4,
        getStatusColor(barObj.isOpen),
        barObj.key
      );
    } else {
      drawRccRect(
        barObj.loc.barX,
        barObj.loc.barY,
        4,
        4,
        getStatusColor(barObj.isOpen),
        barObj.key
      );
    }
  }

  //////////////////////////////routing
  // linkedJson = [];
  // hLinkedJson.forEach(function (json) {
  //   linkedJson.push(json);
  // })
  // vLinkedJson.forEach(function (json) {
  //   linkedJson.push(json);
  // })
  searching(barJson, linkedJson, "extNode-0-1-0", "extNode-1-0-0");
  //routing111(myDlg, 'extNode-', dest);
}

//수평바 그리기
function drawHVarNode(singleBarW, rccGroup, barX, barY, bar2Y) {
  let lastSingleBarX;
  var barJson = [];
  var linkedJson = [];
  var json;

  var portXList = []; //portX 만 가지고 있는 리스트, drawVbar에서 그릴때 사용

  //전체 bar 길이 / rcc그룹 개수 + 각 bar에서 나눠야 하는 그룹 개수
  // var singleBarW = parseInt((barWidth / (rccGroupCnt)));
  let rccGroupCnt =
    rccGroup.length % 2 == 0 ? rccGroup.length + 1 : rccGroup.length + 2;

  //drawing first, second Bar
  var splitedBarCnt; // = barCnt + 2;
  var portBarW; // = parseInt(singleBarW/splitedBarCnt);
  var portBarSize = 10;
  var barName;
  var cnt = 0;
  var rccIdx = 0;
  let space = 0;
  barX = parseInt(barX);
  //bar-rowIdx-colIdx
  //j = 0 -> 위 Bar, j = 1 -> 아래 Bar
  for (var j = 0; j < 2; j++) {
    //각 그룹별 barCnt개수 별로 나누기
    //i 는 하나에서 나워진 Bar
    rccIdx = 0;
    for (var i = 0; i < rccGroupCnt; i++, cnt++) {
      //일반 Bar 인 경우(짝수 인 경우, 맨 앞, 맨 뒤 버스 혹은 중간, bus - tie - bus)
      if (i % 2 == 0) {
        if (i == 0) {
          splitedBarCnt = Number(
            rccGroup[rccIdx].subNode.length +
              rccGroup[rccIdx].topNode.length +
              1 +
              1
          ); // 시작Node - 수직TieBar - subNode list.. - topNode list...
        } else {
          splitedBarCnt = Number(
            rccGroup[rccIdx].subNode.length +
              rccGroup[rccIdx].topNode.length +
              1
          ); // sunNode list ... - topNode list ....
        }
        rccIdx++;
        portBarW = Number(singleBarW / splitedBarCnt);
        portBarW = portBarW / 2;
        barName = "hBar-" + j + "-" + parseInt(cnt);

        var portBarName;
        var portBarList = [];
        for (var portId = 0; portId < splitedBarCnt; portId++) {
          var ports = [];
          portBarName = "portBar-" + j + "-" + cnt + "-" + portId;
          ports.push({
            type: "rectPort",
            portId: "port",
            color: getRandomColor(),
            w: 1,
            h: 1
          });

          //draw HBar & portBar & singleBar Node
          var json = {
            category: "rectTemplate",
            key: portBarName,
            color: "black",
            w: portBarSize,
            h: portBarSize,
            loc: { barX, barY },
            isOpen: false
          };

          portXList.push(barX);
          portBarList.push(json);

          json.ports = ports;
          barJson.push(json);
          barX += parseInt(portBarW);
          space = parseInt(portBarW);
        }
        for (var pId = 0; pId < portBarList.length - 1; pId++) {
          linkedJson.push({
            from: portBarList[pId].key,
            to: portBarList[pId + 1].key
          });
        }
        // cnt++;
        // barX += singleBarW ;//singlebar 길이 만큼 x위치 이동
      } else {
        //tie bar 인경우(홀수인 경우, 무조건 가운데 있기 때문)
        //tie section template
        tieDSW = Number(portBarW / 2);
        var dsName1 = "tieBar-DS-" + j + "-" + (i - 1) + "-0"; //단순 인덱싱 위해서 (i-1)수행
        var cbName1 = "tieBar-CB-" + j + "-" + (i - 1) + "-0";
        var dsName2 = "tieBar-DS-" + j + "-" + (i - 1) + "-1";
        var hBar1 = "hBar-" + j + "-" + (i - 1);
        var hBar2 = "hBar-" + j + "-" + i;
        var pBar1 = "portBar-" + j + "-" + (i - 1) + "-" + (cnt - 1);
        var pBar2 = "portBar-" + j + "-" + (cnt + 1) + "-0";
        var x, y;
        // var pBarCenterPos = node.findObject(pBar1).getDocumentPoint(go.Spot.None)
        //the DS located on tieBar
        barX -= parseInt(space / 2); //왼쪽 bar의 마지막 portBarX 위치 + tieBar 공간

        linkedJson.push({
          from: portBarList[portBarList.length - 1].key,
          to: dsName1
        });

        //the DS located on tieBar
        json = {
          category: "rectTemplate",
          key: dsName1,
          color: "green",
          w: portBarSize,
          h: portBarSize,
          loc: { barX, barY }
        };
        barJson.push(json);
        barX += tieDSW;

        //the CB located on tieBar
        json = {
          category: "circleTemplate",
          key: cbName1,
          color: "red",
          w: portBarSize,
          h: portBarSize,
          loc: { barX, barY }
        }; //DS

        barJson.push(json);
        linkedJson.push({ from: dsName1, to: cbName1 });
        barX += tieDSW;

        //the DS located on tieBar
        json = {
          category: "rectTemplate",
          key: dsName2,
          color: "yellow",
          w: portBarSize,
          h: portBarSize,
          loc: { barX, barY }
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
      }
    }
    cnt = 0;
    barY = bar2Y;
    barX = 0;
  }

  return {
    barJson: barJson,
    linkedJson,
    linkedJson,
    lastSingleBarX: lastSingleBarX,
    portXList: portXList
  };
}

//수직바 그리기1
function drawVBarNode(
  singleBarW,
  rccGroup,
  bar1Y,
  bar2Y,
  lastSingleBarX,
  portXList
) {
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

  var portIdx = 1;
  var subNode = [];
  var topNode = [];
  var topIdx = 0;
  var subIdx = 0;
  
  var extName;
  var j =0 ;
  for (var i = 0; i < rccGroup.length; i++) 
  {

    subTopList = [];
    rccGroup[i].subNode.forEach(function(node) {
      subTopList.push(node);
      subNode.push(node);
    });
    rccGroup[i].topNode.forEach(function(node) {
      subTopList.push(node);
      topNode.push(node);
    });
    barIdx = 1;
    if (i % 2 == 0) 
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
      var dsName1 = "vBarDS-0-" + j + "-" + barIdx;
      json = { category: "circleTemplate", key: dsName1, width: 5, loc: loc };
      tempY += vBarBwtH;
      linkedJson.push({ from: "portBar-0-" + j + "-" + barIdx, to: dsName1 });
      barJson.push(json);

      loc = { barX: portXList[portIdx], barY: tempY };
      var cbName1 = "vBarCB-" + j + "-" + barIdx;
      json = { category: "rectTemplate", key: cbName1, width: 5, loc: loc };
      tempY += vBarBwtH;
      linkedJson.push({ from: dsName1, to: cbName1 });
      barJson.push(json);

      var dsName2 = "vBarDS-1-" + j + "-" + barIdx;

      loc = { barX: portXList[portIdx], barY: tempY };
      json = { category: "circleTemplate", key: dsName2, width: 5, loc: loc };
      tempY = bar1Y;

      linkedJson.push({ from: cbName1, to: dsName2 });
      barJson.push(json);

      loc = { barX: portXList[portIdx], barY: bar2Y };
      linkedJson.push({ from: dsName2, to: "portBar-1-" + j + "-" + barIdx });
      barIdx++;
      portIdx++;
      j += 2;
    }

    if (i % 2 != 0) {
      barIdx--;
    }

    topIdx = 0;
    subIdx = 0;
    
     
    for (var subTopIdx = 0; subTopIdx < subTopList.length;  subTopIdx++, portIdx++, barIdx++)
    {
      loc = { barX: portXList[portIdx], barY: bar1Y };
      tempY += vBarBwtH;

      //vBarDS-RowIdx-vBarCnt-PortIdx
      var dsName1 = "vBarDS-0-" + j + "-" + barIdx;
      loc = { barX: portXList[portIdx], barY: tempY };
      json = { category: "circleTemplate", key: dsName1, width: 5, loc: loc };
      linkedJson.push({
        from: "portBar-0-" + j + "-" + barIdx,
        to: dsName1
      });
      barJson.push(json);
      tempY += vBarBwtH;

      var cbName1 = "vBarCB-" + j + "-" + barIdx;
      loc = { barX: portXList[portIdx], barY: tempY };
      json = { category: "rectTemplate", key: cbName1, width: 5, loc: loc };
      linkedJson.push({ from: dsName1, to: cbName1 });
      barJson.push(json);
      tempY += vBarBwtH;

      if (subTopList[subTopIdx].type == "rcc") 
      {
        extName = "extNode-0-" + j + "-" + topIdx++;
        var extConnName = extName + "-conn";
        //연결용 노드
        loc = {
          barX: portXList[portIdx] + hBarBwtW / 2.5,
          barY: tempY - vBarBwtH
        };
        json = {
          category: "rectTemplate",
          key: extConnName,
          width: 5,
          loc: loc
        };
//        barJson.push(json);
//        linkedJson.push({ from: cbName1, to: extConnName });
        //마지막 노드
        loc = {
          barX: portXList[portIdx] + hBarBwtW / 2.5,
          barY: tempY - vBarBwtH * 4
        };
        json = { category: "rectTemplate", key: extName, width: 5, loc: loc };
//        barJson.push(json);
//        linkedJson.push({ from: extConnName, to: extName });
      }
      else
      {
        extName = "extNode-1-" + j + "-" + subIdx++;
        var extConnName = extName + "-conn";
        //연결용 노드
        loc = {
          barX: portXList[portIdx] - hBarBwtW / 2.5,
          barY: tempY - vBarBwtH
        };
        json = {
          category: "rectTemplate",
          key: extConnName,
          width: 5,
          loc: loc
        };
//        barJson.push(json);
//        linkedJson.push({ from: cbName1, to: extConnName });
        //마지막 노드
        loc = {
          barX: portXList[portIdx] - hBarBwtW / 2.5,
          barY: tempY + vBarBwtH * 2
        };
        json = { category: "rectTemplate", key: extName, width: 5, loc: loc };
        //   extPath.push(loc);
//        barJson.push(json);
 //       linkedJson.push({ from: extConnName, to: extName });
      }

      var dsName2 = "vBarDS-1-" + j + "-" + barIdx;
      loc = { barX: portXList[portIdx], barY: tempY };
      json = { category: "circleTemplate", key: dsName2, width: 5, loc: loc };
      tempY = bar1Y;
      linkedJson.push({ from: cbName1, to: dsName2 });

      barJson.push(json);

      loc = { barX: portXList[portIdx], barY: bar2Y };
      linkedJson.push({ from: dsName2, to: "portBar-1-" + j + "-" + barIdx });
    } 
  }

  return {
    barJson: barJson,
    linkedJson: linkedJson,
    extPath: extPath
  };
}

let fromNodeMap = new HashMap();
let toNodeMap = new HashMap();

function searching(barJson, linkedJson, from, dest) {
  // var nodeMap = new HashMap();
  fromNodeMap.clear();
  toNodeMap.clear();

  for (var i = 0; i < linkedJson.length; i++) {
    var link = linkedJson[i];

    if (fromNodeMap.get(link.from) == null) {
      fromNodeMap.set(link.from, link.to);
    } else {
      var tmp = [];
      var f = fromNodeMap.get(link.from);
      if (f instanceof Array) {
        for (var childIdx = 0; childIdx < f.length; childIdx++) {
          tmp.push(f[childIdx]);
        }
        tmp.push(link.to);
      } else {
        tmp.push(f);
        tmp.push(link.to);
      }

      fromNodeMap.set(link.from, tmp);
    }

    if (toNodeMap.get(link.to) == null) {
      toNodeMap.set(link.to, link.from);
    } else {
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
  routing111(barJson, from, dest);
  var linkPath = [];
  var fromName;
  var toName;
  let aniPath = [];
  for (var i = 0; i < linkedLine.length - 1; i++) {
    linkPath = [];
    fromName = linkedLine[i];
    toName = linkedLine[i + 1];
    rt = fromToXY(barJson, fromName, toName);
    fromX = rt.fromXY.x;
    fromY = rt.fromXY.y;
    toX = rt.toXY.x;
    toY = rt.toXY.y;
    linkPath.push({ x: fromX, y: fromY });
    linkPath.push({ x: toX, y: toY });
    // aniPath.push({x : fromX, y : fromY});
    rccSvg
      .append("path")
      .attr("d", lineFunction(linkPath))
      .attr("stroke", "yellow")
      .attr("stroke-width", 4)
      .attr("fill", "red")
      .attr("class", "line");

    if (i == 0) {
      aniPath.push({ x: fromX, y: fromY });
      // aniPath.push({x : toX, y : toY});
    } else {
      // aniPath.push({x : toX, y : toY});
    }

    if (i + 2 < linkedLine.length) {
      var nextName = linkedLine[i + 2];
      rt = fromToXY(barJson, nextName, null);
      var nextX = rt.fromXY.x;
      var nextY = rt.fromXY.y;
      if (fromX != nextX && fromY != nextY) {
        aniPath.push({ x: toX, y: toY });
      }
    } else {
      aniPath.push({ x: toX, y: toY });
    }
  }
  rccSvg
    .append("g")
    .attr("x", aniPath[0].x)
    .attr("y", aniPath[0].y)
    .attr("class", "line-arrow")
    .attr(
      "transform",
      "translate(" + (aniPath[0].x + 80 - 8) + " " + (aniPath[0].y - 8) + ")"
    )
    .append("image")
    .attr("xlink:href", "http://localhost:3333/images/arrow_16.png")
    .attr("width", 32)
    .attr("height", 32);

  setInterval(function() {
    if (aniIdx >= aniPath.length) {
      aniIdx = 0;
    }
    var g = rccSvg.select("g");
    fromX = g.attr("x");
    fromY = g.attr("y");
    var bwtLen = pytha(
      fromX,
      fromY,
      aniPath[aniIdx].x + 80 - 8,
      aniPath[aniIdx].y - 8
    );
    var interSec = 2000;
    if (bwtLen < 30) {
      interSec = 2000;
    } else if (bwtLen < 100) {
      interSec = 3000;
    } else {
      interSec = 4000;
    }

    g.transition()
      .attr(
        "transform",
        "translate(" +
          (aniPath[aniIdx].x + 80 - 8) +
          " " +
          (aniPath[aniIdx].y - 8) +
          ")"
      )
      .duration(interSec);

    aniIdx++;
  }, 4000);
}
let interSec = 2000;
var basicLength = 0;
let aniX, aniY;
let fromX, fromY, toX, toY;
let myDist = 0;
let mySeg = 0;
let aniIdx = 0;
let routeWay = [];

function pytha(x1, y1, x2, y2) {
  var width = Math.abs(x1 - x2),
    height = Math.abs(y1 - y2);
  lineLength = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  return lineLength;
}

function routing111(barJson, from, to) {
  var node;
  var isOpen = true;
  for (var i = 0; i < checkedNode.length; i++) {
    if (checkedNode[i] == from) {
      return;
    }
  }
  checkedNode.push(from);

  if (from == to) {
    // routeWay.pop();

    routeWay.push(to);
    linkedLine = routeWay.slice();
    return true;
  }
  //openClose 체크
  //true == 더이상 탐색할 필요 없음.(open 된 상태이기 때문에)
  isOpen = checkStatus(barJson, from);
  if (isOpen == true) {
    return false;
  }

  routeWay.push(from);

  //to 에 있는지 조회
  node = toNodeMap.get(from);

  if (from == "portBar-1-0-2") {
    console.log("");
  }
  if (node != undefined && node instanceof Array) {
    //to이랑 연결된 것들 조회
    for (var i = 0; i < node.length; i++) {
      routing111(barJson, node[i], to);
    }
  } else if (node != undefined) {
    //to랑 연결된것 조회
    routing111(barJson, node, to);
  } else if (node == undefined) {
    node = fromNodeMap.get(from);
    if (node == undefined) {
      routeWay.pop();
      return;
    }
  }

  //from 이 있는지 조회
  node = fromNodeMap.get(from);

  if (from == "portBar-1-0-2") {
    console.log("");
  }
  if (node != undefined && node instanceof Array) {
    //from이랑 연결된 것들 조회
    for (var i = 0; i < node.length; i++) {
      routing111(barJson, node[i], to);
    }
  } else if (node != undefined) {
    //from이랑 연결된것 조회
    routing111(barJson, node, to);
  } else if (node == undefined) {
    routeWay.pop();
    return;
  }
  routeWay.pop();
}

//현재노드의 Open Close 를 체크 하는 함수
//open = true, close = false
function checkStatus(barJson, key) {
  for (var i = 0; i < barJson.length; i++) {
    if (key == barJson[i].key) {
      return barJson[i].isOpen;
    }
  }
  console.log(key + " is none");
}

function showMessage(x, y) {
  document.getElementById("diagramEventsMsg").textContent =
    "x : " + x + ", y : " + y;
}

function setStatus(barJson) {
  barJson.forEach(function(d) {
    d.isOpen = false;
  });
  barJson.forEach(function(d) {
    if (d.key.includes("port") == true) {
      d.isOpen = false;
    } else if (d.key.includes("ext") == true) {
      d.isOpen = false;
    } else if (d.key.includes("vBarCB") == true) {
      d.isOpen = false;
    } else if (d.key == "tieBar-DS-0-0-0") {
      //////////tieBar group 0
      d.isOpen = false;
    } else if (d.key == "tieBar-CB-0-0-0") {
      d.isOpen = false;
    } else if (d.key == "tieBar-DS-0-0-1") {
      d.isOpen = false;
    } else if (d.key == "tieBar-DS-1-0-0") {
      //////////tieBar group 1
      d.isOpen = false;
    } else if (d.key == "tieBar-CB-1-0-0") {
      d.isOpen = false;
    } else if (d.key == "tieBar-DS-1-0-1") {
      d.isOpen = false;
    } else if (d.key.includes("vBarCB") == true) {
      d.isOpen = false;
    } else if (d.key == "vBarDS-0-0-0") {
      /////////Vertical Group 0-0
      d.isOpen = false;
    } else if (d.key == "vBarDS-1-1-0") {
      d.isOpen = false;
    } else if (d.key == "vBarDS-0-0-1") {
      ////////////Vertical Group 0-1
      d.isOpen = false;
    } else if (d.key == "vBarDS-1-1-1") {
      d.isOpen = true;
    } else if (d.key == "vBarDS-0-0-2") {
      /////////Vertical Group 0-0
      d.isOpen = true;
    } else if (d.key == "vBarDS-1-1-2") {
      d.isOpen = false;
    } else if (d.key == "vBarDS-0-0-3") {
      /////////Vertical Group 0-0
      d.isOpen = false;
    } else if (d.key == "vBarDS-0-1-3") {
      /////////Vertical Group 0-0
      d.isOpen = false;
    } else if (d.key == "vBarDS-1-1-3") {
      d.isOpen = true;
    } else if (d.key == "vBarDS-0-0-4") {
      /////////Vertical Group 0-0
      d.isOpen = true;
    } else if (d.key == "vBarDS-1-1-4") {
      d.isOpen = false;
    } else if (d.key == "vBarDS-0-0-5") {
      /////////Vertical Group 0-0
      d.isOpen = false;
    } else if (d.key == "vBarDS-1-1-5") {
      d.isOpen = true;
    } else if (d.key == "vBarDS-0-0-2") {
      ////////////Vertical Group 3
      d.isOpen = false;
    } else if (d.key == "vBarDS-1-1-2") {
      d.isOpen = false;
    } else if (d.key == "vBarDS-1-0-0") {
      /////////Vertical Group 1-0
      d.isOpen = true;
    } else if (d.key == "vBarDS-2-1-0") {
      d.isOpen = false;
    } else if (d.key == "vBarDS-1-0-1") {
      /////////Vertical Group 1-0
      d.isOpen = false;
    } else if (d.key == "vBarDS-2-1-1") {
      d.isOpen = true;
    } else if (d.key == "vBarDS-2-0-0") {
      /////////Vertical Group 1-0
      d.isOpen = true;
    } else if (d.key == "vBarDS-2-1-0") {
      d.isOpen = false;
    } else if (d.key == "vBarDS-1-0-2") {
      /////////Vertical Group 1-0
      d.isOpen = false;
    } else if (d.key == "vBarDS-2-1-2") {
      d.isOpen = false;
    } else if (d.key == "vBarDS-1-0-3") {
      /////////Vertical Group 1-0
      d.isOpen = true;
    } else if (d.key == "vBarDS-1-0-4") {
      /////////Vertical Group 1-0
      d.isOpen = false;
    } else if (d.key == "vBarDS-0-1-1") {
      /////////Vertical Group 1-0
      d.isOpen = false;
    } else if (d.key == "vBarDS-2-1-3") {
      d.isOpen = true;
    } else {
      d.isOpen = true;
    }
  });
  return barJson;
}

function fromToXY(barJson, from, to) {
  var fromXY;
  var toXY;
  if (from == "tieBar-DS-0-2-1") {
    console.log("");
  }
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
  return { fromXY: fromXY, toXY: toXY };
}

function drawRccRect(x1, y1, width, height, color, key) {
  rccSvg
    .append("rect")
    .attr("x", x1 + 80 - width / 2)
    .attr("y", y1 - width / 2)
    .attr("width", width)
    .attr("height", height)
    .attr("stroke", color)
    .attr("fill", color)
    .attr("data-key", key)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);
}

function drawRccCircle(x1, y1, width, height, color, key) {
  rccSvg
    .append("circle")
    .attr("cx", x1 + 80)
    .attr("cy", y1)
    .attr("r", width)
    .attr("stroke", color)
    .attr("fill", color)
    .attr("data-key", key)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);
}
