<template>
<div class="cont_body">
	<!-- top_switch_zone -->
	<div class="top_switch_zone">
		<div class="switch_zone_l">
			<button @click="selectRegion()" id='toggle' type="button" class="switch_land_island on_land">
			<span></span>
			</button>
		</div>
	</div>
	<!--// top_switch_zone -->
	<div class="area_map_wrap">
        <!-- area_sel REGION-->
            <div class="area_sel">
                <ul>
                    <li class="area_big">
                        <dl>
                            <dt id='SelectedArea' @click="Moveto1depth()">전국</dt>
                            <dd>
								<ul>
									<li v-for="v in AreaList"  :key='v.idx'>
										<button name='area' type="button" @click='showAreaList(v.idx,true)' :id='v.idx' :value='v.idx' :data-rcc-id='v.idx'>{{v.area}}</button>
									</li>
								</ul>
                                
                            </dd>
                        </dl>
                    </li>
                    <li class="area_mid">
                        <dl>
                            <dt id="areaName2">시군구</dt>
                            <dd>
                                <ul id="localList"></ul>
                            </dd>
                        </dl>
                    </li>
                    <li class="area_small">
                        <dl>
                            <dt id="areaName3">읍면동</dt>
                            <dd>
                                <ul id="localList2"></ul>
                            </dd>
                        </dl>
                    </li>
                </ul>
                <div class="area_size_btn">
                    <button @click="hideLayer()" type="button"><span class="hide">사이즈수정</span></button>
                </div>
            </div>
        <!-- map_view -->
        <div class="map_view" id="land"><!-- 확대된 넓이 :  164.4rem, 축소된 넓이 : 130rem -->
			<div class="map_size_btn_set">
				<button type="button" onclick="CtrlMap('+')" class="btn_size_plus"><span class="hide">확대</span></button>
				<button type="button" onclick="CtrlMap('-')" class="btn_size_minus"><span class="hide">축소</span></button>
			</div>
        </div>
		<div class="map_view" id="island"><!-- 확대된 넓이 :  164.4rem, 축소된 넓이 : 130rem -->
			<div class="map_size_btn_set">
				<button type="button" onclick="CtrlMap_jeju('+')" class="btn_size_plus"><span class="hide">확대</span></button>
				<button type="button" onclick="CtrlMap_jeju('-')" class="btn_size_minus"><span class="hide">축소</span></button>
			</div>
        </div>
        <!--// map_view -->
    </div>
</div>
    
</template>
<script>
// 최대 이벤트 리스너 갯수 제한 없애기
require('events').EventEmitter.defaultMaxListeners = 0;
const Cookie = process.client ? require('js-cookie') : undefined

