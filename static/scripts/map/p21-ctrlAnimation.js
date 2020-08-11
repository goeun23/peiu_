let _migrationLayer;
let rccColorMap;
function getMirgrationLayer(){
	return _migrationLayer;
}
function HideAnimation()
{
	if(_migrationLayer != null || _migrationLayer != undefined)
				_migrationLayer.hide();
}
let _locMap;
function showFlowLabel(data){
	
}

let _isFlow = false;
function setAniData(map, officeLatLng, to, locMap, fromTo)
{
	
	// var from = {lng : locMap.get(from).lng, lat : locMap.get(from).lat};
	var from = officeLatLng; 
	var rccTo = [];
	var data = [];

	_flowCtrlData = []; 
    _getRccColor()
    
    
	var start; var end;
	for(var i=0; i < to.length; i++)
	{
		
		//var _color = getRandomColor();
        //var _color = setRccColor(to[i]);
        var _color = setRccColor(to[i].rcc);
        
        if(to[i].status == 'chg'){
            //rcc -> office
            start = [locMap.get(to[i].rcc).lng, locMap.get(to[i].rcc).lat] 
            end = [from.lng, from.lat]
        }else{
            // office -> rcc
            start = [from.lng, from.lat]
            end = [locMap.get(to[i].rcc).lng, locMap.get(to[i].rcc).lat]
        }

        // rccTo.push({lng : locMap.get(to[i].lng, locMap.get(to[i]).lat)});
        data.push({
			from : start, 
			to : end, 
			color : _color
        }); 
        
		// data.push({
		// 	from : [from.lng, from.lat], 
		// 	to : [locMap.get(to[i]).lng, locMap.get(to[i]).lat], 
		// 	color : _color
		// }); 
		
	}
	
	// _isFlow = !_isFlow;
	_isFlow = false;
	// console.log(_isFlow);
	if(_isFlow == true){						 
		_locMap = locMap;
			$.ajax({
				url : 'http://192.168.0.92:4000/api/ESS/loadflowresult',
				type : 'get',
				success :  function(data){
					console.log(data.loadflow[0].high_voltage_count);
					var _latlng;
					var _high_voltage_count;
					var _low_voltage_count;
					var _id;
					for(var _i =0; _i < data.loadflow.length; _i++)
					{
						_id = 'rcc'+data.loadflow[_i].rcc;
						_latlng = _locMap.get(_id);
						_high_voltage_count = data.loadflow[_i].high_voltage_count;
						_low_voltage_count = data.loadflow[_i].low_voltage_count;
						var	infoDiv = setVoltageLabel('rcc-volCnt-'+_i, _high_voltage_count, _low_voltage_count);
						var divIcon = L.divIcon({
							className : 'voltage-cnt',
							html : infoDiv.innerHTML,
							iconSize : [280, 50],
							iconAnchor : [-30, 20]
						})
						var m = L.marker(_latlng, {
							icon : divIcon,
							draggable : false
						}).addTo(map);
						flowInfoMarker.push(m);
					} 
				},
				error : function(data){
					console.log()
				}
			});

			var flowInto = changeTmp1(fromTo);
			var from1;
			for(var i=0; i < flowInto.length; i++)
			{
				d = flowInto[i];
				if(flowInto[i].value > 0)
				{
					from.lat = locMap.get(d.from).lat;
					from.lng = locMap.get(d.from).lng;
					to.lat = locMap.get(d.to).lat;
					to.lng  =locMap.get(d.to).lng;
					data.push({from : [from.lng, from.lat], to : [to.lng, to.lat], color : '#ff3a31'})
				}
				else
				{
					from.lat = locMap.get(d.to).lat;
					from.lng = locMap.get(d.to).lng;
					to.lat = locMap.get(d.from).lat;
					to.lng  =locMap.get(d.from).lng;
					data.push({from : [from.lng, from.lat], to : [to.lng, to.lat], color : '#ff3a31'})
				}
			} 
	}else
	{
		clearFlowAni(map);
	}
	
	_migrationLayer.setData(data); 
	
	_migrationLayer.show();
}
function clearFlowAni(map)
{
	for(var _i =0; _i < flowInfoMarker.length; _i++)
	{
		map.removeLayer(flowInfoMarker[_i]);
	}
	flowInfoMarker = [];
}

