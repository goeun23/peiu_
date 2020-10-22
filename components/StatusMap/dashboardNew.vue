<template>
<div class="cont-body">
	<!-- top_switch_zone -->
	<div class="top_switch_zone">
		<div class="switch_zone_l">
			<button @click="selectRegion()" id='toggle' type="button" class="switch_land_island on_island">
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
                    <button  type="button"><span class="hide">사이즈수정</span></button>
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
			{ src: "/scripts/map/leaflet.contextmenu.min.js" }
			
        ]
	},
	
    data() {
        return{
			url_getContractorSites :  "/contractor/getcontractorsites",
			interval1: null,
			interval : null, 
			interval2 : null,
			AreaList : [],
			land : [],
			island : [],
			client: null,
			map : null,
			map_jeju : null,
			customMarkers: [],
			selectedArea: 'land',
        }
	},
	
    methods: {
		Moveto1depth(){
			if(selectedArea == 'island'){
				// 1 depth
				jejuMap.setZoom(11)
			}else{
				// 1 depth
				koreaMap.setZoom(7)
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
				AddRccList(list[i],rccId, this.customMarkers);
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

			// 지도 보이기
			$("#land").hide();
			$("#island").hide();
			$("#"+selectedArea).show();


			clearInterval(this.interval)
			clearInterval(this.interval2)
			
			
			var btn = $('.switch_land_island')
			btn.removeClass('on_land')
			btn.removeClass('on_island')

			this.AreaList = [];

			if(selectedArea == 'land'){
				/*********toggle********/
				btn.addClass("on_land");
				$("#SelectedArea").text('전국')
				/***********************/

				this.AreaList = landlist;

				
				myZoom(); // -> clustring() by depth 
				koreaMap.on('zoomend',myZoom)
				
			}else if(selectedArea == 'island'){
				btn.addClass("on_island");
				$("#SelectedArea").text('제주')
				this.AreaList = islandlist;
				jejuZoom();
				jejuMap.on('zoomend',jejuZoom);
			}
		},
	},
	beforeDestroy() {
		
		clearInterval(this.interval)
		clearInterval(this.interval1)
		clearInterval(this.interval2)
		this.AreaList =[];
        if(this.client !=null){
            this.client.end();
		}
		this.$nuxt.$off('getUserList')
		
    },
	
    mounted(){
		
		clearInterval(this.interval)
		clearInterval(this.interval1)
		clearInterval(this.interval2)
		getRccMap();
		getSiteCount();
		
		var mqtt = require('mqtt')
		client = mqtt.connect('wss://www.peiu.co.kr:9001/ws')
		
		// 지도 초기화
		this.initMap();

		// 고객정보 받아오기(권한 고려하지 않아도 됨)
		var d = recvAjaxResult(this.url_getContractorSites);
		var users = getUserData(d)
		this.customMarkers = users;
		if(this.customMarkers != null){
			this.selectRegion();
		}

		
		// execute after all content mounted
		this.$nextTick(function () {
			var num = localStorage.getItem('MainAreaNum');
			
			if(num != undefined){
				if(num == 16){
					this.selectedArea = 'island'
					this.selectRegion('island')
				}
				this.showAreaList(num, true);
				localStorage.removeItem('MainAreaNum');
			}
	    })

    }
}

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