let sccSvg;

let sccRoutingWay = [];
let drawLineWay = [];
var sccInterval = null;
var sccInterval2;
let sccLineFunc = d3.line()
    .x(function (d) {  return d.x + 80; })
    .y(function (d) { return d.y; });

function drawScc(sccData, diagramDivName){
 
  var dWidth = document.getElementById(diagramDivName).clientWidth - 0; // the width of diagram
  var dHeight = document.getElementById(diagramDivName).clientHeight; // the height of diagram
  var diagramWidth = dWidth * .7;
  var sccGroup = sccData.sccGroup[0];
  var cbList0 = sccGroup.cbList[0];
  var cbList1 = sccGroup.cbList[1];
  var cbList2 = sccGroup.cbList[2];
  var cbList3 = sccGroup.cbList[3];
  //init
  $("#" + diagramDivName).empty();
  sccSvg = d3.select("#"+diagramDivName)
    .append("svg")
    .attr("class","svgLineDlg")
      .attr( 'width', dWidth  )
      .attr( 'height', dHeight );
    sccSvg.append('defs')
      .attr('id','arrow')
      .attr('markerUnits','strokeWidth')
      .attr('markerWidth','50')
      .attr('markerHeight','50')
      .attr('viewBox','0 0 50 50')
      .attr('refX',6)
      .attr('refY',6)
      .attr('orient','auto')
    .append('path')
      .attr('d','M2,2 L10,6 L2,10 L6,6 L2,2')
      .attr('fill','#f00')  
       
    var transX, transY;
    transX = dWidth * .1;
    transY = dHeight/2;
    
    var radius = dHeight * .07;
    var path = [];
     var lineWidth = 3;
    
    var height = Math.abs(transY - radius * 3);

    _drawTrans(transX, transY, radius, 'transformer');
    
    path = [];
    path.push({x : transX + (radius * 2), y : transY });
    path.push({x : transX + (radius * 3), y : transY });
    _drawSccLine(path, lineWidth, 'white');
    _drawSccRectPort(transX + (radius * 2), transY, lineWidth, lineWidth, 'transparent', 'tr', '','tempPort3')
    _drawSccRectPort(transX + (radius * 3), transY, lineWidth, lineWidth, 'transparent', 'tempPort3','tr','tempPort2,tempPort4')
    // _drawSccRectPort(transX + (radius * 2), transY, 20, 20, 'yellow', 'tr', 'tr','tempPort3')
    // _drawSccRectPort(transX + (radius * 3), transY, 20, 20, 'yellow', 'tempPort3','tempPort2,tr','tempPort4')
    
    var calcInfo = _calcHWidth(diagramWidth, sccGroup.cbList);
    // var distBwtPole = calcInfo.distBwtPole * .8;    
    var maxCnt = calcInfo.maxCnt;
    var distBwtPole = diagramWidth ;
    var cbX = transX + (radius * 3);
    var cbY = transY;

    // drawSccInit(transX, transY, radius, lineWidth, dWidth);
    if(cbList0 != undefined)
      _drawCB1(cbX, cbY,  radius, lineWidth,  distBwtPole, maxCnt, cbList0 );
    if(cbList1 != undefined)
      _drawCB2(cbX, cbY,  radius, lineWidth,  distBwtPole, maxCnt, cbList1 );
    if(cbList2 != undefined)
      _drawCB3(cbX, cbY,  radius, lineWidth,  distBwtPole, maxCnt, cbList2 );
    if(cbList3 != undefined)
      _drawCB4(cbX, cbY,  radius, lineWidth,  distBwtPole, maxCnt, cbList3 );   
      
      var tmp = [];
      sccGroup.cbList.forEach((data) =>{
        data.poleList.forEach((data2)=>{
          tmp.push(data2.poleID);
        })
      })
       
      getMeterData(tmp);

      clearInterval(sccInterval); 
      sccInterval = setInterval(()=>{  
        sccSvg.selectAll('path#sccAniLine').remove();
        getMeterData(tmp);  
      },5000)
       
}
let url_meter_data = '';
function setURL(url){
  url_meter_data = url;
}
function getMeterData(ids){
  var sendData = {requestids : []};
  // sendData.requestids.push(id);
  var nodeList = [];
  var showndList = [];
  sendData.requestids = ids.slice();
  console.log('getMeterData()');
  sendData = JSON.stringify(sendData);
  if(url_meter_data == ''){
    alert('meter url is empty');
    return;
  }

  $.ajax({
    url : url_meter_data,
    type : 'post',
    data : sendData,
    
    contentType:'application/json',
    success : function(data, textStatus, jqXHR){
      if(data.results != undefined && data.results.length > 0)
      {
        
        
        data.results.forEach((v, i, arr) =>{
          //blind class 가된것만 길찾기 알고리즘 수행하기 위해서
          var classList = sccSvg.select('[data-deviceid="'+v.deviceid+'"]').nodes()
          var isBlind = false;
          for(var j=0; j < classList.length; j++){
            var attr =classList[i].getAttribute('class')
            if(attr == 'blind'){
              isBlind = true;
              break;
            }
          }
          
          if(v.source == "FR"){ 
            sccSvg.select('text#actpwr-'+v.deviceid).text('Act.Pwr : ' + v.pcs_meter.toFixed(2) +" kW"); ////-?�때 ?�감
            sccSvg.select('text#soc-'+v.deviceid).text('SOC : ' + v.soc.toFixed(2) +" %");
            if(v.pcs_meter > 0 && isBlind != true)
            {
              searchingSccWay('tr', v.deviceid);
            }else if(v.pcs_meter < 0 && isBlind != true)
            {
              
              searchingSccWay(v.deviceid, 'tr');
            }
          }else if(v.source == "SC"){ 
            sccSvg.select('text#gen-'+v.deviceid).text('Gen : ' + v.pv_meter.toFixed(2) +" kW"); ////-?�때 ?�감
            sccSvg.select('text#actpwr-'+v.deviceid).text('Act.Pwr : ' + v.pcs_meter.toFixed(2) +" kW"); 
            sccSvg.select('text#soc-'+v.deviceid).text('SOC : ' + v.soc.toFixed(2) +" %");
            if(v.pcs_meter < 0 && isBlind != true)
            {
              searchingSccWay(v.deviceid ,'tr' );
            }else if(v.pcs_meter > 0 && isBlind != true)
            {
              searchingSccWay('tr',v.deviceid);
            }
          }else if(v.source =="Peakcut"){ 
            sccSvg.select('text#actpwr-'+v.deviceid).text('Act.Pwr : ' + v.pcs_meter.toFixed(2) +" kW"); ////-?�때 ?�감
            sccSvg.select('text#soc-'+v.deviceid).text('SOC : ' + v.soc.toFixed(2) +" %");            
            if(v.pcs_meter > 0 && isBlind != true)
            {
              searchingSccWay('tr', v.deviceid);
            }else if(v.pcs_meter < 0 && isBlind != true)
            {
              
              searchingSccWay(v.deviceid, 'tr');
            }
          }
          else if(v.source == "DR"){ 
            sccSvg.select('text#meter-'+v.deviceid).text('Meter : ' + v.dr_meter.toFixed(2) +" kW"); ////+?�때 ?�감
            if(v.dr_meter > 0 && isBlind != true)
            {
              searchingSccWay(v.deviceid, 'tr');
            } 
          }else{
            console.log('recvMeasuringData ?�신???�른 �?= ' + v);
          }
        })
      }
    },
    error : function(jqXHR, textStatus, errorThrown){
      console.log('?�신 ?�러 ')
    }
  }
  )

}


