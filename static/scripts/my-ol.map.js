
var lins = [];

function clear(map, array) {
  // if (array.length > 1) {
  //   lins.forEach(function (item, i, arr) {
  //     item.remove();
  //   })
  // }
  polyline.remove();
  alert('clear')
}

var polyline;

function clearRouting() {
  polyline.remove();
  alert('clear')
}

function drawLink(map, fromLat, fromLng, toLat, toLng, fromID, toID) {
  var latLngs = [
    [fromLat, fromLng],
    [toLat, toLng]
  ];
  var line = L.polyline(latLngs, {
    // color: getColor()
    color : 'green',
     
  });
  
  line.addTo(map).bindPopup(''+fromID+' : ['+fromLat + ', ' + fromLng+'] -> '+toID+' : ['+toLat+ ', '+toLng+']');
  
  return line;
}

function createMarkerValue(mID, title, unit, type) {
  var valDiv, valTitle, valVal, valUnit;
  valDiv = document.createElement('div')

  valTitle = document.createElement('span')
  valTitle.innerText = title + ' : '
  valTitle.style.textAlign = "left";
  valTitle.style.width = '80px'
  valTitle.style.marginRight = '13px'

  var valVal = document.createElement('span')
  if (mID == null)
    mID = (Math.random() * 10).toFixed(1);
  valVal.id = 'val_'+type+'_'+ mID;   
  valVal.innerText = '22.21'
  valVal.style.textAlign = 'right'
  valVal.style.width = '80px'
  valVal.style.marginRight = '10px'

  valUnit = document.createElement('span')
  valUnit.innerText = unit;
  valUnit.style.textAlign = 'right'


  valDiv.appendChild(valTitle);
  valDiv.appendChild(valVal);
  valDiv.appendChild(valUnit);
  return valDiv;
} 


function createMarkerIconImg(type) {
  var imgDiv = document.createElement('img')
  // var _type = type.toLowerCase().replace("/(\s*)/g","");
  var _type = 'wind'
  if (_type == 'wind')
    imgDiv.src = '/images/wind.png';
  else if (_type == 'solar')
    imgDiv.src = '/images/solar.png';
  else if (_type == 'battery')
    imgDiv.src = '/images/battrey.png';
  else if (_type == 'factory')
    imgDiv.src = '/images/factory.png';
  else {
    imgDiv.src = '/images/error.png';
    alert('type error = ' + _type)
  }
  imgDiv.style.cursor = 'pointer'
  imgDiv.style.float = 'left';
  imgDiv.style.height = "100%"
  return imgDiv
}

function createMakerImg() {
  var div = document.createElement('div')
  div.style.clear = 'left'
  var imgDiv = document.createElement('img')
  // imgDiv.src = '/images/map-marker.png';
  imgDiv.src = '/images/pin.png';
  imgDiv.style.cursor = 'pointer'
  imgDiv.style.height = "100%"
  div.appendChild(imgDiv);
  return div
}

function drawVIBox(map, lat, lng, mID, type) {

  var mInfo = document.createElement('div');
  mInfo.style.backgroundColor = "white";
  mInfo.id = 'm-info-status' + mID;  
  
  var tag1 = createMarkerValue(mID, 'V', 'MW', 'V')
  var tag2 = createMarkerValue(mID, 'I', 'MW', 'I') 
 
  mInfo.appendChild(tag1);
  mInfo.appendChild(tag2);

  var divIcon = L.divIcon({
    className: 'my-div-icon my-div-status my-div-status-'+mID,
    html: mInfo.innerHTML,
    iconSize: null,
    iconAnchor: [30, 62]
  })
  var m = L.marker([lat, lng], {
    icon: divIcon,
    draggable: false
  });
  m._mid = mID;
  m.addTo(map);
  return m;
}

 
/////////////////////////////////////

