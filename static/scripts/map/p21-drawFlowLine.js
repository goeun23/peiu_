function drawLine (map, flowInto, locMap)
	{
		var latlngs = [];
		var latlng = [];
		var flow, d;
		
		for(var i=0; i < flowInto.length; i++)
		{
			d = flowInto[i];
			latlng = [];
			latlngs=[]; 
			var polyline ;
			if(flowInto[i].value > 0){
				polyline = L.polyline([[locMap.get(d.from).lat, locMap.get(d.from).lng],
															[locMap.get(d.to).lat, locMap.get(d.to).lng]], {color: "red", weight: 3, className : 'flowArrow'}).addTo(map); 
			}else{
				polyline = L.polyline([[locMap.get(d.to).lat, locMap.get(d.to).lng],
															[locMap.get(d.from).lat, locMap.get(d.from).lng]], {color: "blue", weight: 3, className : 'flowArrow'}).addTo(map); 
			}
			polyline.setText(flowInto[i].value.toString(), {offset: -20, orientation : -15, attributes: {fill: 'green', 'font-size': '24'}});
			
			var arrowHead = L.polylineDecorator(polyline, {
					patterns: [
							{offset: '5%', repeat: '30%', symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: true,   pathOptions: {stroke: true, color : 'red', fillOpacity:1}})}
					]
			}).addTo(map); 

				$('.flowArrow').siblings().attr("data-arrow", "arrow"); 
		}
	} 

	
	function drawArcLine (map, flowInto, locMap)
	{
		var latlngs = [];
		var latlng = [];
		var flow, d;
		
		for(var i=0; i < flowInto.length; i++)
		{
			d = flowInto[i];
			latlng = [];
			latlngs=[]; 
			var polyline ;
			var from = {lat : 0, lng : 0}, to = {lat : 0 , lng : 0};
			if(flowInto[i].value > 0){
				from.lat = locMap.get(d.from).lat;
				from.lng = locMap.get(d.from).lng;
				to.lat = locMap.get(d.to).lat;
				to.lng  =locMap.get(d.to).lng;
				// console.log(i+', '+from +', '+ to)
				_drawArc(map, from.lat, from.lng, to.lat, to.lng, i);
				// polyline = L.Polyline.Arc(from, to, 
				// 						{color: "red", weight: 3, className : 'flowArrow', vertices:200, offset:30})
				// 						.addTo(map); 
			}else{
				from.lat = locMap.get(d.from).lat;
				from.lng = locMap.get(d.from).lng;
				to.lat = locMap.get(d.to).lat;
				to.lng  =locMap.get(d.to).lng;
				_drawArc(map, from.lat, from.lng, to.lat, to.lng, i);
				// polyline = L.Polyline.Arc(to, from, 
				// 							{color: "blue", weight: 3, className : 'flowArrow', vertices:2, offset:30})
				// 							.addTo(map); 
			}
			// polyline.setText(flowInto[i].value.toString(), {offset: -20, orientation : -15, attributes: {fill: 'green', 'font-size': '24'}});
			
			// var arrowHead = L.polylineDecorator(polyline, {
			// 		patterns: [
			// 				{offset: '5%', repeat: '30%', symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: true,   pathOptions: {stroke: true, color : 'red', fillOpacity:1}})}
			// 		]
			// }).addTo(map); 

				$('.flowArrow').siblings().attr("data-arrow", "arrow"); 
		}
	} 