function _drawCB1(x, y, radius, lineWidth,  distBwtPole, maxCnt, cbList){
    ////////////////#line1
  var vWidth = radius * 1.5;
  var path = [];
  var lineX = x ;
  var cbY = (y) - (vWidth * 3);   
  var cbY2 =  (y) - (vWidth * 1) ;
  path.push({x : lineX, y : cbY}); 
  path.push({x : lineX , y : cbY2}); 
  _drawSccLine(path, lineWidth, '#939393');
  _drawSccRectPort(lineX-(lineWidth/2), cbY-(lineWidth/2), lineWidth, lineWidth, 'transparent','tempPort1','tempPort2', cbList.cbID);
  // _drawSccRect(lineX - (0), cbY - (0), lineWidth ,lineWidth , 'black')
  
  var cbX = lineX + 50; 
  //CB ?�위 ??그리�?
  _drawSccSubPole(cbX, cbY, lineX, radius, cbList,lineWidth, distBwtPole, maxCnt, cbList.cbID);
  
  //CB 그리�?
  _drawSccCB(cbX, cbY, radius, getStatusColor(cbList.isOpen), cbList.cbID, 'tempPort1','empty-0-cb1');
  
 
}

function _drawCB2(x, y, radius, lineWidth,  distBwtPole, maxCnt, cbList){
  ////////////////#line1
  var vWidth = radius * 1.5;
  var path = [];
  var lineX = x  ;
  var cbY = (y) - (vWidth * 1);   
  var cbY2 =  (y) 
  path.push({x : lineX  , y : cbY}); 
  path.push({x : lineX , y : cbY2}); 
  _drawSccLine(path, lineWidth, '#939393');
  _drawSccRectPort(lineX-(lineWidth/2), cbY-(lineWidth/2), lineWidth, lineWidth, 'transparent','tempPort2','tempPort3','tempPort1,'+cbList.cbID)

  var cbX = lineX + 50; 
 
  _drawSccSubPole(cbX, cbY, lineX, radius, cbList,lineWidth, distBwtPole, maxCnt, cbList.cbID);

  _drawSccCB(cbX, cbY, radius, getStatusColor(cbList.isOpen), cbList.cbID, 'tempPort2','empty-0-cb2');
 
  
}