////////////////getMapStep/////////////////////
///////////////showStatus()////////////////////////
let fromMap = new HashMap();
let toMap = new HashMap();
let nodeMap = new HashMap();
let groupMap = new HashMap();
// let groupMap ;
let addedNode = [];//그릴때 중복 없애기 위한 해쉬맵
let markerLink = [];
function showStatus(map, locData)
{ 
  let dataMap = new HashMap();  
  var id, loc, from = '', to ='', type, obj, subnode, code; 
  //filtering    
  groupMap.clear();
   //step1. 클러스터링 하기 위해 최소 정보를 HashMap에 저장         
   locData.features.forEach(function(data){
     //1,2,3단계일때 비트 계산하면 되겟다.
    // code = parseInt(data.properties.id.split('_')[0]);
    // code = parseInt(data.properties.id.toString().substring(0, 10));
    code = data.properties.id.toString();
    code = changeCodeToLevel(map, code);
    id = data.properties.id;

    loc = { lat : data.geometry.coordinates[1], lng : data.geometry.coordinates[0] };
    from = data.properties.from;
    to = data.properties.to;
    subnode = data.properties.subnode;
    obj = {
      id : id, loc : loc, from : from, to : to, 
      type : type, subnode : subnode, code : code
    };
    if(groupMap.has(code)){
      groupMap.get(code).push(loc);
    }else{
      var centerPosition = [];
      centerPosition.push(loc);
      groupMap.set(code, centerPosition);
    }      
  })

  if(getMapStep(map.getZoom()) == 1){
    dataMap.clear();
    for(var i=0; i< locData.features.length; i++)
    {
      var data = locData.features[i];
      id = data.properties.id;
      loc = { lat : data.geometry.coordinates[1], lng : data.geometry.coordinates[0] };
      from = data.properties.from;
      to = data.properties.to;
      type = data.properties.type;    
      subnode = data.properties.subnode;
      code = data.properties.code;
      obj = {
          loc : loc, from : from, to : to, type : type, subnode : subnode, code : code, id : id
      }; 
      dataMap.set(id, obj);
      // console.log('fromID : '+ from + ",\tid  : "+id +" ( "+data.properties.subnode+")"+",\ttoID : "+to+"");
    } 
    
  }
  else if(getMapStep(map.getZoom()) > 1)
  {
    //연결된 노드가 다른 그룹인지 확인
    //다른그룹이면 fromMap에 정보 추가
    fromMap.clear();//초기화
    var currentGroupCode, toGroupCode, toGroupCodes;
    var cnt;//, 포함 여부
    
    for(var i=0; i< locData.features.length; i++)
    { 
      var _id = locData.features[i].properties.id;
      _id = changeCodeToLevel(map, _id);
      var _latLng = [{lat : locData.features[i].geometry.coordinates[1], lng : locData.features[i].geometry.coordinates[0]}];
      var _to =  locData.features[i].properties.to;
      var _from = locData.features[i].properties.from;
      var _toList = [];
      var _fromList = [];

      if(_to.indexOf(',') == -1)
      {
        var _d1 = _to;
        // _d1 = _d1.substring(0, 4)*1000000;
        _d1 = changeCodeToLevel(map, _d1); 
        if(_d1 != _id && _d1 !="")
          _toList.push(_d1);
      }
      else
      {
        for(var _j = 0 ; _j < _to.split(',').length; _j++)
        {
          var _to2 = _to.split(',')[_j];
          _to2 = changeCodeToLevel(map, _to2);
          if(_to2 != _id && _to2 != "")
            _toList.push(_to2);
        }
      }

      if(_from.indexOf(',') == -1)
      {
        var _d1 = _from;
       _d1 = changeCodeToLevel(map, _d1);
        if(_d1 != _id && _d1 !="")
          _fromList.push(_d1);
      }
      else
      {
        for(var _j = 0 ; _j < _from.split(',').length; _j++)
        {
          var _from2 = _from.split(',')[_j];
          _from2 = changeCodeToLevel(map, _from2); 
          if(_from2 != _id && _from2 != "")
            _fromList.push(_from2);
        }
      }

      if(dataMap.has(_id) == true)
      { 
        
        var _d1 = dataMap.get(_id).to.concat(_toList);
        var _d2 = dataMap.get(_id).from.concat(_fromList);
        var _d3 = dataMap.get(_id).loc.concat(_latLng);

        _d1 = _d1.filter( (item, idx, array) => {          
          return array.indexOf( item ) === idx ;//중복제거
        });        
        _d2 = _d2.filter( (item, idx, array) => {
          return array.indexOf( item ) === idx ;//중복제거
        });        
        _d3 = _d3.filter( (item, idx, array) => {
          return array.indexOf( item ) === idx ;//중복제거
        });

        var _obj = {loc : _d3, to : _d1, from : _d2};
        dataMap.set(_id, _obj)
      }else
      {
        var _obj = {loc : _latLng, to : _toList, from : _fromList};
        dataMap.set(_id, _obj);
      }
    }

    dataMap.forEach((value, key) => {
      var _loc = L.latLngBounds(value.loc).getCenter();
      value.loc = _loc;      
      dataMap.set(key, value);
    })

  } 

    // myCnt = 0;
  //marker
  addedNode = [];
  fromMap.clear();

  for(var dIdx = 0; dIdx < dataMap.size; dIdx++)
  {
    // console.log('myCnt = ' + myCnt++);
    var value = dataMap.get(dataMap.keys()[dIdx]);
    var lng = parseFloat(value.loc.lng);
    var lat = parseFloat(value.loc.lat);

    if(getMapStep(map.getZoom()) == 1)
    { 
      showDetailValue(map,dataMap, lat, lng, value.id, value);
    }
    else if(getMapStep(map.getZoom()) > 1)
    {     
      var latlng2 = { lat : lat - 0.002, lng : lng};
      var infoDiv;
      var m;
      var _tempIdx; 
      var _id = dataMap.keys()[dIdx];
      var _node = dataMap.get(_id);      
      var _toLatLng, _fromLatlng;
      infoDiv = drawNodeInfoBox(map, latlng2.lat, latlng2.lng, _id);
      var divIcon = L.divIcon({ className : 'nodeInfoDiv', html : infoDiv.innerHTML, 
                              iconSize : [130,50],  iconAnchor : [0, 48]  });   
      m = L.marker(latlng2, {icon : divIcon,  draggable : false  });
      m._mid = _id;
      // console.log('clustering Node' + _id);
      console.log(map.getZoom());
      m.addTo(map);           
      L.marker({lat, lng}).addTo(map);   
      if(_node.from.length > 1)
      {
        _node.from.forEach((value) =>{
          _fromLatlng = dataMap.get(value);
          _fromLatlng = _fromLatlng.loc;
           drawLink(map, _fromLatlng.lat, _fromLatlng.lng, lat, lng, value, _id);
        })
      }
      else
      {
        if(_node.from[0] != undefined)
        {
          _fromLatlng = dataMap.get(_node.from[0]);
          _fromLatlng = _fromLatlng.loc;
           drawLink(map, _fromLatlng.lat, _fromLatlng.lng, lat, lng, _node.from[0], _id);
        }
      }

      if(_node.to.length > 1)
      {
        _node.to.forEach((value) => {
          _toLatLng = dataMap.get(value);
          _toLatLng = _toLatLng.loc;
           drawLink(map,  lat, lng, _toLatLng.lat, _toLatLng.lng, _id, value); 
        })
      }
      else
      {
        if(_node.to[0] != undefined)
        {
          _toLatLng = dataMap.get(_node.to[0]);
          _toLatLng = _toLatLng.loc;
           drawLink(map,  lat, lng, _toLatLng.lat, _toLatLng.lng, _id, _node.to[0]);
        }        
      }
    } 
  }  
}
let drawLineInfo;
let myCnt = 0;
let myCnt1 = 0;
//////////////showStatus()/////////////////////////
/// map 1단계에 따른 맵 화면 설정
function showDetailValue(map, dataMap, lat, lng, key, value)
{
  //drawing CB, PV, Wind,Ess 
  if(typeof value.subnode != 'undefined')
  {
    var latlng1, latlng2, latlng3;
    
    var infoDiv, m;
    // console.log('value.subnode = ' + value.subnode);
    var list = value.subnode.toString().toLowerCase().split(',');
    for(var idx = 0; idx < list.length; idx++){
      var data = list[idx];
      if(data == 'cb')
      {
        latlng1 = {lat : lat - 0.001, lng : lng};  

        var icon = L.icon({
          iconUrl : '/images/marker/cb.png',
          iconSize: [25, 41],
          iconAnchor: [12, 30],
        });    
        latlng2 = { lat : lat - 0.002, lng : lng};
        infoDiv = drawNodeInfoBox(map, latlng2.lat, latlng2.lng, key);
        var divIcon = L.divIcon({
          className : 'nodeInfoDiv',
          html : infoDiv.innerHTML,
          iconSize : [130,50],
          iconAnchor : [0, 48]
        });        
        m = L.marker(latlng2, {
          icon : divIcon,
          draggable : false,
        });
        
        m._mid = key;
        m.addTo(map);
        m = L.marker(latlng1,{icon : icon, contextmenu: false,}).addTo(map);        
        // m = L.marker(latlng1).addTo(map);        
        var link = drawLink(map, lat, lng, latlng1.lat, latlng1.lng, '',''); 

        var tmpIcon = L.divIcon({className : 'node-error-'+key, iconSize : [150, 150], iconAnchor:[48,48]});
        L.marker(latlng1,{ icon : tmpIcon, draggable : false}).addTo(map);

      } 
      else if(data == 'pv' || data =='wind' || data =='dr')
      {        
        var pvIconUrl  = "/images/marker/pv.png";
        var windIConUrl = "/images/marker/wind.png";
        var drIconUrl = "/images/marker/dr.png";
        var iconUrl;
        var icon;
        if(data =='pv')
        { 
          icon = L.icon({
            iconUrl : pvIconUrl,
            iconSize : [25,41],
            iconAnchor : [12,30]
          });
        }else if(data == 'wind')
        {
          icon = L.icon({
            iconUrl : windIconUrl,
            iconSize : [25,41],
            iconAnchor : [12,30]
          });
        }else if(data == 'dr')
        {
          icon = L.icon({
            iconUrl : drIconUrl,
            iconSize : [25,41],
            iconAnchor : [12,30]
          });
        } 
        if(idx == list.length-1){
            m = L.marker(latlng2,
              {
                icon : icon,
                myMarkerID : key,
                pv : false,
                contextmenu: true,
                contextmenuItems: [
                  {
                    text : '지역현황',
                    index : 0,
                    hideOnSelect: 'true',
                    callback: directRegionStatus
                },
                {
                  text : '계통도',
                  index : 1,
                  hideOnSelect: 'true',
                  callback: directSinglineDlg
                },
                {
                  text : '설비운영',
                  index : 2,
                  hideOnSelect: 'true',
                  callback: directAreaCtrlDlg
                }
              ]
            }
          ).addTo(map);
        }else{
          m = L.marker(latlng2, {icon : icon, contextmenu:false}).addTo(map).bindPopup("this is "+data+"_"+key);
        }
        
        
        link = drawLink(map, latlng1.lat, latlng1.lng, latlng2.lat, latlng2.lng,'','');        
      }
      else if(data == 'ess')
      {
        var _tempLatLng;
        latlng3  = {lat : lat - 0.0033 , lng : lng}; 
        var icon = L.icon({
          iconUrl : '/images/marker/ess.png',
          iconSize : [25, 41],
          iconAnchor : [12, 30]
        })
        console.log('add ess node')
        m = L.marker(latlng3,
          {
            icon : icon,
            myMarkerID : key, 
            pv : true,
            contextmenu: true,
            contextmenuItems: [
              {
                text : '지역현황',
                index : 0,
                hideOnSelect: 'true',
                callback: directRegionStatus
                
            },
            {
              text : '계통도',
              index : 1,
              hideOnSelect: 'true',
              callback: directSinglineDlg
            },
            {
              text : '설비운영',
              index : 2,
              hideOnSelect: 'true',
              callback: directAreaCtrlDlg
            }
          ]
        }
        ).addTo(map);
 
        if(latlng2 != undefined)
        {
          link = drawLink(map, latlng1.lat, latlng1.lng, latlng3.lat, latlng3.lng,'','');
        } else{
          link = drawLink(map, latlng1.lat, latlng1.lng, latlng3.lat, latlng3.lng,'','');
        }
      }
    }
    /*
    value.subnode.toString().toLowerCase().split(',').forEach(function(data, idx)
    {
      // data = nodeList[idx];
      if(data == 'cb')
      {
        latlng1 = {lat : lat - 0.001, lng : lng};  

        var icon = L.icon({
          iconUrl : '/images/marker/cb.png',
          iconSize: [25, 41],
          iconAnchor: [12, 30],
        });    
        latlng2 = { lat : lat - 0.002, lng : lng};
        infoDiv = drawNodeInfoBox(map, latlng2.lat, latlng2.lng, key);
        var divIcon = L.divIcon({
          className : 'nodeInfoDiv',
          html : infoDiv.innerHTML,
          iconSize : [130,50],
          iconAnchor : [0, 48]
        });        
        m = L.marker(latlng2, {
          icon : divIcon,
          draggable : false,
        });
        
        m._mid = key;
        m.addTo(map);
        m = L.marker(latlng1,{icon : icon, contextmenu: false,}).addTo(map);        
        // m = L.marker(latlng1).addTo(map);        
        var link = drawLink(map, lat, lng, latlng1.lat, latlng1.lng, '',''); 

        var tmpIcon = L.divIcon({className : 'node-error-'+key, iconSize : [150, 150], iconAnchor:[48,48]});
        L.marker(latlng1,{ icon : tmpIcon, draggable : false}).addTo(map);

      } 
      else if(data == 'pv' || data =='wind' || data =='dr')
      {        
        var pvIconUrl  = "/images/marker/pv.png";
        var windIConUrl = "/images/marker/wind.png";
        var drIconUrl = "/images/marker/dr.png";
        var iconUrl;
        var icon;
        if(data =='pv')
        { 
          icon = L.icon({
            iconUrl : pvIconUrl,
            iconSize : [25,41],
            iconAnchor : [12,30]
          });
        }else if(data == 'wind')
        {
          icon = L.icon({
            iconUrl : windIconUrl,
            iconSize : [25,41],
            iconAnchor : [12,30]
          });
        }else if(data == 'dr')
        {
          icon = L.icon({
            iconUrl : drIconUrl,
            iconSize : [25,41],
            iconAnchor : [12,30]
          });
        } 
        // m = L.marker(latlng2, {icon : icon, contextmenu:false}).addTo(map).bindPopup("this is "+data+"_"+key);
        m = L.marker(latlng2,
                {
                  icon : icon,
                  myMarkerID : key,
                  contextmenu: true,
                  contextmenuItems: [
                    {
                      text : '단선도',
                      index : 0,
                      hideOnSelect: 'true',
                      callback: showSinglineDlg
                  },
                  {
                    text : '계통도',
                    index : 1,
                    hideOnSelect: 'true',
                    callback: showSinglineDlg
                  },
                  {
                    text : '설비운영',
                    index : 2,
                    hideOnSelect: 'true',
                    callback: showSinglineDlg
                  }
                ]
              }
            ).addTo(map);
        link = drawLink(map, latlng1.lat, latlng1.lng, latlng2.lat, latlng2.lng,'','');        
      }
      else if(data == 'ess')
      {
        var _tempLatLng;
        latlng3  = {lat : lat - 0.0033 , lng : lng}; 
        var icon = L.icon({
          iconUrl : '/images/marker/ess.png',
          iconSize : [25, 41],
          iconAnchor : [12, 30]
        })
        
        m = L.marker(latlng3,
          {
            icon : icon,
            myMarkerID : key,
            contextmenu: true,
            contextmenuItems: [
              {
                text : '단선도',
                index : 0,
                hideOnSelect: 'true',
                callback: showSinglineDlg
             },
             {
              text : '계통도',
              index : 1,
              hideOnSelect: 'true',
              callback: showSinglineDlg
            },
            {
              text : '설비운영',
              index : 2,
              hideOnSelect: 'true',
              callback: showSinglineDlg
            }
          ]
        }
        ).addTo(map);
 
        if(latlng2 != undefined)
        {
          link = drawLink(map, latlng1.lat, latlng1.lng, latlng3.lat, latlng3.lng,'','');
        } else{
          link = drawLink(map, latlng1.lat, latlng1.lng, latlng3.lat, latlng3.lng,'','');
        }
      }
    })
    
    */
  }
 
  if(typeof value.to != 'undefined')
  {
    var before, after, to;
    var latlng2, m;
    // console.log('value.to = '+ value.to)
    if( value.to.toString().split(',').length > 1){

      value.to.toString().split(',').forEach(function(val, idx)
      {
        // to = parseInt(val);
       
        to = val;
        before = dataMap.get(key);
        after = dataMap.get(to);  
        //console.log('before = ' + before + ', after =' + after + ', to = ' + to);
        if(typeof after != 'undefined'){   
          var coords = [new L.latLng(before.loc.lat, before.loc.lng),
                        new L.latLng(after.loc.lat, after.loc.lng)];
          // override defaults
          // var line = L.polyline(coords, {
          //   distanceMarkers: { showAll: 15, offset: 100, cssClass: 'some-other-class', iconSize: [16, 16] }
          // });
            // map.fitBounds(line.getBounds());
            // map.addLayer(line);
            
          drawLink(map, before.loc.lat, before.loc.lng, after.loc.lat, after.loc.lng, before.id, after.id);
        }
      })
    }else{
      to = value.to;
      before = dataMap.get(key);
      after = dataMap.get(to)    ;
      //console.log('before = ' + before + ', after =' + after + ', to = ' + to);

      if(typeof after != 'undefined'){   
        var coords = [new L.latLng(before.loc.lat, before.loc.lng),
                      new L.latLng(after.loc.lat, after.loc.lng)];
        // override defaults
        // var line = L.polyline(coords, {
        //   distanceMarkers: { showAll: 15, offset: 100, cssClass: 'some-other-class', iconSize: [16, 16] }
        // });
          // map.fitBounds(line.getBounds());
          // map.addLayer(line);
           
         drawLink(map, before.loc.lat, before.loc.lng, after.loc.lat, after.loc.lng, before.id, after.id);
      }
    }
  }
}
//이미 그린 노드라면 true 리턴
function isAddedNode(id)
{
  var newStatus = false;
  for(var vIdx = 0; vIdx < addedNode.length; vIdx++){
    if(addedNode[vIdx] === id)
    {
      newStatus = true;
      // console.log(id + 'has been drawn.')
      break;
    }
  }
  if(newStatus == false){
    addedNode.push(id);
  }
  return newStatus;
}
let _addMarker = [];