function changeTmp1(fromTo){
	// var randomCnt = getRandomInt(1, 5);
	var randomCnt = fromTo.length-1;
	var idx = 0;
	var randomList = [];
	var flowInfo = [];
	while(randomList.length < randomCnt)
	{
		// var num = getRandomInt(0, fromTo.length);
		// if(randomList.indexOf(num) == -1 )
		// 	randomList.push(num);
		randomList.push(idx++);
	}
	for(var i=0; i < randomList.length; i++)
	{
		var fromToInfo = fromTo[randomList[i]];
		flowInfo.push({from : fromToInfo.from, to : fromToInfo.to, value : fromToInfo.value});
	} 
	// flowInfo = [];
	// flowInfo.push({from : this.fromTo[3].from, to : this.fromTo[3].to, value : this.fromTo[3].value})
	return flowInfo;
}	
//function getFlowStatus(statUrl, koreaMap, officeLatLng, markerLocMap, fromTo, aniMap)
function getFlowStatus(koreaMap, officeLatLng, markerLocMap, fromTo, aniMap)
{
	var to = [];
	var status = "";
	aniMap.forEach((v,k)=>{
		
		if(k !=16){
            
            if(v < -1 || v > 0){
                if(v > 0) {
                
                    status = "dcg"
                }else if(v < -1){
                    status = "chg"
                }

                to.push({
                    rcc : 'rcc' + k, 
                    status : status
                })
            }
			// //***************(rcc16제외) 제주지역 애니메이션 삭제 ***********
			// if(v < -1 || v > 0){
			// 	to.push('rcc'+k)
			// }
		}
	})
	setAniData(koreaMap, officeLatLng, to, markerLocMap, fromTo);
	
	// 경제성 분석 애니
	//var flowInto = changeTmp1(fromTo); 
	
	// setFlowAniData(koreaMap, flowInto, markerLocMap); 

	// var url = statUrl;
	// $.ajax({
	// 	url : url,
	// 	type : 'get',
	// 	success : function(data){
	// 		// if( (data[0].sum_activepower === 0) &&
	// 		// (data[1].sum_activepower === 0) &&
	// 		// (data[2].sum_activepower === 0) &&
	// 		// (data[3].sum_activepower === 0) &&
	// 		// (data[4].sum_activepower === 0) &&
	// 		// (data[5].sum_activepower === 0) &&
	// 		// (data[6].sum_activepower === 0) &&
	// 		// (data[7].sum_activepower === 0) &&
	// 		// (data[8].sum_activepower === 0) &&
	// 		// (data[9].sum_activepower === 0) &&
	// 		// (data[10].sum_activepower === 0) &&
	// 		// (data[11].sum_activepower === 0) &&
	// 		// (data[12].sum_activepower === 0) &&
	// 		// (data[13].sum_activepower === 0) &&
	// 		// (data[14].sum_activepower === 0) 
	// 		// 	)
	// 		// {
	// 		// 	//조류계산 애니

	// 		// 	getFlowData(koreaMap, markerLocMap);
	// 		// }else
	// 		{
	// 			var to=[];
	// 			//제어 애니
	// 			// var flowInto = changeTmp(fromTo);
				
	// 			// var randomToIdx = parseInt(getRandomArbitrary(1, markerLocMap.size));
	// 			// var randomToCnt = getRandomInt(1, 4);
	// 			// var to = [];
	// 			// for(var i=0; i < randomToIdx; i++)
	// 			// {
	// 			// 	to.push('rcc'+getRandomInt(1, randomToIdx)); 
	// 			// }
	// 			// console.log('wew')
	// 			// if(data[0].fr_service_active !== 0 || data[0].dr_service_active !== 0
	// 			// 	|| data[0].peakcut_service_active !== 0 || data[0].schedule_service_active !== 0)
	// 			// {
	// 			// 	to.push('rcc1')
	// 			// }
	// 			//  if(data[1].sum_activepower !== 0)
	// 			// if(data[1].fr_service_active !== 0 || data[1].dr_service_active !== 0
	// 			// 	|| data[1].peakcut_service_active !== 0 || data[1].schedule_service_active !== 0)
	// 			// {
	// 			// 	to.push('rcc2')
	// 			// }
	// 			//  if(data[2].fr_service_active !== 0 || data[2].dr_service_active !== 0
	// 			// 	|| data[2].peakcut_service_active !== 0 || data[2].schedule_service_active !== 0)
	// 			// {
	// 			// 	to.push('rcc3')
	// 			// }
	// 			if(data[3].fr_service_active !== 0 || data[3].dr_service_active !== 0
	// 				|| data[3].peakcut_service_active !== 0 || data[3].schedule_service_active !== 0)
	// 			{
	// 				to.push('rcc4')
	// 			}
	// 			//  if(data[4].sum_activepower !== 0)
	// 			// if(data[4].fr_service_active !== 0 || data[4].dr_service_active !== 0
	// 			// 	|| data[4].peakcut_service_active !== 0 || data[4].schedule_service_active !== 0)
	// 			// {
	// 			// 	to.push('rcc5')
	// 			// }
	// 			//  if(data[5].sum_activepower !== 0)
	// 			if(data[5].fr_service_active !== 0 || data[5].dr_service_active !== 0
	// 				|| data[5].peakcut_service_active !== 0 || data[5].schedule_service_active !== 0)
	// 			{
	// 				to.push('rcc6')
	// 			}
	// 			//  if(data[6].sum_activepower !== 0)
	// 			if(data[6].fr_service_active !== 0 || data[6].dr_service_active !== 0
	// 				|| data[6].peakcut_service_active !== 0 || data[6].schedule_service_active !== 0)
	// 			{
	// 				to.push('rcc7')
	// 			}
	// 			//  if(data[7].sum_activepower !== 0)
	// 			if(data[7].fr_service_active !== 0 || data[7].dr_service_active !== 0
	// 				|| data[7].peakcut_service_active !== 0 || data[7].schedule_service_active !== 0)
	// 			{
	// 				to.push('rcc8')
	// 			}
	// 			//  if(data[8].sum_activepower !== 0)
	// 			if(data[8].fr_service_active !== 0 || data[8].dr_service_active !== 0
	// 				|| data[8].peakcut_service_active !== 0 || data[8].schedule_service_active !== 0)
	// 			{
	// 				to.push('rcc9')
	// 			}
	// 			//  if(data[9].sum_activepower !== 0)
	// 			if(data[9].fr_service_active !== 0 || data[9].dr_service_active !== 0
	// 				|| data[9].peakcut_service_active !== 0 || data[9].schedule_service_active !== 0)
	// 			{
	// 				to.push('rcc10')
	// 			}
	// 			//  if(data[10].sum_activepower !== 0)
	// 			// if(data[10].fr_service_active !== 0 || data[10].dr_service_active !== 0
	// 			// 	|| data[10].peakcut_service_active !== 0 || data[10].schedule_service_active !== 0)
	// 			// {
	// 			// 	to.push('rcc11')
	// 			// }
	// 			//  if(data[11].sum_activepower !== 0)
	// 			if(data[11].fr_service_active !== 0 || data[11].dr_service_active !== 0
	// 				|| data[11].peakcut_service_active !== 0 || data[11].schedule_service_active !== 0)
	// 			{
	// 				to.push('rcc12')
	// 			}
	// 			if(data[12].fr_service_active !== 0 || data[12].dr_service_active !== 0
	// 				|| data[12].peakcut_service_active !== 0 || data[12].schedule_service_active !== 0)
	// 			{
	// 				to.push('rcc13')
	// 			}
	// 			//  if(data[13].sum_activepower !== 0)
	// 			if(data[13].fr_service_active !== 0 || data[13].dr_service_active !== 0
	// 				|| data[13].peakcut_service_active !== 0 || data[13].schedule_service_active !== 0)
	// 			{
	// 				to.push('rcc14')
	// 			}
	// 			console.log(to)
	// 			setAniData(koreaMap, officeLatLng, to, markerLocMap, fromTo); 
	// 			// setFlowAniData(koreaMap, flowInto, markerLocMap); 
	// 			}
	// 	},
	// 	error : function(data){
	// 		console.log('getFlowStatus error');
	// 	}
	// })
}			
let _flowCtrlData = [];
function setFlowAniData(map, flowInto, locMap)
{
	var d ;
	var data = [];
	var from = {lat : 0, lng : 0}, to = {lat : 0 , lng : 0};
	var infoDiv;
	var m;
	for(var i=0; i < flowInto.length; i++)
	{
		d = flowInto[i];
		if(flowInto[i].value > 0)
		{
			from.lat = locMap.get(d.from).lat;
			from.lng = locMap.get(d.from).lng;
			to.lat = locMap.get(d.to).lat;
			to.lng  =locMap.get(d.to).lng;
			data.push({from : [from.lng, from.lat], to : [to.lng, to.lat], color : '#ff3a31'})
			_flowCtrlData.push({from : [from.lng, from.lat], to : [to.lng, to.lat], color : '#ff3a31'})
		}
		else
		{
			from.lat = locMap.get(d.to).lat;
			from.lng = locMap.get(d.to).lng;
			to.lat = locMap.get(d.from).lat;
			to.lng  =locMap.get(d.from).lng;
			data.push({from : [from.lng, from.lat], to : [to.lng, to.lat], color : '#ff3a31'})
			_flowCtrlData.push({from : [from.lng, from.lat], to : [to.lng, to.lat], color : '#ff3a31'})
		}
		
		// infoDiv = setDivData(map, from.lat, from.lng, i, d.value);
		// var divIcon = L.divIcon({
		// 	className : 'flowData',
		// 	html : infoDiv.innerHTML,
		// 	iconSize : [180, 50],
		// 	iconAnchor : [0, 48]
		// })
		// m = L.marker(to, {
		// 	icon : divIcon,
		// 	draggable : false
		// }).addTo(map);
		// flowInfoMarker.push(m);
	}	
	// _flowCtrlData.concat(data);
	_migrationLayer.setData(_flowCtrlData); 
	_migrationLayer.show();
}