function _drawCB3(x, y, radius, lineWidth,  distBwtPole, maxCnt, cbList){
  ////////////////#line1
  var vWidth = radius * 1.5;
  var path = [];
  var lineX = x  ;
  var cbY = (y) + (vWidth * 1);   
  var cbY2 =  (y) 
  path.push({x : lineX  , y : cbY}); 
  path.push({x : lineX , y : cbY2}); 
  _drawSccLine(path, lineWidth, '#939393');
  _drawSccRectPort(lineX-(lineWidth/2), cbY-(lineWidth/2), lineWidth, lineWidth, 'transparent','tempPort4','tempPort3','tempPort5,'+cbList.cbID)
  
  var cbX = lineX + 50; 
  _drawSccSubPole(cbX, cbY, lineX, radius, cbList,lineWidth, distBwtPole, maxCnt, cbList.cbID)
  // for(var i=0; i < cbList.poleList.length; i++)
  
  _drawSccCB(cbX, cbY, radius, getStatusColor(cbList.isOpen), cbList.cbID, 'tempPort4','empty-0-cb3');;
  
 }

 function _drawCB4(x, y, radius, lineWidth,  distBwtPole, maxCnt, cbList){
  ////////////////#line1
  var vWidth = radius * 1.5;
  var path = [];
  var lineX = x  ;
  var cbY = (y) + (vWidth * 3);   
  var cbY2 =  (y) +  (vWidth * 1); 
  path.push({x : lineX  , y : cbY}); 
  path.push({x : lineX , y : cbY2}); 
  _drawSccLine(path, lineWidth, '#939393');
  _drawSccRectPort(lineX-(lineWidth/2), cbY-(lineWidth/2), lineWidth, lineWidth,'transparent', 'tempPort5','tempPort4', cbList.cbID)
 
  var cbX = lineX + 50;
  // path = [];
  // path.push({x : lineX, y : cbY});
  // path.push({x : cbX, y : cbY});
  //_drawSccLine(path, lineWidth, 'black');

  _drawSccSubPole(cbX, cbY, lineX, radius, cbList,lineWidth, distBwtPole, maxCnt, cbList.cbID)
  // for(var i=0; i < cbList.poleList.length; i++)
  {
     _drawSccCB(cbX, cbY, radius, getStatusColor(cbList.isOpen), cbList.cbID,'tempPort5','empty-0-cb4');
  }
  
}