////////////nodeInfo////////////////////
function drawNodeInfoBox(map, lat, lng, id)
{
  var div = document.createElement('div');
  div.className = 'nodeInfoDiv'; 
  var ul = document.createElement('ul');
  ul.className="marker-value-list";
  var li1 = document.createElement('li');
  var span1 = document.createElement('span');
  span1.innerText = "Gen. : 23.22MW";
  span1.id = "gen-"+id;
  li1.appendChild(span1);
  
  var li2 = document.createElement("li");
  var span2 = document.createElement("span");
  span2.innerText = "SoC : 23%"  ;
  span2.id = "soc-"+id;
  li2.appendChild(span2);

  var li3 = document.createElement("li");
  var span3 = document.createElement("span");
  span3.innerText = "Act. pwr. : 0 kW"  ;
  span3.id="active-power-"+id;
  li3.appendChild(span3);

  var li4 = document.createElement("li");
  var span4 = document.createElement("span");
  span4.innerText = "Event : 0"  ;
  span4.id="evt-"+id;
  li4.appendChild(span4);
  

  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  ul.appendChild(li4);
  div.appendChild(ul);
  return div;
}
 
////////////nodeTotalInfo/////////////////

// Use Leaflet to implement a D3 geometric transformation.
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getColor() {
  var r = getRandomInt(0, 255);
  var g = getRandomInt(0, 255);
  var b = getRandomInt(0, 255);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function getBRColor() {
  if (getRandomInt(0, 255) % 2 == 0) {
    return '#FF0000';
  } else {
    return '#0000FF';
  }
}

function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = Math.PI * lat1 / 180
  var radlat2 = Math.PI * lat2 / 180
  var theta = lon1 - lon2
  var radtheta = Math.PI * theta / 180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515
  if (unit == "K") {
    dist = dist * 1.609344
  }
  if (unit == "N") {
    dist = dist * 0.8684
  }
  return dist
}