let flowInfoMarker = [];


function initAni(map, from, to, locMap)
{
	if(_migrationLayer != undefined){
		// 마이그레이션 레이어가 계속 쌓이지 않도록 !!!!!!!!!!!!!!!!!!!!!!!!!!
		// 초기화 할때 마이그레이션 레이어가 있으면 삭제해준다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		_migrationLayer.destroy();
	}
	
	// map = koreamap, from = office, to = [], locMap = markerLatLng, 
	// var from = {lng : locMap.get(from).lng, lat : locMap.get(from).lat};
	var from = from;
	var randomIdx = parseInt(getRandomArbitrary(0, locMap.size));
	var data = [];
	var rccTo = [];
	
	for(var i=0; i < to.length; i++)
	{
		// rccTo.push({lng : locMap.get(to[i].lng, locMap.get(to[i]).lat)});
		data.push({from : [from.lng, from.lat], to : [locMap.get(to[i]).lng, locMap.get(to[i]).lat], color : getRandomColor()});
	} 

	_migrationLayer = new L.migrationLayer({
			map: map,
			data: data,
			pulseRadius:2, 
		}
	);
	
	_migrationLayer.addTo(map);
	_migrationLayer.show();
	_migrationLayer.play(); 
}
 
function _getGeoJson(rcc)
{
	var geojson;
	if(rcc =='rcc1')
	{
		geojson = rcc1GeoJson;
	}
	else if(rcc =='rcc2'){
		geojson = rcc2GeoJson;
	}
	else if(rcc =='rcc3'){
		geojson = rcc3GeoJson;
	}
	else if(rcc =='rcc4'){
		geojson = rcc4GeoJson;
	}
	else if(rcc =='rcc5'){
		geojson = rcc5GeoJson;
	}
	else if(rcc =='rcc6'){
		geojson = rcc6GeoJson;
	}
	else if(rcc =='rcc7'){
		geojson = rcc7GeoJson;
	}
	else if(rcc =='rcc9'){
		geojson = rcc8GeoJson;
	}
	else if(rcc =='rcc9'){
		geojson = rcc9GeoJson;
	}
	else if(rcc =='rcc10'){
		geojson = rcc10GeoJson;
	}
	else if(rcc =='rcc11'){
		geojson = rcc11GeoJson;
	}else if(rcc =='rcc12'){
		geojson = rcc12GeoJson;
	}else if(rcc =='rcc13'){
		geojson = rcc13GeoJson;
	}else if(rcc =='rcc14'){
		geojson = rcc14GeoJson;
	}

	return geojson;
}