function _drawSccSubPole(cbX, cbY, lineX, radius, cbList, lineWidth, distBwtPole, maxCnt, cbID){
  var poleX=cbX, poleY = cbY;
  var path = [];
  var poleID, Name;
  var fromID;
  var toID;
  var _width = distBwtPole;
  var i=0;
  var tempNode = [
    {poleID : "empty-0-"+cbID},
    {poleID : "empty-1-"+cbID},
    {poleID : "empty-2-"+cbID},
    {poleID : "empty-3-"+cbID},
    {poleID : "empty-4-"+cbID},
    {poleID : "empty-5-"+cbID},
    {poleID : "empty-6-"+cbID},
    {poleID : "empty-7-"+cbID},
    {poleID : "empty-8-"+cbID},
    {poleID : "empty-9-"+cbID}
  ];
  if(cbList.poleList.length == undefined){
    console.log('sssdsdsd');
  }
  else if(cbList.poleList.length == 1){
    tempNode[9] = cbList.poleList[0];
  }else if(cbList.poleList.length == 2){
    tempNode[4] = cbList.poleList[0];
    tempNode[9] = cbList.poleList[1];
  }else if(cbList.poleList.length == 3){
    tempNode[3] = cbList.poleList[0];
    tempNode[6] = cbList.poleList[1];
    tempNode[9] = cbList.poleList[2];
  }else if(cbList.poleList.length == 4){
    tempNode[1] = cbList.poleList[0];
    tempNode[3] = cbList.poleList[1];
    tempNode[6] = cbList.poleList[2];
    tempNode[9] = cbList.poleList[3];
  }else if(cbList.poleList.length == 5){
    tempNode[1] = cbList.poleList[0];
    tempNode[3] = cbList.poleList[1];
    tempNode[5] = cbList.poleList[2];
    tempNode[7] = cbList.poleList[3];
    tempNode[9] = cbList.poleList[4];
  }else if(cbList.poleList.length == 6){
    tempNode[0] = cbList.poleList[0];
    tempNode[2] = cbList.poleList[1];
    tempNode[4] = cbList.poleList[2];
    tempNode[6] = cbList.poleList[3];
    tempNode[7] = cbList.poleList[4];
    tempNode[9] = cbList.poleList[5];
  }else if(cbList.poleList.length == 7){
    tempNode[0] = cbList.poleList[0];
    tempNode[2] = cbList.poleList[1];
    tempNode[4] = cbList.poleList[2];
    tempNode[6] = cbList.poleList[3];
    tempNode[7] = cbList.poleList[4];
    tempNode[8] = cbList.poleList[5];
    tempNode[9] = cbList.poleList[6];
  }else if(cbList.poleList.length == 8){
    
    tempNode[0] = cbList.poleList[0];
    tempNode[1] = cbList.poleList[1];
    tempNode[3] = cbList.poleList[2];
    tempNode[4] = cbList.poleList[3];
    tempNode[6] = cbList.poleList[4];
    tempNode[7] = cbList.poleList[5];
    tempNode[8] = cbList.poleList[6];  
    tempNode[9] = cbList.poleList[7];
  }else if(cbList.poleList.length == 9){
    tempNode[0] = cbList.poleList[0];
    tempNode[1] = cbList.poleList[1];
    tempNode[2] = cbList.poleList[2];
    tempNode[3] = cbList.poleList[3];
    tempNode[5] = cbList.poleList[4];
    tempNode[6] = cbList.poleList[5];
    tempNode[7] = cbList.poleList[6];  
    tempNode[8] = cbList.poleList[7];  
    tempNode[9] = cbList.poleList[8]; 
  }else if(cbList.poleList.length == 10){
    tempNode[0] = cbList.poleList[0];
    tempNode[1] = cbList.poleList[1];
    tempNode[2] = cbList.poleList[2];
    tempNode[3] = cbList.poleList[3];
    tempNode[4] = cbList.poleList[4];
    tempNode[5] = cbList.poleList[5];
    tempNode[6] = cbList.poleList[6];  
    tempNode[7] = cbList.poleList[7];  
    tempNode[8] = cbList.poleList[8];  
    tempNode[9] = cbList.poleList[9]; 
  }

  //�??�인??중간?�드??
  if(tempNode.length > 1)
  {
    _width = distBwtPole / tempNode.length;
    for(i=0 ; i < tempNode.length -1; i++)
    {
      path = []
      if(i==0){
        path.push({x : lineX, y: cbY})
      }else{
        path.push({x : poleX, y: poleY})
      }  
      poleX += _width;    
      path.push({x : poleX, y: poleY})
      _drawSccLine(path, lineWidth, '#939393');
      poleID = tempNode[i].poleID; 
      Name = tempNode[i].Name;

      if(i > 0){
        //처음 ~ node.length-1
        fromID = tempNode[i-1].poleID;;
        toID = tempNode[i+1].poleID;
        if(poleID.indexOf("empty") !== 0)
          _drawSccPole(poleX, poleY, radius/3, '#939393', poleID, fromID, toID, Name, tempNode[i].dr, tempNode[i].lawCode);        
        else
          _drawSccPole(poleX, poleY, radius/3, '#939393', poleID, fromID, toID, Name, "", tempNode[i].lawCode);
      }else{
        //마�?�??�노??node.length)
        fromID = cbID;
        toID = tempNode[i+1].poleID;
        if(poleID.indexOf("empty") !== 0)
          _drawSccPole(poleX, poleY, radius/3, '#939393', poleID, fromID, toID, Name,tempNode[i].dr, tempNode[i].lawCode);
        else{
          _drawSccPole(poleX, poleY, radius/3, '#939393', poleID, fromID, toID, Name, "", tempNode[i].lawCode);
        }
      }
      
    } 
  }
  // else
  {
    path.push({x : lineX, y: cbY});
    poleX += _width;    
    path.push({x : poleX, y: poleY})
    fromID = cbID;
    toID = '';
    poleID = tempNode[i].poleID; 
    Name = tempNode[i].Name;
    //�??�인???�노??
    if(poleID.indexOf("empty") !== 0)
      _drawSccPole( cbX + ( distBwtPole), poleY, radius/3, '#939393', poleID, fromID, toID, Name, tempNode[i].dr, tempNode[i].lawCode);
    else
      _drawSccPole( cbX + ( distBwtPole), poleY, radius/3, '#939393', poleID, fromID, toID, Name, "", tempNode[i].lawCode);
    _drawSccLine(path, lineWidth, '#939393');
  }
  
  path = [];
  path.push({x : poleX  , y : poleY});
  path.push({x : cbX + ( distBwtPole), y : poleY});
 
   
}
 
var passedSCCNode = []; 
function searchingSccWay(fromID, toID){
  var temp = 'tempPort3';
  var sccAniPath = [];
  var path = [];
  var sccAniIdx = 0;
  var points = [];
  
  sccRoutingWay = [];
  passedSCCNode =[];
  // sccSvg.selectAll('path#sccAniLine').remove();
  
  if(fromID == 'tr')
  {    
    _routingSCC(temp, toID);
    sccRoutingWay.unshift('tr');
  }
  else if( toID =='tr'){
    _routingSCC(fromID, temp);
    sccRoutingWay.push('tr');    
  }
  else{
    _routingSCC(fromID, toID);
  }
  // console.log(fromID + ' -> '+ toID); 
   
  console.log('sccRoutingWay list')
  sccRoutingWay.forEach(function(d){
    // console.log(d + ', x : '+ sccSvg.select("[id='"+d+"']").attr('x') + ', y : '+sccSvg.select("[id='" + d + "']").attr('y'));
    sccAniPath.push({x : sccSvg.select("[id='"+d+"']").attr('x'), y : sccSvg.select("[id='" + d + "']").attr('y')})
    points.push({x : sccSvg.select("[id='"+d+"']").attr('x'), y : sccSvg.select("[id='" + d + "']").attr('y')})
  })

  for(var i=0; i < sccAniPath.length -1; i++){
    path.push(sccAniPath[i])
    path.push(sccAniPath[i+1])
    // _setSccArrowImg(path[0].x, path[0].y, path[1].x, path[1].y);
    _drawSccAniPath(path)
    // console.log(path);
    path = [];
  } 
  // _temp1(points);
  // console.log(''); 
  return sccRoutingWay;
}