function drawArrows(map, arrow) {
  var per = 20;
  var temp = 0;
  // while(true)
  // {

  //   temp += per;
  //   if(temp >=100)
  //     return;
  //   var arrowHead = L.polylineDecorator(arrow, {
  //     patterns: [{
  //       offset: temp +'%',
  //       repeat: 0,
  //       symbol: L.Symbol.arrowHead({
  //         pixelSize: 15,
  //         polygon: false,
  //         pathOptions: {
  //           stroke: true
  //         }
  //       })
  //     }]
  //   });
  //   arrowHead.addTo(map); 
  // }


  var arrowHead = L.polylineDecorator(arrow, {
    patterns: [{
        offset: 0,
        repeat: 3,
        symbol: L.Symbol.dash({
          pixelSize: 10,
          color: 'red'
        })
        // symbol: L.Symbol.arrowHead({
        //   pixelSize: 15,
        //   polygon: false,
        //   pathOptions: {
        //     stroke: true
        //   }
        // })
      },
      {
        offset: 30,
        repeat: 2,
        symbol: L.Symbol.arrowHead({
          pixelSize: 13,
          polygon: false,
          pathOptions: {
            stroke: true,
            color: 'black'
          }
        })
      }
    ]
  });
  arrowHead.addTo(map);
}

