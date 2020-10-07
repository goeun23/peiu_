<template>
  <div class="cont_body" id = "body">
	  
	</div>
</template>
<script>
	// import { cube } from '~/assets/my-module';
	
	// import locData from '~/scripts/data/markerLocInfo';
	
  export default {
    layout: "index",
		
		head : 
		{
      	link : [ 
		  //rel='stylesheet' type='text/css' href='../css/common.css'
	  	] ,
		script :[
			// {
			// 	src: "https://unpkg.com/leaflet@1.3.1/dist/leaflet.js",
			// 	integrity: "sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw==",
			// 	crossorigin: ""
			// },
			{	src : "/scripts/map/leaflet.migrationLayer.js"	},	
			

		]
		},
		methods:{
			initMaker(map,  locData)
			{
				var code;
				var markerGroup;
				var rccMap = new HashMap();
				var id, loc, obj;
				this.markerGroup = getMarkerGroup(map, locData);
				this.drawRccMarker(map, this.markerGroup)
			},
			drawRccMarker(map, markerGroup)
			{
				var markerImgMap = this.initMarkerImg();
				var loc;
				var markerIcon;
				var markerIdx;
				// this.markerLoc  = [];
				var locArray;
				this.markerLocMap = new HashMap(); 
				// for(var i=0; i < markerGroup.keys().length; i++)
				// {
				// 	locArray  = markerGroup.get(markerGroup.keys()[i]);
				// 	loc = L.latLngBounds(locArray).getCenter();
				// 	console.log(i + ", lat : " + loc.lat + ", lng : " + loc.lng);
				// 	this.markerLoc.push(loc);
				// 	markerIdx = 'mImg'+(i+1);
				// 	this.markerLocMap.set('rcc'+(i+1),loc);
				// 	markerIcon = markerImgMap.get(markerIdx);
				//   L.marker(loc, {icon : markerIcon}).addTo(map);  
				// }  
				var markerLocHashMap = this.initMarkerLoc();
				for(var i=0; i < markerLocHashMap.keys().length; i++){
					markerIdx = 'mImg' + (i+1);
					markerIcon = markerImgMap.get(markerIdx);
					loc = markerLocHashMap.get(i);
						this.markerLocMap.set('rcc'+(i+1),loc);
					L.marker(loc, {icon : markerIcon}).addTo(map);
				}

				var officeIcon = L.icon({iconUrl : '/images/building.png', iconSize : [20, 20]});
				L.marker(this.officeLatLng, {icon : officeIcon}).addTo(map);
			},
			initMarkerImg()
			{
				var markerImgMap = new HashMap();
					markerImgMap.set('mImg1', L.icon({ iconUrl: '/images/map/m1.png', iconSize:  [37, 48],	}));
					markerImgMap.set('mImg2', L.icon({ iconUrl: '/images/map/m2.png', iconSize:  [37, 48],	}));
					markerImgMap.set('mImg3', L.icon({ iconUrl: '/images/map/m3.png', iconSize:  [37, 48],	}));
					markerImgMap.set('mImg4', L.icon({ iconUrl: '/images/map/m4.png', iconSize:  [37, 48],	}));
					markerImgMap.set('mImg5', L.icon({ iconUrl: '/images/map/m5.png', iconSize:  [37, 48],	}));
					markerImgMap.set('mImg6', L.icon({ iconUrl: '/images/map/m6.png', iconSize:  [37, 48],	}));
					markerImgMap.set('mImg7', L.icon({ iconUrl: '/images/map/m7.png', iconSize:  [37, 48],	}));
					markerImgMap.set('mImg8', L.icon({ iconUrl: '/images/map/m8.png', iconSize:  [37, 48],	}));
					markerImgMap.set('mImg9', L.icon({ iconUrl: '/images/map/m9.png', iconSize:  [37, 48],	}));
					markerImgMap.set('mImg10', L.icon({ iconUrl: '/images/map/m10.png', iconSize:  [37, 48],	}));
					markerImgMap.set('mImg11', L.icon({ iconUrl: '/images/map/m11.png', iconSize:  [37, 48],	}));
					markerImgMap.set('mImg12', L.icon({ iconUrl: '/images/map/m12.png', iconSize:  [37, 48],	}));
					markerImgMap.set('mImg13', L.icon({ iconUrl: '/images/map/m13.png', iconSize:  [37, 48],	}));
					markerImgMap.set('mImg14', L.icon({ iconUrl: '/images/map/m14.png', iconSize:  [37, 48]	}));
					// markerImgMap.set('mImg15', L.icon({ iconUrl: '/images/map/m15.png', iconSize:  [25, 41],	}));
				return markerImgMap;
			},
			initMarkerLoc(){
				var markerLoc = new HashMap();
				markerLoc.set(0, {lat: 37.591169, lng : 126.981261});//서울
				markerLoc.set(1, {lat: 37.44641786318253, lng : 127.13540364266785});//남서울
				markerLoc.set(2, {lat: 37.47258209654341, lng : 126.45991221747337});//인천
				markerLoc.set(3, {lat: 37.162385770353495, lng : 126.83884643160687 });//경기
				markerLoc.set(4, {lat : 37.9636294182446, lng : 126.90474803406487});//경기북부
				markerLoc.set(5, {lat : 37.62818198386735, lng : 128.89443397521973});
				markerLoc.set(6, {lat : 36.58885351698976, lng : 126.95821166038515});
				markerLoc.set(7, {lat : 36.72473031116381, lng : 127.83198952674866});
				markerLoc.set(8, {lat : 35.02451264407351, lng : 127.31542825698853});
				markerLoc.set(9, {lat : 35.71046060286918, lng : 127.1841824054718});
				markerLoc.set(10, {lat : 35.85920854499696, lng : 128.62467885017395});
				markerLoc.set(11, {lat : 35.32428811283104, lng : 129.19279217720032});
				markerLoc.set(12, {lat : 35.21695664169799, lng : 128.60976576805115});
				markerLoc.set(13, {lat : 36.52669712203727, lng : 128.67660641670227});
				return markerLoc;  
			},
			changeTmp(fromTo)
			{
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
			},
			
		},
		data(){
			return {
				map : null,
				markerGroup : null,
				markerImgMap : null,
				markerLoc : [],
				markerLocMap:null,
				markerLink : null,
				officeLatLng : {lat : 36.351719, lng : 127.398300	},
				fromTo : [{"from":"rcc1","to":"rcc2","value":19},{"from":"rcc3","to":"rcc2","value":19},{"from":"rcc3","to":"rcc4","value":19},{"from":"rcc4","to":"rcc2","value":19},{"from":"rcc4","to":"rcc5","value":19},{"from":"rcc4","to":"rcc8","value":19},{"from":"rcc5","to":"rcc1","value":19},{"from":"rcc5","to":"rcc2","value":19},{"from":"rcc5","to":"rcc3","value":19},{"from":"rcc6","to":"rcc4","value":19},{"from":"rcc6","to":"rcc5","value":19},{"from":"rcc6","to":"rcc8","value":19},{"from":"rcc7","to":"rcc4","value":19},{"from":"rcc7","to":"rcc8","value":19},{"from":"rcc7","to":"rcc13","value":19},{"from":"rcc9","to":"rcc10","value":19},{"from":"rcc10","to":"rcc7","value":19},{"from":"rcc10","to":"rcc13","value":19},{"from":"rcc11","to":"rcc12","value":19},{"from":"rcc11","to":"rcc14","value":19},{"from":"rcc13","to":"rcc9","value":19},{"from":"rcc13","to":"rcc11","value":19},{"from":"rcc13","to":"rcc12","value":19},{"from":"rcc14","to":"rcc6","value":19},{"from":"rcc14","to":"rcc8","value":19}],
				markerList : [],
				myInterval : null,
				urlESSStat : process.env.url_ESS_Stat,
				urlESSStat_new : process.env.urlESSStat_new,
				urlLoadFlow : process.env.url_load_flow,
				rccLoc :{},
				locData : null,
			}
		},  
		middleware : 'authenticated',	
		mounted() 
		{
		
			// setTimeout(function(){window.scrollTo(0,1)}, 10);local
			$('.th1').removeClass('active');
			$('#gnav-dashboard').addClass('active');
		
			// this.getStat();
			// setInterval(function(){
			// 	location.reload();
			// },300000)
				var level = 8;
			
			//해상도 떄문에 level 9로 조정			
			if(window.innerWidth > 1920)
			{
				level = 9;
			}
			
			// this.getStat();

			var cartodbUrl = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png';
		
			this.map = L.map('dashboardMap').setView([36.279707, 127.847817],level);
			this.map.dragging.disable();
			var koreaMap = this.map;
				L.tileLayer(cartodbUrl, {
					attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
					maxZoom :level,
					minZoom :level,
					preferCanvas: true,
					noMoveStart : true,
					zoomControl:false,
					reuseTiles: true, 
				}).addTo(koreaMap);
				koreaMap.zoomControl.remove();			
				// koreaMap.on('click',function(e){
				// 	console.log(e.latlng);
				// })


			koreaMap.setMaxBounds([
					[37.993998198369574, 131.27563476562503],
					[34.52692430140103, 124.41741943359376]
			]);  
			
			var aj = $.ajax({
				dataType : 'json',
				url : '/scripts/data/markerLocInfo.json',
				async : false
			});
			
			this.locData = aj.responseJSON;

			this.initMaker(koreaMap, this.locData);
			
			var randomToIdx = this.markerLocMap.size;
			// var randomToCnt = getRandomInt(1, 14);
			var randomToCnt = 14
			var to = [];
			for(var i=0; i < randomToCnt; i++)
			{
				// to.push('rcc'+(i+1));
			}
			// var to = 'rcc'+randomToIdx; 
			initAni(koreaMap, this.officeLatLng, to, this.markerLocMap);
			// 서버와 연계하면 필요없는 부분/
			// 임시 데이터 를 위해 만든 부분
			var flowInfo = this.changeTmp(this.fromTo);

			// getFlowStatus(this.urlESSStat, koreaMap, this.officeLatLng, this.markerLocMap, this.fromTo, this.markerList);
			// setInterval(function(urlESSStat, koreaMap, officeLatLng, markerLocMap, fromTo, markerList){
			// 	getFlowStatus(urlESSStat, koreaMap, {lat : 36.351719, lng : 127.398300	}, markerLocMap, fromTo, markerList);
			// },15000, this.urlESSStat, koreaMap, this.officeLatLng, this.markerLocMap, this.fromTo, this.markerList);
				getFlowStatus(this.urlESSStat_new, koreaMap, this.officeLatLng, this.markerLocMap, this.fromTo, this.markerList);
			setInterval(function(urlESSStat, koreaMap, officeLatLng, markerLocMap, fromTo, markerList){
				getFlowStatus(urlESSStat_new, koreaMap, {lat : 36.351719, lng : 127.398300}, markerLocMap, fromTo, markerList);
			},15000, this.urlESSStat_new, koreaMap, this.officeLatLng, this.markerLocMap, this.fromTo, this.markerList);
			
			//setInterval(function(koreaMap, officeLatLng, markerLocMap, fromTo, markerList){
				// var runType = Math.random() >= 0.5; 
				// var runType;
				// runType = Math.random() >= 0.5; 
				// runType = true;
				// if(runType == false)
				// {
				// 		var randomToIdx = parseInt(getRandomArbitrary(1, markerLocMap.size));
				// 		var randomToCnt = getRandomInt(1, 4);
				// 		var to = [];
				// 		for(var i=0; i < randomToIdx; i++)
				// 		{
				// 			to.push('rcc'+getRandomInt(1, randomToIdx)); 
				// 		}
				// 		setAniData(koreaMap, officeLatLng, to, markerLocMap); 
				// 		_myTime = 10000;
				// }else
		//		_isFlow = !_isFlow;
				// console.log(_isFlow);
				// if(_isFlow == true)
				// {						 
				// 		var flowInto = changeTmp(fromTo);
				// 		setFlowAniData(koreaMap, flowInto, markerLocMap); 
				// 		_myTime = 3000;
				// }					
				// else
				// {
				// 	clearFlowAni(koreaMap);
				// }
		//	},5000, koreaMap, this.officeLatLng, this.markerLocMap, this.fromTo, this.markerList);
				
			//for showing global menu
			if($nuxt.$route.path === '/'){
				this.isRoot = false;
				$('.header').css('position','absolute');
				
				// $('.header').css('display','none');
					
				$('.header').css('top','-5rem'); 
				$('.header').css('width','100%');
				$('.header').css('z-Index',999);
					
				$('#header').css('height','3.2325rem');
				$('#wrap').css('padding','3.3125rem 0 0');
			}else{
				this.isRoot = true;
			}	
			document.onkeydown = KeyPress;
		}
	} 
	let _showMenu = true;
	function KeyPress(e) {
		var evtobj = window.event ? event : e
		//Do action on CTRL + Z
		if (evtobj.ctrlKey) {
			// alert("Ctrl + Z Pressed");
			// $('.header').css('top','0px');
			// $('.header').removeAttr('display');
			// 	$('.header').css('transition','0.3s');
				// $('.header').css('display','block');
				$('.header').animate({top:'0rem'});
				setTimeout(function(){
					$('.header').animate({top : '-5rem'});
				},3000);		
		}
		//Do action on SHIFT + DELEETE
		if (evtobj.keyCode == 46 && evtobj.shiftKey) {
				alert("Shift + Delete Pressed");
		}
	}
	let _myTime = 3000;

	function changeTmp(fromTo){
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
	 
	function drawHeatMap(map, flowInto, locMap)
	{
		
		var latlng = [];
		var flow, d;
		var addressPoints ;

		for(var i=0; i < flowInto.length; i++)
		{
			d = flowInto[i];
			latlngs.push({lat: locMap.get(d.from).lat,  lon  : locMap.get(d.from).lng,value :  d.value});
		}
		var heatmap = new L.DivHeatmapLayer();
		heatmap.addTo(map);
		heatmap.setData(latlngs);
	}

 
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
  
</script>
 
<style> 
.innerMap{	
	width :19.5vw;
	height: 15vh;
	z-index: 999;
	position: absolute;
	bottom: 0;
	right : 0;
		outline: 0.1px dotted green;
}
.ct-point{
	stroke: #d70206;
	stroke-width: .3rem;
	stroke-linecap: round;
}
.ct-line{
	stroke-width: .1rem;
}
.mapTotal > .leaflet-top .leaflet-left .innerMap > .leaflet-left .leaflet-top{
	display: none;
}
[data-arrow="arrow"]{
	-webkit-transition: all 1s ease-in-out;
    -moz-transition: all 1s ease-in-out;
    -o-transition: all 1s ease-in-out;
    -ms-transition: all 1s ease-in-out;
    transition: all 1s ease-in-out;
    
    -webkit-animation-direction: normal;
    -webkit-animation-duration: 2s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-name: blink;
    -webkit-animation-timing-function: ease-in-out;
    
-moz-animation-direction: normal;
    -moz-animation-duration: 2s;
    -moz-animation-iteration-count: infinite;
    -moz-animation-name: blink;
    -moz-animation-timing-function: ease-in-out;   
}
@-webkit-keyframes blink {
    0% {
        opacity:1;
    }
    50% {
        opacity:0.3;
    }
    100% {
        opacity:1;
    }
}
@-moz-keyframes blink {
    0% {
        opacity:1;
    }
    50% {
        opacity:0.3;
    }
    100% {
        opacity:1;
    }
}


 @keyframes serviceOn{
	0%{opacity: 0;}
	50%{opacity: .5;}
	80%{opacity: .8;}
	100%{opacity: 1;} 
}

.serviceOn{
	animation: serviceOn 2s linear infinite;
}

.leaflet-flow{
	height: 100%;
	width: 100%;
} 
.leaflet-div-icon {
border : 0;
background : transparent;
width: 32px;
height : 32px;
}
/*
.arrow {
	width : 20px;
	height : 20px;
    border: solid yellow;
    border-width: 1px 3px 3px 1px;
		position : inherit;
    padding: 0px;
		z-index: 999;		
		display : none;
}
*/
/* 

.ct-bar{
	stroke : #30E6FE;
	stroke-width: 1rem;
}
.ct-labels{
	visibility: hidden;
}
.ct-series, .ct-series-a{
	stroke : #30E
} */


</style>