function _routingSCC(fromID, toID)
{
  var searhcedNodes;
  var result = false; 
  fromID = fromID;
  toID = toID;
 
  //routing from
  for(var i=0; i < passedSCCNode.length; i++)
  {    
    if(passedSCCNode[i] == fromID){
      return false;
    }
  }
  passedSCCNode.push(fromID);
  sccRoutingWay.push(fromID);
  
  // searhcedNodes = sccSvg.select('#'+fromID).attr('data-fromID');
  console.log('fromID = ' + fromID);
  searhcedNodes = sccSvg.select("[id='"+fromID+"']").attr('data-fromID');
  
  if(searhcedNodes != undefined && searhcedNodes != null && searhcedNodes != 'tr'){
    searhcedNodes = searhcedNodes.replace(/\s/gi, "");//공백 제거
    if(searhcedNodes.indexOf(',') == -1 ){
      if(searhcedNodes == toID){
        sccRoutingWay.push(toID);
        return true;
      }else if(searhcedNodes == '')
      {
        sccRoutingWay.pop();
        return false;
      }       

      result = _routingSCC(searhcedNodes, toID);
      if(result == true)
        return true;
    }else{
      for(var idx=0; idx < searhcedNodes.split(',').length; idx++)
      {
        result = _routingSCC(searhcedNodes.split(',')[idx], toID);
        if(result == false)
        {
          continue;
        }
        else
        {          
          sccRoutingWay.pop();
          return true;
        }
      } 
    }
  }
  
   //routing to
  //  searhcedNodes = sccSvg.select('#'+fromID).attr('data-toID');
   searhcedNodes = sccSvg.select("[id='"+fromID+"']").attr('data-toID');
   if(searhcedNodes != undefined && searhcedNodes != null && searhcedNodes != 'tr'){
     searhcedNodes = searhcedNodes.replace(/\s/gi, "");//공백?�거
     if(searhcedNodes.indexOf(',') == -1 ){
       if(searhcedNodes == toID){
         sccRoutingWay.push(toID);
         return true;
       }else if(searhcedNodes == '')
       {
         sccRoutingWay.pop();
         return false;
       } 

      result = _routingSCC(searhcedNodes, toID);      
     
      if(result == true)
         return true;
       
     }else{
       for(var idx=0; idx < searhcedNodes.split(',').length; idx++)
       {
          result = _routingSCC(searhcedNodes.split(',')[idx], toID);
            if(result == false){
              continue;
            }          
            else
              return true;
            }
       } 
   } 

   sccRoutingWay.pop();
   return false;
}


function _drawTrans(x, y, radius, key){
  _drawSccCircle(x, y, radius, 'transparent', key)
  _drawSccCircle(x + (radius) , y, radius, 'transparent', key) 
}

let sccLine = d3.line().x(function(d){return d.x;}).y(function (d){return d.y;});

function _drawSccLine(path, width, color){
  sccSvg.append('path')
    .attr('d', sccLine(path))
    .attr('stroke',color)
    .attr('stroke-width',width)
    .attr('margin', 0)
}
function _setSccArrowImg(x1, y1, x2, y2, i){
  var toX = Number(x2) - Number(x1)  ;  
  var toY = Number(y2) - Number(y1);
  var beforeX = x1;
  var beforeY = y1;
  console.log(beforeX)
  // d3.interval(function(e){
  var img = sccSvg.append('image')
    .attr('class','sccArrowImg-'+i)
    .attr('x', x1)
    .attr('y', y1)
    .attr('width',15)
    .attr('height',15)
    .attr('xlink:href', '/images/line/arrow.png');
    img.transition()
      .duration(1500)
      .attr("transform", "translate("+ toX +", " + toY + ")")
      .on("end",function repeat(){  
        img
        .transition()
        .duration(1)
        .attr("transform", "translate(" + 0 +", " + 0 + ")")
        // .attr('x', x1)
        // .attr('y', y1)
        .transition()
        .duration(1500)
        .attr("transform", "translate("+ toX +", " + toY + ")")
        .on("end", repeat);
      });
    // repeat();
    // function repeat(){
    //   img
    //   .attr('x', x1)
    //   .attr('y', y1)
    //     .transition()
    //     .duration(5000) 
    //   // .ease("linear")
    //   .attr("transform", "translate("+ toX +", " + toY + ")")
    //   .on('end',repeat);
    // }
     
      // .on("end", _setSccAnimation('sccArrowImg-'+i, x1, y1, toX, toY));
      // _setSccAnimation('sccArrowImg-'+i, x1, y1, toX, toY)
  // },2000)  
}
function _setSccAnimation(id, x1, y1, toX, toY){
  // setInterval(function(id, x1, y1, toX, toY){
    d3.select('.'+id).attr('x', x1)
    .attr('y', y1)
    // .attr('width', 15)
    // .attr('height', 15)
    // .attr('xlink:href', '/images/line/arrow.png')
    .transition()
      .duration(5000)
      .attr("transform", "translate("+ toX +", " + toY + ")")
  // },10000, id, x1, y1, toX, toY) 
}
function _setSccMoving(idx, x1, y1, x2, y2){
  var toX = Number(x2) - Number(x1)  ;  
  var toY = Number(y2) - Number(y1);
  var id = '.sccArrowImg-'+idx;
  d3.select(id)
  .attr('x', x1)
  .attr('y', y1)
  .transition()
    .duration(5000) 
  // .ease("linear")
  .attr("transform", "translate("+ toX +", " + toY + ")")
}
function _getSccLen(x1, y1, x2 ,y2){
  var a = x1 - x2;
  var b = y1 - y2;
  var c = Math.sqrt( a*a + b*b );
  return c;
}