function __init_migration(map, array) {

  var myData = [];

  for (var i = 0; i < array.length - 1; i++) {
    from = array[i].geometry.coordinates;
    to = array[i + 1].geometry.coordinates;
    var fromLat = from[1];
    var fromLng = from[0];
    var toLat = to[1];
    var toLng = to[0];
    myData.push({
      "from": [fromLng, fromLat],
      "to": [toLng, toLat],
      "labels": ["a1", "a2"],
      "color": "#FF00FF"
    });
  }

  var migrationLayer = new L.migrationLayer({
    map: map,
    data: myData,
    pulseRadius: 30,
    pulseBorderWidth: 3,
    arcWidth: 1,
    arcLabel: true,
    arcLabelFont: '10px sans-serif',
  });
  migrationLayer.addTo(map);
  migrationLayer.show();

  
}
let migrationlayer ;
function showCtrlArrow(map, fromToJson){
  migrationLayer = new L.migrationLayer({
    map: map,
    data: fromToJson,
    pulseRadius: 30,
    pulseBorderWidth: 3,
    arcWidth: 1,
    arcLabel: true,
    arcLabelFont: '10px sans-serif',
  });
  migrationLayer.addTo(map);
  migrationLayer.show();
}
function stopCtrlArrow(map){
  if(migrationlayer != null){
    migrationLayer.destroy();
  }
}