function setDivData(map, lat, lng, id, value){
  var div = document.createElement('div');
  div.className = 'nodeInfoDiv'; 
  var ul = document.createElement('ul');
	ul.className="marker-value-list";
	
  var li1 = document.createElement('li');
  var span1 = document.createElement('span');
  span1.innerText = "조류계산결과 : "+(value.toFixed(2))+"MW";
  span1.id = "flow-rcc-"+id;
  li1.appendChild(span1); 
  

  ul.appendChild(li1); 
  div.appendChild(ul);
  return div;
}

function setVoltageLabel(id, high_voltage_count, low_voltage_count){
  var div = document.createElement('div'); 
  var ul = document.createElement('ul');
	ul.className="voltage-label-list";
	
	
  var li1 = document.createElement('li');
  var span1 = document.createElement('span');
  span1.innerText = "과전압 개소 : "+high_voltage_count;
  span1.id = "high_voltage_count-"+id;
	li1.appendChild(span1);   
	
	var li2 = document.createElement('li');
  var span2 = document.createElement('span');
  span2.innerText = "저전압 개소 : "+low_voltage_count;
  span2.id = "low_voltage_count-"+id;
  li2.appendChild(span2);   

	ul.appendChild(li1); 
	ul.appendChild(li2); 
  div.appendChild(ul);
  return div;
}
function getFlowData( koreaMap, markerLocMap){
	var _url = 'http://192.168.0.92:4000/api/ESS/loadflowresult';
	$.ajax({
		url : _url,
		type : 'get',
		success : function(data){
			var flowInto = [];
			for(var _i = 0; _i < data.loadflowcurrent.length; _i++)
			{
				flowInto.push({from : 'rcc'+data.loadflowcurrent[_i].from_rcc, 
				to : 'rcc'+data.loadflowcurrent[_i].to_rcc, value: data.loadflowcurrent[_i].PFr});
			}
			setFlowAniData(koreaMap, flowInto, markerLocMap); 
		},
		error : function(data){
			console.log('getFlowData() error')
		}
	})
}