function _temp1(points){
  var p = [];
  var length = 200;
  var len;
  var x1,x2,y1,y2;
  
  var tmpX =0, tempY = 0;
  for(var i=0; i < points.length-1; i++){
    x1 = Number(points[i].x);
    x2 = Number(points[i+1].x);
    y1 = Number(points[i].y);
    y2 = Number(points[i+1].y);
    len = _getSccLen(x1, x2, y1, y2);
    if(len > length)
    { 
      tmpX = 0, tmpY = 0;
      if(x1 == x2)
      {
        if(y1 < y2)
        {
            //y2 <------------------------ y1
            var j =0; 
            while(true){
              tmpy = y1 - (j * length);
              if(tmpY <= y2){
                p.push({x : x1, y : y2});
                break;
              }
              p.push({x : x1, y : tmpY});
              j++;
            }
          }
          else{
            //y2 -------------> y1 
            while(true){
              tmpY = x2 + (j * length);
              if(tmpY >= x1){
                p.push({x : x1, y : y1});
                break;
              }
              p.push({x : tmpY, y : y1});
              j++;
            }
        }  
      }else
      { 
        if(x1 > x2){
          //x2 <------------------------ x1
          var j =0;
          while(true){
            tmpX = x1 - (j * length);
            if(tmpX <= x2){
              p.push({x : x2, y : y1});
              break;
            }
            p.push({x : tmpX, y : y1});
            j++;
          }
        }
        else{
          //x2 -------------> x1
          while(true){
            tmpX = x2 + (j * length);
            if(tmpX >= x1){
              p.push({x : x1, y : y1});
              break;
            }
            p.push({x : tmpX, y : y1});
            j++;
          }
        }
      }
    }    
    else{
      p.push({x : x1, y : y1});
    }
  }
 

}
function _drawSccAniPath(path ){
  sccSvg.append('path')
    .attr('d', sccLine(path))
    .attr('id','sccAniLine')
    .attr("stroke", 'yellow')
      .attr("stroke-width", 10)
      .attr("fill", "red")
      .attr('class','line')
}

function _drawSccRect(x, y, width, height, color, key){ 
  sccSvg.append('rect').attr('x',x).attr('y', y).attr("width", width)
    .attr("height", height).attr('stroke', color).attr('fill', color).attr("data-key", key).attr('id', key)
    .on("mouseover", _handleSCCMouseOver)
    .on("mouseout", _handleSCCMouseOut);
}
function _drawSccRectPort(x, y, width, height,color, key, fromID, toID){
  // var color = "red";
  sccSvg.append('rect').attr('x',x).attr('y', y).attr("width", width)
    .attr('id', ''+key).attr('data-fromID',fromID).attr('data-toID',toID)
    .attr("height", height).attr('stroke', color).attr('fill', color).attr("data-key", key)
    .on("mouseover", _handleSCCMouseOver)
    .on("mouseout", _handleSCCMouseOut);
}
function _drawSccCircle(x, y, radius, color, key){
  sccSvg.append('circle').attr('cx',x).attr('cy', y).attr('r', radius)
    .attr('stroke', 'white').attr('fill', color)
    .attr('stroke-width', 5)
    .attr('data-key', key)
    .attr('id', key)
    .on('mouseover', _handleSCCMouseOver)
    .on('mouseout', _handleSCCMouseOut)
}