//계통도로 이동
function directSinglineDlg(e, e1){
  var essId = e.relatedTarget.options.myMarkerID;
  var pv = e.relatedTarget.options.pv;
  location.href = '/lineDiagram?id='+essId+"&pv="+pv;
}
//설비운영으로 이동
function directAreaCtrlDlg(e, e1){
  var essId = e.relatedTarget.options.myMarkerID;
  var pv = e.relatedTarget.options.pv;
  location.href = '/areaControl?id='+essId+"&pv="+pv;
}
//지역현황으로 이동
function directRegionStatus(e, e1){
  var essId = e.relatedTarget.options.myMarkerID;
  var pv = e.relatedTarget.options.pv;
  location.href = '/regionStatus?id='+essId+"&pv="+pv;
}

function changeCodeToLevel(map, code){
  var _id;
  if(getMapStep(map.getZoom()) == 2)
  {
    _id = code.substring(0, 4) * 1000000;
  } 
  else if(getMapStep(map.getZoom()) == 3)
  {
    _id = code.substring(0, 2) * 100000000;
  }
  else if(getMapStep(map.getZoom()) == 4)
  {
    _id = code.substring(11, 13);
  } 

  return _id;
}

///////////////getMapStep//////////////////////
///////몇 단계 인지 값 반환
function getMapStep(mapLevel)
{
  // console.log(mapLevel); 
  // return 1;
  // return 1;
  if(mapLevel >= 16)
  {     
    return 1;
  }//모두 보여주는 맵
  else if(mapLevel <= 15 && mapLevel > 13)
  {      
    return 2;
  }//2단계 축소한 맵 - 동단위 데이터 맵
  else if( mapLevel <= 13 && mapLevel > 10)
  {       
    return 3;
  }//3단계 축소한 맵 - 구 별로 축소된 맵?
  else if(mapLevel <= 10)
  { 
    return 4;
  }//4단계 축소한 맵 - 시 별 데이터
}