function getRandomArbitrary(min, max) 
{
		return Math.random() * (max - min) + min;
} 

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	
	return color;
}
function _getRccColor(rccId){
	// rcc 마커의 색과 같음 
	rccColorMap = new HashMap();
	rccColorMap.set('rcc1', "#99ED09"); // 경기
	rccColorMap.set('rcc2', "#1BE78A"); // 인천
	rccColorMap.set('rcc3', "#2EAFFF"); // 서울
	rccColorMap.set('rcc4', "#005CEB"); // 대전
	rccColorMap.set('rcc5', "#0A14AF"); // 충남
	rccColorMap.set('rcc6', "#6200C6"); // 전북
	rccColorMap.set('rcc7', "#A623FF"); // 전남
	rccColorMap.set('rcc8', "#C261FF"); // 광주
	rccColorMap.set('rcc9', "#FFFF00"); // 강원
	rccColorMap.set('rcc10', "#FF8C15"); // 충북
	rccColorMap.set('rcc11', "#FF5104"); // 경북
	rccColorMap.set('rcc12', "#B42400"); // 대구
	rccColorMap.set('rcc13', "#8F0101"); // 울산
	rccColorMap.set('rcc14', "#FF7EFA"); // 부산
	rccColorMap.set('rcc15', "#FF12DB"); // 경남
	rccColorMap.set('rcc16', "#D300A1"); // 제주

	
}

function setRccColor(rccId){
	var color = rccColorMap.get(rccId);
	return color;
}


 