function _drawSccCB(x, y,  radius, color, key, from, to){
  var g= sccSvg.append('g').attr('id',key).attr('data-fromID',from).attr('data-toID',to)
      .attr('x',x).attr('y',y);

  g.append('circle').attr('cx',x).attr('cy', y).attr('r', radius/2)
    .attr('stroke', 'white').attr('fill', color)
    .attr('stroke-width', 2)
    .attr('data-key', key)     
    .on('mouseover', _handleSCCMouseOver)
    .on('mouseout', _handleSCCMouseOut);

  g.append('text') .attr('x',x).attr('y', y)
     .attr('font-family', 'MalgunGothic')
    .attr('font-size', '15px')
    .attr("stroke","white")
    .attr("text-anchor", "middle")
    .attr('alignment-baseline','middle')
      .text("CB");
    
    // .attr('x',x).attr('y', y)
    // .attr('font-family', 'sans-serif')
    // .attr('font-size', '12px');
    
}

function _drawSccPole(x, y, radius, color, key, fromID, toID, name, dr, lawCode){
  var path =[];
  path.push({x : x  , y : y});
  path.push({x : x  , y : y+22});

  // if(dr.length > 1)
  // {
  //   sccSvg.append('path')
  //   .attr('d', sccLine(path))
  //   .attr('stroke',color)
  //   .attr('stroke-width',3)
  //   .attr('margin', 0)
  // }
  

  var g= sccSvg.append('g').attr('id', key)    
  .attr('data-fromID', fromID)    
  .attr('data-toID', toID).attr('x',x).attr('y',y);

  g.append('circle').attr('cx',x).attr('cy', y).attr('r', radius/2)
    .attr('stroke', 'pink').attr('fill', color)
    .attr('stroke-width', 1)    
    .attr('data-key', key) 
    .on('mouseover', _handleSCCMouseOver)
    .on('mouseout', _handleSCCMouseOut);

  g = sccSvg.append('g').attr('data-groupLawCode',lawCode);
  if(dr.length > 1){
    g.append('path')
    .attr('d', sccLine(path))
    .attr('stroke',color)
    .attr('stroke-width',3)
    .attr('margin', 0);
  }
  
  g.append('text') .attr('x',x).attr('y', y-25)
     .attr('font-family', 'Malgun Gothic')
    .attr('font-size', '15px')
    .attr("text-anchor", "middle")
    .attr("fill","white")
    .attr('alignment-baseline','middle')
    .text(name);

    // if(dr.indexOf("dr") >= 0 || dr.indexOf("ess") >=0)
    if(dr.length > 0)
    { 
      g.attr('data-deviceid',key);
      if(dr == 'SC'){
        g.append('text').attr('id','gen-'+key).attr('x', Number(x) + 40). attr('y', Number(y) + 30)
        .attr("font-family", "malgun Gothic")
        .attr("font-size", "15px")
        .attr("text-anchor", "right")
        .attr("fill","white")    
        .attr('alignment-baseline','middle')
        .text('Gen : ' + 0 + ' kW');
        g.append('text').attr('id','soc-'+key).attr('x', Number(x) + 40). attr('y', Number(y) + 30+15)
        .attr("font-family", "malgun Gothic")
        .attr("font-size", "15px")
        .attr("text-anchor", "right")
        .attr("fill","white")    
        .attr('alignment-baseline','middle')
        .text('SOC : ' + 0 + ' %');
        g.append('text').attr('id','actpwr-'+key).attr('x', Number(x) + 40). attr('y', Number(y) + 30+15+15)
        .attr("font-family", "malgun Gothic")
        .attr("font-size", "15px")
        .attr("text-anchor", "right")
        .attr("fill","white")    
        .attr('alignment-baseline','middle')
        .text('Act.Pwr : ' + 0 + ' kW');
      }
      else if(dr == 'PK'){
        g.append('text').attr('id','soc-'+key).attr('x', Number(x) + 40). attr('y', Number(y) + 40)
        .attr("font-family", "malgun Gothic")
        .attr("font-size", "15px")
        .attr("text-anchor", "right")
        .attr("fill","white")    
        .attr('alignment-baseline','middle')
        .text('SOC : ' + 0 + ' %');
        g.append('text').attr('id','actpwr-'+key).attr('x', Number(x) + 40). attr('y', Number(y) + 40+15)
        .attr("font-family", "malgun Gothic")
        .attr("font-size", "15px")
        .attr("text-anchor", "right")
        .attr("fill","white")    
        .attr('alignment-baseline','middle')
        .text('Act.Pwr : ' + 0 + ' kW');
      }
      else if(dr == 'FR'){
        g.append('text').attr('id','soc-'+key).attr('x', Number(x) + 40). attr('y', Number(y) + 40)
        .attr("font-family", "malgun Gothic")
        .attr("font-size", "15px")
        .attr("text-anchor", "right")
        .attr("fill","white")    
        .attr('alignment-baseline','middle')
        .text('SOC : ' + 0 + ' %');
        g.append('text').attr('id','actpwr-'+key).attr('x', Number(x) + 40). attr('y', Number(y) + 40+15)
        .attr("font-family", "malgun Gothic")
        .attr("font-size", "15px")
        .attr("text-anchor", "right")
        .attr("fill","white")    
        .attr('alignment-baseline','middle')
        .text('Act.Pwr : ' + 0 + ' kW');
      }
      else if(dr =='DR')
      {
        
        g.append('text').attr('id','meter-'+key).attr('x', Number(x) + 40). attr('y', Number(y) + 30)
        .attr("font-family", "malgun Gothic")
        .attr("font-size", "15px")
        .attr("text-anchor", "right")
        .attr("fill","white")    
        .attr('alignment-baseline','middle')
        .text('DR : ' + 0 + ' kW'); 
      } 
    }

  
  if(dr.indexOf("dr") >= 0)
  {
    g.append("rect").attr("x",x-12).attr("y",(y+25))
    .attr("width",25).attr("height",25)
    .attr("fill","transparent").attr("stroke","white").attr("stroke-width",1)
    .attr('data-lawCode', lawCode)
  }
  if(dr.indexOf("dr") < 0 && dr.length > 0){//pv-ess, ess ??경우
    g.append("circle").attr("cx",x + 0 ).attr("cy",(y+37)).attr("r", 15)
    .attr("width",20).attr("height",20)
    .attr("fill","#ff9f40").attr("stroke","white").attr("stroke-width",1)
    .attr('data-lawCode', lawCode)
  }

  g.append('text') .attr('x',x).attr('y', y+39)
     .attr('font-family', 'Malgun Gothic')
    .attr('font-size', '15px')
    .attr('font-weight','bold')
    .attr("text-anchor", "middle")
    .attr("fill","white")
    .attr('alignment-baseline','middle')
    .text(dr.toUpperCase());
  
  g.on("contextmenu", function(data, index){
     document.getElementById('sccContext-sccMenu-subMenu').innerHTML = "<div><a href='/areaControl?deviceID="+key+"'>?�비?�영?�로 ?�동</a></div>";    
     sccContextMenu(this, 'rect',  key);
     d3.event.preventDefault();
  })
  // g.on("mouseout".function(){

  // });
    
  
    // .attr('x',x).attr('y', y)
    // .attr('font-family', 'sans-serif')
    // .attr('font-size', '12px');
    
}