function getMarkerGroup(map, locData){
  var code;
  groupMap = new HashMap();
  var id, loc, from, to ,subnode, obj, type;
  //step1. 클러스터링 하기 위해 최소 정보를 HashMap에 저장         
  locData.features.forEach(function(data){
    //1,2,3단계일때 비트 계산하면 되겟다.
   // code = parseInt(data.properties.id.split('_')[0]);
   code = parseInt(data.properties.id.toString().substring(0, 10));
   if(getMapStep(map.getZoom()) == 3){
    //  code = parseInt(code.toString().slice(0,4) * 1000000);
    code = make3GroupNumber(code);
   }else if(getMapStep(map.getZoom()) == 4){
     code = (data.properties.id.toString());
     code = parseInt(code.toString().slice(11,13));
   }
   id = data.properties.id;

   loc = { lat : data.geometry.coordinates[1], lng : data.geometry.coordinates[0] };
   from = data.properties.from;
   to = data.properties.to;
   subnode = data.properties.subnode;
   obj = {
     id : id, loc : loc, from : from, to : to, 
     type : type, subnode : subnode, code : code
   };
   if(groupMap.has(code)){
     groupMap.get(code).push(loc);
   }else{
     var centerPosition = [];
     centerPosition.push(loc);
     groupMap.set(code, centerPosition);
   }      
 })
  return groupMap;
}
function getMarker3Group(locData){
  var code;
  groupMap = new HashMap(); 
  var id, loc, from, to ,subnode, obj, type;
  //step1. 클러스터링 하기 위해 최소 정보를 HashMap에 저장         
  locData.features.forEach(function(data)
  {
    //1,2,3단계일때 비트 계산하면 되겟다.
   // code = parseInt(data.properties.id.split('_')[0]);
   code = parseInt(data.properties.id.toString().substring(0, 10));
  //  code = parseInt(code.toString().slice(0,4) * 1000000);
  code = make3GroupNumber(code);
   id = data.properties.id;

   loc = { lat : data.geometry.coordinates[1], lng : data.geometry.coordinates[0] };
   from = data.properties.from;
   to = data.properties.to;
   subnode = data.properties.subnode;
  
   var centerPosition = [];
   obj = {
    id : id, loc : loc, from : from, to : to, 
    type : type, subnode : subnode, code : code ,pos : [],
    rccIdx : data.properties.id.toString().slice(11,13)
  };   
   if(groupMap.has(code))
   {
    groupMap.get(code).pos.push(loc);
    }else{
      
      obj.pos.push(loc);
      groupMap.set(code, obj);
    }    
    
  })
 return groupMap;
}