function _drawArc(map, fromLat, fromLng, toLat, toLng, i)
{
	var latlngs =[];
	var latlng1 = [fromLat, fromLng];
	var latlng2 = [toLat, toLng];
	var offsetX = latlng2[1] - latlng1[1],
		offsetY = latlng2[0] - latlng1[0];

	
// Scales the animation duration so that it's related to the line length
// (but such that the longest and shortest lines' durations are not too different).
	// You may want to use a different scaling factor.
	
	var r = Math.sqrt( Math.pow(offsetX, 2) + Math.pow(offsetY, 2) ),
		theta = Math.atan2(offsetY, offsetX);

		var durationBase = 2000;
		var duration = Math.sqrt(Math.log(r)) * durationBase;

	var thetaOffset = (3.14/10);

	var r2 = (r/2)/(Math.cos(thetaOffset)),
		theta2 = theta + thetaOffset;

	var midpointX = (r2 * Math.cos(theta2)) + latlng1[1],
		midpointY = (r2 * Math.sin(theta2)) + latlng1[0];

	var midpointLatLng = [midpointY, midpointX];

	latlngs.push(latlng1, midpointLatLng, latlng2);

	var pathOptions = {
		// color: 'rgba(255,255,255,0.5)',
		color : '#666464',
		weight: 2,
		// className : 'flowArrow',
		// dashArray: 3, 
		animate: {
			duration: 3000, 
			iterations: Infinity,
			easing: 'ease-in-out',
			direction: 'normal'
		}
	}	
	var path = [];
	path.push('M',latlng1)
	path.push('Q',midpointLatLng)
	path.push(latlng2)

	var _curveLine = L.curve(
		path, pathOptions).addTo(map);

		_curveLineList.push(_curveLine);

		// setInterval(function(data){
		// 	var _curveLine = L.curve(
		// 		path, pathOptions).addTo(map);
		// },4000)

		/////////////////////////////////////moving icon
		////////////////////////////////////#1
		// var a = map.latLngToLayerPoint(latlng1);
		// var b = map.latLngToLayerPoint(latlng2);
		// var curveTempPath = [];
		// var rotate = 'rotate('+arrowAngle(a, b)+'deg)';
		// iconHtml = '<img class="arrowIcon'+i+'" src="/images/arrow_16.png" style="transform:'+rotate+'; width : 150%; height:150%"/>';
		// var arrowIcon = L.divIcon({
		//   html : iconHtml
		// }); 
		// var movingPath  = [];
		// movingPath.push(latlng1);
		// movingPath.push(midpointLatLng);
		// movingPath.push(latlng2);
		// polyline = L.polyline(movingPath, {color: "red", weight: 3, 
		// 				className : 'flowArrow',
		// 				smoothFactor: 10}).addTo(map); 

		// var myMovingMarker = L.Marker.movingMarker(movingPath, [3500],
		//   {
		//       loop : true,
		//       icon : arrowIcon, 
		//   }).addTo(map);
		// myMovingMarker.start();
		////////////////////////////////////moving icon
		//////////////////////////////#2\
			
}
let _flowLayer;
let _curveLineList = [];

function deleteCurveLine(map)
{
	if(_curveLineList.length > 0){
		_curveLineList.forEach(function(layer){
			map.removeLayer(layer);
		})
	}	
	console.log('remove curve line')
}

var arrowAngle = function arrowAngle(a, b) {
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI + 90 + 360) % 360 -90;
};


let _bezierLayer;

function drawFlowIcon(map, flowInto, locMap)
{
	
	var path = [];
	var dash_straight = {
		color: 'red',
		fillColor: 'red',
		dashArray: 8,
		opacity: 0.8,
		weight: '1',
	};
	var d;
	var from = {lat : 0, lng : 0}, to = {lat : 0 , lng : 0};
	for(var i=0; i < flowInto.length; i++)
	{
		var temp =[];
		path = [];
		d = flowInto[i];
		if(flowInto[i].value > 0){
			from.lat = locMap.get(d.from).lat;
			from.lng = locMap.get(d.from).lng;
			to.lat = locMap.get(d.to).lat;
			to.lng  =locMap.get(d.to).lng;
		}
		else{
			from.lat = locMap.get(d.from).lat;
			from.lng = locMap.get(d.from).lng;
			to.lat = locMap.get(d.to).lat;
			to.lng  =locMap.get(d.to).lng;
		}
		temp.push(from);
		temp.push(to);
		path.push(temp);
		_bezierLayer = L.bezier({
			path: path,
			icon: {
					path: "/images/plane.png"
			}
		}, dash_straight);
		_bezierLayer.addTo(map); 
	}
	var tempPath =[path];
	console.log(path);
	// _bezierLayer = L.bezier({
	// 	path: path,
	// 	icon: {
	// 			path: "/images/plane.png"
	// 	}
	// }, dash_straight);
	// _bezierLayer.addTo(map);
}

function deleteFlowIcon(map){
	if(_bezierLayer != undefined){
		map.removeLayer(_bezierLayer);
	}
	console.log('remove curve animation layer')
}