let sccContext = null;
var sccContextMenu = function(that, newContext, key){
  console.log('clicked node id(key) : '+ key)
  if(key != undefined){
    if (rccContext) {
      if (rccContext !== newContext) {
        console.log('sccContextmenu: cannot execute for rccContext: ' + newContext + ' while in current rccContext: ' + rccContext);
        return;
      }
    }
    sccContext = newContext;
    console.log('contextmenu:' + sccContext);
    d3.event.preventDefault();
  
    var position = d3.mouse(that);
    d3.select('#sccContext-sccMenu')
            .style('position', 'absolute')
            .style('left',( position[0] -20)+ "px")
            .style('top', (position[1]+60) + "px")
            .style('display', 'inline-block')
            .style('border-radius','5px')
            .style('border', '2px solid #33394B')
            .style('height','3vh')
            .style('width','8vw')
            .style('background','#fff')
            .style('text-align','center')
            .on('mouseleave', function() {
              //  d3.select('#rccContext-rccMenu').style('display', 'none');
              rccContext = null; 
              console.log('leave scc context');
            }
              );
    d3.select('#sccContext-sccMenu').attr('class', 'sccMenu ' + rccContext);
  }
}


//?�평 ?�주간의 공통 길이 구하�?
function _calcHWidth(dWidth, cbList){
  var distBwtPole = 0;
  var maxCnt = 0;
  cbList.forEach(function(d){
    if((dWidth / d.poleList.length) > distBwtPole)
    distBwtPole = dWidth / d.poleList.length;    
    if(d.poleList.length > maxCnt)
    maxCnt = d.poleList.length;
  })
  return {distBwtPole : distBwtPole, maxCnt : maxCnt};
}

 // Create Event Handlers for mouse
 function _handleSCCMouseOver() 
 {  // Add interactivity

  console.log('_handleSCCMouseOver')
  var attrs = d3.select(this);
  var x,y;
  var key = attrs.node().getAttribute("data-key");
  x = attrs.node().parentElement.getAttribute("x");
  y = attrs.node().parentElement.getAttribute("y");
  // if(this instanceof SVGCircleElement){
  //   x = attrs.attr('cx');
  //   y = attrs.attr('cy');
  // }else if(this instanceof SVGRectElement){
  //   x = attrs.attr('x');
  //    y = attrs.attr('y');
  // }
  sccSvg.append('text').attr('id','text-'+key)
  .attr('x',function(){{return Number(x)-10;}})
  .attr('y',function(){{return Number(y)+10;}})
  .attr('fill','white')  
  .text(key)
  console.log(key);
  
}
function _handleSCCMouseOut() 
{
  
  console.log('_handleSCCMouseOut')
    var attrs = d3.select(this);
    var key = attrs.node().getAttribute("data-key"); 
    // Select text by id and then remove
    d3.select("#text-"+ key).remove();  // Remove text location
  }
    