export default{
	
	layout: 'common',
    head: {
        link:[
            
            {rel:"stylesheet", href:""}
        ],
        script: [	
			{ src: "/scripts/data/regCode.js" },
			{ src: "/scripts/data/address.js" },
			{ src: "/scripts/statusMap.js" },
			{ src: "/scripts/common-popup.js" },
			{ src: "/scripts/data/statusMapLatLng.js" },
			{ src : "https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"},
			{ src: "/scripts/map/leaflet.contextmenu.min.js" },
        ]
	},
	
    data() {
        return{
			AreaList : [],
			land : [],
			island : [],
			client: null,
			map : null,
			map_jeju : null,
			customMarkers: [],
			selectedArea: 'land',
			generator : this.$t("regionStatus.generator"), 
			activepower : this.$t("regionStatus.actviepower"),
			eventCount : this.$t("regionStatus.eventCount"),
			landinterval : null,
			islandinterval : null,
			islanddrag : false,
			
        }
	},
	
    methods: {
		hideLayer(){
			$('.area_map_wrap').removeClass('is_active');
		},
		Moveto1depth(){
			if(selectedArea == 'island'){
				// 1 depth
				jejuMap.setZoom(11)
				jejuMap.getCenter();
			}else{
				// 1 depth
				koreaMap.setZoom(7)
				koreaMap.getCenter();
			}
			$("[data-rcc-id]").removeClass("is_active");
			this.initSelectCard();
		},
        showAreaList(rccId, val){
            
			val = true;
			$(".area_map_wrap").removeClass("is_active")
			// 전국 밑에 지역 활성화 비활성화 작업
			$("[data-rcc-id]").removeClass("is_active");

			var tagID = "[data-rcc-id='" + rccId  + "']";
			$(tagID).addClass("is_active");

			// 지역 선택하고 옆으로 확장되는 클래스 추가
			$(".area_map_wrap").addClass("is_active")
			
			var areaName = $(tagID).text();
			

			var localList = "#localList"
			var detailArea = "#areaName2"

			// 이전에 선택한 지역이름 
			var detailArea3 = "#areaName3"

			$(detailArea).text(areaName);
			$(localList).empty();
			$(detailArea3).empty();

			//하위 지역 갯수만큼 지역 추가
            var list = regCodeJson[0][rccId];
            
			for (var i = 0; i < list.length; i++) {
				// 시, 군, 구 단위
				AddRccList(list[i], rccId, this.customMarkers);
			}

		},
        initMap(){	
			var land = {
				cont : 'land',
				vueCont : this.map,
				map : koreaMap,
				coordinates : RegionJson,
				minZoom : 8,
				snap : 1,
				setView : [35.997028, 127.859277],
				setMaxBounds : [
					[33.938725, 125.491197],
					[38.477370, 129.497270]
				]
			}
			var island = {
				cont : 'island',
				vueCont : this.map_jeju,
				map : jejuMap,
				coordinates : RegionJson,
				minZoom : 11,
				snap : 1,
				setView : [33.386949, 126.548782],
				setMaxBounds : [
					[33.112026, 126.082811],
					[33.686988, 126.938092]
				]
			}			
			var kor = initialMap(land);
			koreaMap = kor;

			var jeju = initialMap(island);
			jejuMap = jeju;
        },
	
		initSelectCard(){
			if($("#localList > li").length>0){
				$("#localList > li").remove();
				$(".area_map_wrap").removeClass('is_active')
			}
			if($("#localList2 > li").length>0){
				$("#localList2 > li").remove();
				$(".area_map_wrap").removeClass('is_active')
			}
		},
		selectRegion(val){
			this.initSelectCard();
			var v;
			if(val == undefined){
				if($("#toggle").hasClass("on_land")){
					this.selectedArea = 'island'
				}else{
					this.selectedArea = 'land'
				}
			}else{
				this.selectedArea = val;
			}
			
            selectedArea = this.selectedArea;
            


			// show activated map
			$("#land").hide();
			$("#island").hide();
			$("#"+selectedArea).show();

			
			var btn = $('.switch_land_island')
			btn.removeClass('on_land')
			btn.removeClass('on_island')

			
			if(selectedArea == 'land'){

				// show selected area Map
				activeMap = koreaMap;
				
				// set toggle button stat
				btn.addClass("on_land");

				// set top area text
				$("#SelectedArea").text('전국')

				// get asset list
				this.AreaList = landlist;

			}else if(selectedArea == 'island'){
				// show selected area Map
				activeMap = jejuMap;

				// set toggle button stat
				btn.addClass("on_island");

				// set top area text
				$("#SelectedArea").text('제주')

				// get asset list
				this.AreaList = islandlist;
            
            }
            
			
			//init clustering data(default : 1 level)
			this.getClusteringLevel(null);

			// set animation event-function 
            activeMap.on("zoomend", this.getClusteringLevel)
            
            this.$nextTick(function () {
               
                if(storagercc != null){
                    this.showAreaList(storagercc, true)
                    storagercc = null;
                }
                
	        })
			
		},
		
		getClusteringLevel(e){
			var ZOOM_LEVEL;
			var depth = 1;
			
			if(e != null){
				ZOOM_LEVEL = e.target.getZoom();
				
			}else{
				if(activeMap == jejuMap){
					ZOOM_LEVEL = 11;	
					
				}else{
					ZOOM_LEVEL = 8;
				}
            }
          
			activeMap.setZoom(ZOOM_LEVEL)
            depth = getZoomDepth(activeMap, ZOOM_LEVEL);
            
			
			
			// 클러스터링 될때마다 모든 마커 레이어 리셋
			$(".leaflet-marker-pane").empty();
			// 클러스터링 될 때마다 모든 popup 레이어 리셋 
			$(".leaflet-popup-pane").empty();
			
			
			this.clustering(depth, activeMap);
		},
		
		clustering(depth, region){
			//현재 활성화 되어있는 map
			activeMap = region;
			actLv = depth;
			var markersMap = new HashMap();
			if(depth == 1){
				markersMap = rccMap;
			}
			else{
				for (var i = 0; i < customMarkers.length; i++) {
					var v = customMarkers[i];
					var lawCode = '';

					// 해시맵 키 값 설정 
					if(depth == 2){
						// law 4자리
						lawCode = v.LawLevel1 + v.LawLevel2;
					}else if(depth == 3){
						// mqtt 10자리
						var law3 = ""
						if(v.LawLevel3.length < 6){
							law3 = "0" + v.LawLevel3;
						}else{
							law3 = v.LawLevel3;
						}
						lawCode = v.LawLevel1 + v.LawLevel2 + law3 
					}else if(depth == 4){
						lawCode = Number(v.SiteId)
                    }

                    markersMap.set(lawCode, [{ siteid : Number(v.SiteId), lawCode : lawCode, lat: v.Lat, lng: v.Lon, rcc: v.Rcc}]);


					// // depth 별 해시맵 생성
					// if (markersMap.has(lawCode) == true) {
					// 	//이미 존재 한다면
					// 	var tempArr = markersMap.get(lawCode);
					// 	tempArr.push({ lawCode : lawCode, lat: v.Lat, lng: v.Lon });
					// } else {
					// 	//없다면
					// 	markersMap.set(lawCode, [{rcc : v.Rcc, siteid :v.SiteId, lawCode : lawCode, lat: v.Lat, lng: v.Lon, rcc: v.Rcc}]);
					// }
				}
            }
            
            iconMap = markersMap;
          
			this.drawMarkerInfo();
			
			getMarkersDataByDepth(actLv);
			var avaData = true;
			
			if(selectedArea == 'land'){
				activeMap = koreaMap;

				clearInterval(this.islandinterval)
				koreaMap.on('mousedown', function(e){
					avaData = false;
					//clearInterval(landinterval)
					
				})
				koreaMap.on('mouseup', function(e){
					avaData = true;
					//clearInterval(landinterval)
				})
				koreaMap.on('zoomstart', function(e){
					avaData = false;
					//clearInterval(landinterval)
				})
				koreaMap.on('zoomend', function(e){
					avaData = true;
					//clearInterval(landinterval)
				})
			
				this.landinterval = setInterval(() => {
					
					
					if(avaData){
						getMarkersDataByDepth(actLv);
					}else{
						clearInterval(this.landinterval)
					}
				},2000);


			}else if(selectedArea == 'island'){
				activeMap = jejuMap;
				clearInterval(this.landinterval)
				jejuMap.on('mousedown', function(e){
					avaData = false;
					
				})
				jejuMap.on('mouseup', function(e){
					avaData = true;
				
				})
				jejuMap.on('zoomstart', function(e){
					avaData = false;
					
				})
				jejuMap.on('zoomend', function(e){
					avaData = true;
				})

				this.islandinterval = setInterval(() => {
					if(avaData){
						getMarkersDataByDepth(actLv);
					}else{
						clearInterval(this.islandinterval)
					}
				},2000);
			}
	},
	drawMarkerInfo(){
		// 마커 옆 텍스트
		var className;
		var html;
		var texticon;
		// set text icon class
		if(actLv == 1){
			className = 'depth1_wrap'
		}else{
			className = 'marker_wrap'
        }

        var popup = '';
        //var popup = "markertest";
        

		if(iconMap == undefined || iconMap == null){
            return;
        }
		iconMap.forEach((v,k)=>{
			var loc = {lat : v[0].lat , lng : v[0].lng}
			// **************************text****************
			var html = this.drawDivIcon(k,actLv,v[0].siteid, v[0].rcc)
			texticon = L.divIcon({
				className :className,
                html : html,
                iconSize : [130,50], // 아이콘 사이즈
                //popupAnchor : [260,100] // popup 위치 
                //iconSize : [130,50]
            })
			var m = L.marker(loc,{icon:texticon});
			m.addTo(activeMap);
			
			// **************************popup****************
			if(actLv !=4){

				var areaName = areaPopup(k, v[0].rcc);
				m.bindPopup(areaName);
				m.on('mouseover', function(e) {
					this.openPopup();
				});
				m.on('mouseout', function(e) {
					this.closePopup();
				})
				m.addTo(activeMap);

			}else{
				for(var j = 0; j< customMarkers.length; j++){
					var u = customMarkers[j]
					if(v[0].siteid == u.SiteId){
						popup = setLocPopup(
							u.UserID,u.deviceType,u.SiteId,
							u.represenation,u.aggRepresentation,u.Address,
							u.registerTimestamp,u.aggID
                        )
                        
						m.bindPopup(popup);
						m.addTo(activeMap);
					}
				}
			}
		})
		},
		drawDivIcon(key,depth,siteid, rcc){
            
			var t = "";
			var topic = key;
			if(depth == 4){
				topic = siteid;
			}  
			var gen = "gen-level-"+depth+"-"+topic;
			var actpwr = "ActPwr-level-"+depth+"-"+topic;
			var soc = "SOC-level-"+depth+"-"+topic;
            var evt = "evt-level-"+depth+"-"+topic;
            var rcc = RccList[rcc]
			
			if(depth == 1){
				// depth 1
					t = 
					"<div class=' marker_point_wrap'>"+
						"<div class='marker_pointer_info po_down gg' >"+
                            "<ul class=depth1_wrap before-"+key+">"+
                            "<li class=before-"+key+">"
								+"<span class='tit'>"+rcc+"</span>"
							+"</li>"
							+"<li class=before-"+key+">"
								+"<span class='tit'>"+this.$t("regionStatus.generator") +": </span>"
								+"<span class='txt "+gen+"'"+"></span>"
								+"<span class='tit'> | SOC : </span>"
								+"<span class='txt "+soc+"'"+"></span>"
							+"</li>"
							+"<li class=before-"+key+">"
								+"<span class='tit'> " +this.$t("regionStatus.actviepower")+ ": </span>"
								+"<span class='txt "+actpwr+"'"+"></span>"
								+"<span class='tit'> | " +this.$t("regionStatus.eventCount") +": </span>"
								+"<span class='txt "+evt+"'"+"></span>"
							+"</li>"
							"</ul>"+
						"</div>"+
					"</div>"
				}
				else{
					t = 
					"<div class=' marker_point_wrap'>"+
						"<div class='marker_pointer_info po_down gg' style=''>"+
							"<ul>"+
								"<li><span class='tit'>"+this.$t("regionStatus.generator")+" : </span><span class='txt "+gen+"'"+"><span></li>"+
								"<li><span class='tit'>"+ this.$t("regionStatus.actviepower") +": </span><span class='txt "+actpwr+"'"+"></li>"+
								"<li><span class='tit'>SOC : </span><span class='txt "+soc+"'"+"></li>"+
								"<li><span class='tit'>"+ this.$t("regionStatus.eventCount") +" : </span><span class='txt "+evt+"'"+"></li>"+
							"</ul>"+
						"</div>"+
					"</div>"
				}
				return t;
		}
	},
	beforeDestroy() {
		
		this.AreaList =[];
        if(this.client !=null){
            this.client.end();
		}
		this.$nuxt.$off('getUserList')
		
    },
	
    mounted(){
        // 메뉴 활성화
         document.getElementById('menu_gismap').classList.add("active");

		getRccMap();
        getSiteCount();
        
		var mqtt = require('mqtt')
		client = mqtt.connect('wss://www.peiu.co.kr:9001/ws')
		
		// 지도 초기화
        this.initMap();

        // 고객정보 받아오기(권한 고려하지 않아도 됨)
        this.customMarkers = getusersiteinfo()


        var islandCounter = 0;
        var landCounter = 0;

        if(this.customMarkers == undefined || this.customMarkers == null){
            // 고객 데이터를 불러올 수 없는 경우 육지 선택 화면으로 표시
            islandCounter = 0; landCounter = 1;
        }else{
            for(var i = 0; i< this.customMarkers.length; i++){
                if(this.customMarkers[i].Rcc == 16){
                    // 제주.
                    islandCounter++;
                }else{
                    landCounter++;
                }
            }
        }

        var num = localStorage.getItem('MainAreaNum');
        if(num != undefined){
            storagercc = localStorage.getItem('MainAreaNum');
            localStorage.removeItem('MainAreaNum');
            if(num == 16){
                this.selectRegion('island');
            }else{
                this.selectRegion('land');
            }
        }else{
            // 제주, 육지 중 자원이 많은 구역 보여주기.
            if(islandCounter > landCounter){
                this.selectRegion('island');
            }else{
                this.selectRegion('land');
            }
        }

        
    }
}
var storagercc;
</script>
<style>
/* remove leaflet default popup option  */
.custom-popup{
	width: 23rem !important;
    text-align: center;
}
.popupLayer{
	z-index : 9999;
}
.leaflet-popup-tip-container{
	display:none;
}
.leaflet-popup-content-wrapper, .leaflet-popup-tip {
	background: transparent;
}
.leaflet-container a.leaflet-popup-close-button{
	display:none;
}
.marker_point_wrap .marker_pointer_info ul li:before {
     background: #bfccdc; 
}
/* ul li:before {
	background : skyblue;
} */
.marker_wrap .marker_point_wrap .marker_hisroty_info_wrap {
    position: absolute;
    display: none;
    width: 47rem;
    bottom: -1.5rem;
    left: -1.5rem;
    border-radius: 0.3rem;
    background: #252c3b;
    box-shadow: 0.4rem 0.4rem 0.4rem rgba(0,0,0,0.5);
    z-index: 15;
}
.marker_wrap .marker_point_wrap .marker_pointer_info.po_down{
	    left: 16.5rem;
    top: 13rem;
}
.depth1_wrap{
	color: white;
    top: 4rem;
	left: 14rem;
	width: 25rem;
}

</style>