<template>
<div class="graphArea_wrap">
								<div class="graphArea">
									<div class="areaSel">
										<ul class="areaSel_lst">
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 서울</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 남서울</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 경기</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 경기북부</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 인천</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 강원</a></li>
										<li><a href="#" class="active"><i class="xi-check" aria-hidden="true"></i> 대전/충청</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 충북</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 경북</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 전북</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 광주/전남</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 대구</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 경남</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 부산/울산</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 제주</a></li>
										</ul>
									</div>

									<div id="map" class="mapSel">지도영역</div>

									<div class="localSel">
										<strong>대전/충청</strong>
										<ul class="localSel_lst">
										<li><a href="#" class="active"><i class="xi-check" aria-hidden="true"></i> 유성구</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 중구</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 서구</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 동구</a></li>
										<li><a href="#"><i class="xi-check" aria-hidden="true"></i> 대덕구</a></li>
										</ul>
									</div>
								</div>
							</div>
						
  <!-- <div class="mapDiv">
    <div id="map">
       
    </div>
  </div> -->
</template>

<script>
  let zoomLvL = 7;
  let map;
  let array = [];
  var route;
  let markerList = [];
  let markerlist2 = [];

  export default {
    layout: 'dashboardMap',
    head: {
      link: [{
          rel: "stylesheet",
          href: "/css/map.css"
        }, 
        {
          rel: "stylesheet",
          href: "https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css"
        }, {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.css"
        }, {
          rel: 'stylesheet',
          href: '/css/e-chart.css'
        }, {
          rel: 'stylesheet',
          href: '/css/mapChart.css'
        }
      ],
      script: [{
        src: "https://unpkg.com/leaflet@1.3.1/dist/leaflet.js",
        integrity: "sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw==",
        crossorigin: ""
      }, {
        src: "https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"
      }, {
        src: "/scripts/my-ol.map.js"
      }, {
        src: "/scripts/leaflet-svg-shape-marker.min.js"
      }, {
        src: "/scripts/leaflet.polylineDecorator.js"
      }, {
        src: "/scripts/leaflet.bezier.js"
      }, {
        src: "/scripts/plugins/leaflet.migrationlayer.js"
      }, {
        src: "https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.js"
      }, {
        src: "/scripts/leaflet.control.custom.js"
      }, {
        src: '/scripts/contropPanel/my-control.js'
      }, {
        src: '/scripts/leaflet-choropleth.js'
      }, {
        src: '/scripts/dashboard-chart.js'
      }, {
        // src: '/scripts/charts/echart.js'
        src: '/scripts/charts/echarts-all-english-v2.js'
      }, { src: 'http://d3js.org/d3.v3.min.js' },
      {src : '/scripts/plugins/leaflet.textpath.js'},
      // {src : '/scripts/plugins/leaflet-distance-marker.js'},
      {src : '/scripts/plugins/leaflet.geometryutil.js'}   ,
      {src : '/scripts/map/leaflet.edgeMarker.js'},
      {
         src : 'https://cdnjs.cloudflare.com/ajax/libs/d3/5.5.0/d3.min.js'
      }
      ]
    },
    mounted() {
      var centerLatLng = mLib.getKoreaLatLng();
      var pList = mLib.getMarketP();
      map = L.map('map', {
          // zoomControl: false,
          minZoom: 2,
           maxZoom: 19,
        //   scrollWheelZoom: true,
        //   worldCopyJump : true
        })
        // .setView([centerLatLng.lat, centerLatLng.lng], zoomLvL);
        .setView([36.389505739558835,129.06858444213867], zoomLvL);

      // var mapcUrl = 'http://tiles.mapc.org/basemap/{z}/{x}/{y}.png';
      // var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png';
      var wikiUrl = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png';
      // var openstreetUrl = 'https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png';
      var cartodbUrl = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png'
      var hyddaUrl = 'https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png';
      // var mabBox = 'https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

      L.tileLayer(cartodbUrl, {
        // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">POwer21</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        // subdomains: 'abcd', 
      }).addTo(map);
      map.setZoom(8
      );

      // map.on('contextmenu', oncontextmenu)
      var fromLat, fromLng
      var toLat, toLng;

      /**dashboard chart */
      // drawChart('loadChart')
      // drawBarChart('socChart')
      // // drawLoadChart('loadChart')
      // // setChart1();
      // drawFRChart('loadChart1')
      // drawDRChart('drStatus')
      // drawFRChart('right-btn-content')
      // //routing(map, array);
      // //draw 
      //  init_migration(map, array);
      // console.log('request API')
      // restApi1()


      
      //chartMarker(map)//pieChart  + bar Chart
      // AjaxTest();
      // var _redis = require("redis");
      // initRedis();
      showStatus(map);
      map.on('zoomend', function(e){
        ////console.log('zoom = ' + map.getZoom())
         initMapLayer(map);
         showStatus(map);
         
      }); 
    //  var redis = require("redis");
    //   var client = redis.createClient();
      // map.on('movestart',function(e){
            
      // })
      map.on('moveend ', function(e){
        // clearInterval(myTimer);
            shownMarkers = [];
        var markers =  containedMarker(map);

              
        // myTimer = setInterval(function(){
        //   for(var i=0; i< shownMarkers.length; i++){
        //     var dID = shownMarkers[i];
        //       AjaxTest(dID);
        //   } 
        // }, 5000)
        // //console.log('contained markers : '+markers.length)
      });


      ///////////////////////////timer///////////////
      //  ctrlShowTimer = setTimeout(function(){            
      //      testCtrlShow(map); 
      //     },5000)
      // setTimeout(function(){
      //     clearTimeout(ctrlShowTimer);
      //     ctrlShowTimer = 0;
      //     if(migrationLayer != null){
      //        migrationLayer.destroy();
      //     }  
      //      offLineMode(map);
      // },60000)



      //  var edgeMarkerLayer = L.edgeMarker({
      //    icon : L.icon({
      //      iconUrl : '/images/edge-arrow-marker.png',
      //      clicable : true,
      //      iconSize : [48, 48],
      //      iconAnchor : [24, 24]
      //    }
      //    )
      //   }).addTo(map);      
    }
  } 
  let ctrlShowTimer;
  function testCtrlShow(map){
    var myData = [];
    var from = {lat : currentAllMarkers[0].getLatLng().lat, lng : currentAllMarkers[0].getLatLng().lng};
    var toList = [];
    for(var i = 1; i < currentAllMarkers.length; i++){
      myData.push(
        {
          from : [from.lng, from.lat], 
          to : [currentAllMarkers[i].getLatLng().lng, currentAllMarkers[i].getLatLng().lat],
          labels : [null, "Miami"],
          color : getColor()
        }
      )
    }         
    
    migrationLayer = new L.migrationLayer({
      map: map,
      data: myData,
      pulseRadius: 50,
      pulseBorderWidth: 50,
      arcWidth: 3,
      arcLabel: true,
      arcLabelFont: '10px sans-serif',
    });
    migrationLayer.addTo(map);
    migrationLayer.show();

    onLineMode(map);
  }
  let migrationLayer;
   let currentAllMarkers = [];
   let shownMarkers = [];
   let myTimer;
   let isPlay = false;

  function initMapLayer(map){
      map.eachLayer(function (layer) {
           if(layer instanceof L.Marker || layer instanceof L.Circle || layer instanceof L.Polyline)
            {map.removeLayer(layer);}
        });
  }

  function onLineMode(map){
     var contained = [];
       map.eachLayer(function (layer){
          if( layer instanceof L.Polyline){
            contained.push(layer);
            d3.select(layer._path).transition().duration(350).attr('opacity', '0.3')
          }
        })
      return contained;      
  }

   function offLineMode(map){
     var contained = [];
       map.eachLayer(function (layer){
          if( layer instanceof L.Polyline){
            contained.push(layer);
            d3.select(layer._path).transition().duration(350).attr('opacity', '0.9')
          }
        })
      return contained;      
  }

  function containedMarker(map){
    var contained = [];
    currentAllMarkers = [];
    
    map.eachLayer(function (layer){
          if(layer instanceof L.Marker && map.getBounds().contains(layer.getLatLng())){
            if(typeof layer._mid != 'undefined'){
               contained.push(layer);
               ////console.log('id = '+ layer._mid);
               
                shownMarkers.push(layer._mid);
                currentAllMarkers.push(layer);
              }

             
               //v : 'val_V_' + layer._mid
               //i : 'val_I_' + layer._mid
               //'gen-mnt-' + layer._mid
               //'gen-soc-' + layer._mid
               //'gen-evt-' + layer._mid
               //'type1-total-gen'+layer._mid
               //'type1-avg-soc'+layer._mid
               //'type1-total-evt-cnt' + layer._mid
          }else if(layer instanceof L.Circle && map.getBounds().contains(layer.getLatLng())){
            //  contained.push(layer);
          }
        })
      return contained;      
  }
  function AjaxTest(id){
    var url = 'http://192.168.0.87:3001/redis/bsc.measure.ess.ai&'+id;
    ////console.log('request url : '+ url);
      $.ajax({
          url:url,
            type:'get', 
            success:function(data){
               ////console.log(data);
               if(data != null || typeof data != undefined || data != ""){               
               data = JSON.parse(data);
               var valID = 'val_V_'+id;
               $('#gen-soc-'+id).text(data.measure.soc.toFixed(2));
               //val_V_4775032000_a2
              $('#'+valID).text(data.measure.voltage.toFixed(2));
              }
            }
        })
  }
   
import * as mLib from '~/assets/gMap'
// import * as dataApi from '~/assets/dataApi'
</script>

<style scoped>
@media screen and (min-width: 1920px) and (max-width: 3840px){
  .mapDiv {
    width: 100%;
    height: 1810px;
    background-color: blueviolet;
    border: 1px solid wheat;

    display: inline-block;
    float: right;
  } 
  #map {
    width: 100%;
    height: 1810px;    
    background-color: black;
  }
}
@media screen and (max-width: 1920px){
.mapDiv {
    width: 100%;
    height: 810px;
    background-color: burlywood;
    border: 1px solid wheat;

    display: inline-block;
    float: right;
  }
  #map {    
    width: 100%;
    height: 810px;
    background-color: black;
  }
} 




.btnStyle {
    cursor:pointer;
    border-radius: 15px;
background-color: #4D90FE; 
background-image: -moz-linear-gradient(center top , #4D90FE, #4787ED); 
border: 1px solid #3079ED; 
color: #FFFFFF;
 padding: 4px;
 margin-top: 4px;
 margin-bottom: 4px;
 width:28%
}

.lblStyle {
color: red;
 padding: 4px;
 margin-top: 4px;
 margin-bottom: 4px;
width: 100%;
font-weight: bold;
}
</style>
