function runFlowAnimation(map, flowInto, locMap){
  var latlngs = [];
		var latlng = [];
    var flow, d;
    var iconHtml;
    // var arrowIcon = L.divIcon({
    //   html : `<img class='arrowIcon' src='/images/arrow_16.png' style='transfrom:rotate("30deg"); width : 100%; height:100%'/>` 
    // });   
		
		for(var i=0; i < flowInto.length; i++)
		{
			d = flowInto[i];
			latlng = [];
      latlngs=[]; 
      var a,b;
      var polyline ;
      if(flowInto[i].value > 0){
        latlngs.push([locMap.get(d.from).lat, locMap.get(d.from).lng]);
        latlngs.push([locMap.get(d.to).lat, locMap.get(d.to).lng]);
				
			}else{
        latlngs.push([locMap.get(d.to).lat, locMap.get(d.to).lng]);
        latlngs.push([locMap.get(d.from).lat, locMap.get(d.from).lng]);        
      }
      polyline = L.polyline([latlngs[0], latlngs[1]], {color: "red", weight: 3, className : 'flowArrow'}).addTo(map); 
      a = map.latLngToLayerPoint(latlngs[0]);
      b = map.latLngToLayerPoint(latlngs[1]);
      var rotate = 'rotate('+arrowAngle(a, b)+'deg)';
      iconHtml = '<img class="arrowIcon'+i+'" src="/images/arrow_16.png" style="transform:'+rotate+'; width : 150%; height:150%"/>';
      var arrowIcon = L.divIcon({
        html : iconHtml
      });  
      
    //   $(this).css({
    //     '-webkit-transform': rotate,
    //     '-moz-transform': rotate,
    //     '-o-transform': rotate,
    //     '-ms-transform': rotate,
    //     'transform': rotate
    // });

      var myMovingMarker = L.Marker.movingMarker(polyline.getLatLngs(), [3500],
        {
            loop : true,
            icon : arrowIcon, 
        }).addTo(map);
      myMovingMarker.start();
      // $(myMovingMarker._icon).css('-webit-transform','rotate('+arrowAngle(a,b)+'deg)')
      // $(myMovingMarker._icon).css('-o-transform','rotate('+arrowAngle(a,b)+'deg)')
      // $(myMovingMarker._icon).css('transform','rotate('+arrowAngle(a,b)+'deg)')
      console.log(arrowAngle(a,b));

      // animatedMarker = L.AnimatedMarker(polyline.getLatLngs());
      //   map.addLayer(animatedMarker);

      // var animatedMarker = L.animatedMarker(polyline.getLatLngs(), {
      //   // distance: 300,  // meters
      //   interval: 2000, // milliseconds
      // });
      // map.addLayer(animatedMarker);
    }
  
}

var arrowAngle = function arrowAngle(a, b) {
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI + 90 + 360) % 360 -90;
};